import Parse from 'parse'

import AssetModel, { ARASAAC_ID_KEY, NAME_EDITED_KEY as ASSET_NAME_EDITED_KEY, NAME_KEY as ASSET_NAME_KEY } from '~/models/Asset'
import TabModel from '~/models/Tab'
import TabItemModel, { NAME_EDITED_KEY as ITEM_NAME_EDITED_KEY, NAME_KEY as ITEM_NAME_KEY, TAB_KEY } from '~/models/TabItem'
import arasaacIdFromUrl from '~/utils/arasaacId'
import { pictogramLang } from '~/utils/pictogramLanguage'

const ARASAAC_API = 'https://api.arasaac.org/api/pictograms'

/**
 * Name of a pictogram in the ARASAAC API, for pictograms missing from the bundled catalog.
 * @param {number} id pictogram id
 * @param {string} lang two-letter language code
 * @returns {Promise<string|null>} first keyword, null when unavailable
 */
const fetchRemoteName = async (id, lang) => {
  try {
    const response = await fetch(`${ARASAAC_API}/${lang}/${id}`)
    const { keywords = [] } = response.ok ? await response.json() : {}

    return (keywords[0] && keywords[0].keyword) || null
  } catch (err) {
    return null
  }
}

/**
 * Point `row` to the pictogram's name in `lang`, unless the user typed the name or the catalog has none.
 * @param {Parse.Object} row asset or tab item
 * @param {object} keys names of the row's fields
 * @param {Function} nameOf returns the pictogram's name in the language, by id
 * @param {number|null} id ARASAAC pictogram id of the row
 * @returns {boolean} true if the row changed
 */
const rename = (row, keys, nameOf, id) => {
  const next = id && nameOf(id)
  if (!next || row.get(keys.edited) || row.get(keys.name) === next) {
    return false
  }
  row.set(keys.name, next)

  return true
}

const itemAssetId = (item) => item.get('asset') && item.get('asset').get(ARASAAC_ID_KEY)

/**
 * Items of the account's tabs (with their asset) and its ARASAAC assets.
 * @param {string} userId account owning the rows
 * @returns {Promise<{ items: Array, assets: Array }>} rows
 */
const loadRows = async (userId) => {
  const tabsQuery = new Parse.Query(TabModel).equalTo('user', userId)
  const items = []
  await new Parse.Query(TabItemModel).matchesQuery(TAB_KEY, tabsQuery)
    .include('asset')
    .each((item) => items.push(item))
  const assets = []
  await new Parse.Query(AssetModel).equalTo('user', userId)
    .exists(ARASAAC_ID_KEY)
    .each((asset) => assets.push(asset))

  return { items, assets }
}

/**
 * Function giving a pictogram's name in `lang`: from the bundled catalog, else from the ARASAAC API
 * (the catalog is a snapshot and misses some pictograms).
 * @param {Array} images ARASAAC catalog (`global.images`)
 * @param {Array} ids pictogram ids used by the account
 * @param {string} lang two-letter language code
 * @returns {Promise<Function>} id -> name
 */
const buildNameOf = async (images, ids, lang) => {
  const catalog = new Map(images.map((entry) => [arasaacIdFromUrl(entry.url), entry]))
  const catalogName = (id, code) => {
    const entry = catalog.get(id)

    return entry && entry.names && entry.names[code] && entry.names[code][0]
  }
  const unknown = [...new Set(ids.filter((id) => id && !catalogName(id, lang)))]
  const remote = new Map(await Promise.all(unknown.map(async (id) => [id, await fetchRemoteName(id, lang)])))

  // pictograms without a name in the language fall back to English
  return (id) => catalogName(id, lang) || remote.get(id) || catalogName(id, 'en')
}

/**
 * Rename the ARASAAC pictures of the account to the given language. Pictures are identified by their
 * ARASAAC id; a name the user typed (`nameEdited`) is kept, and own photos (no id) are never touched.
 * @param {string} userId account owning the rows
 * @param {string} language speech language code
 * @param {Array} images ARASAAC catalog (`global.images`)
 * @returns {Promise<number>} number of rows renamed
 */
export const syncPictogramNames = async (userId, language, images) => {
  const { items, assets } = await loadRows(userId)
  const ids = [...items.map(itemAssetId), ...assets.map((asset) => asset.get(ARASAAC_ID_KEY))]
  const nameOf = await buildNameOf(images, ids, pictogramLang(language))

  const itemKeys = { name: ITEM_NAME_KEY, edited: ITEM_NAME_EDITED_KEY }
  const assetKeys = { name: ASSET_NAME_KEY, edited: ASSET_NAME_EDITED_KEY }
  const changed = [
    ...items.filter((item) => rename(item, itemKeys, nameOf, itemAssetId(item))),
    ...assets.filter((asset) => rename(asset, assetKeys, nameOf, asset.get(ARASAAC_ID_KEY)))
  ]
  if (changed.length > 0) {
    await Parse.Object.saveAll(changed)
  }

  return changed.length
}
