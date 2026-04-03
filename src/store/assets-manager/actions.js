import Jimp from 'jimp'
import Parse from 'parse'
import { Notify } from 'quasar'
import Unidecode from 'unidecode'

import { modelFromAsset } from './utils'

import { i18n } from '~/boot/i18n.js'
import AssetModel, { NAME_KEY } from '~/models/Asset'
import getCurrentUserId from '~/utils/getCurrentUserId'

/**
 * Open the asset manager and load assets
 * @param {Context} ctx context passed vuex
 * @param {{ Boolean, Function }} {
 *  selectMode: is the asset manager started to select an asset or to manage them
 *  selectCallback: is selectMode is true call this function with the selected asset as parameter
 * }
 * @returns {void}
 */
// export const openAndLoad = ({ commit, dispatch }, { selectMode = false, selectCallback }) => {
//   commit('open', { selectMode, selectCallback })
//   dispatch('loadAssets')
// }

/**
 * Load every assets for the user
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const loadAssets = ({ commit }) => {
  new Parse.Query(AssetModel)
    .equalTo('user', getCurrentUserId())
    .find()
    .then((assets) => {
      console.log(assets)
      commit('setAssets', assets.reverse())
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Delete the asset that's edited
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const destroyEditingAsset = async ({ commit, state: { assets, editingIndex } }) => {
  try {
    const assetModel = await modelFromAsset(assets[editingIndex])
    await assetModel.destroy()
    commit('removeEditingAsset')
    commit('cancelEdit')
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Save the asset that's edited
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const saveEditingAsset = async ({ commit, state: { assets, editingIndex, editingAsset } }) => {
  try {
    const assetModel = await modelFromAsset(assets[editingIndex])
    assetModel.set(NAME_KEY, editingAsset.name)
    await assetModel.save()
    commit('updateEditingAsset', assetModel)
    commit('cancelEdit')
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Upload files and create the assets
 * @param {Context} ctx context passed vuex
 * @param {[File]} files array of files to upload
 */

export const uploadFiles = async ({ commit }, { files, posNotif = 'top-right' }) => {
  const { length } = files
  if (length > 0) {
    const promises = Array.from(files).map((file) =>
      uploadFile({ commit }, file))
    try {
      await Promise.all(promises)
      if (length > 1) {
        Notify.create({ position: posNotif, message: length + i18n.t('dnd.filesSaved'), color: 'blue' })
      } else {
        Notify.create({
          position: posNotif, message: i18n.t('dnd.fileSaved'), color: 'blue'
        })
      }
    } catch (error) {
      console.error(error)
      Notify.create({ position: posNotif, message: 'Error uploading image: ' + error.message, color: 'red' })
    }
  }
}

/**
 * Resize image file to max 512px and return a Blob.
 * @param {File} file source file
 * @returns {Promise<Blob>} processed blob
 */
const prepareImageBlobFromFile = async (file) => {
  const image = await Jimp.read(await file.arrayBuffer())
  const maxDim = Math.max(image.bitmap.width, image.bitmap.height)
  if (maxDim > 512) {
    if (maxDim === image.bitmap.width) {
      image.resize(512, Jimp.AUTO)
    } else {
      image.resize(Jimp.AUTO, 512)
    }
  }
  const buf = await image.getBufferAsync(Jimp.AUTO)

  return new Blob([buf])
}

/**
 * Build upload blob + Parse filename; uses Jimp resize when possible, else original bytes (some JPEGs fail in Jimp).
 * @param {File} file source file
 * @param {string} baseFile safe base name without extension
 * @returns {Promise<{ blob: Blob, filename: string }>} payload for Parse.File
 */
const blobForPersonalUpload = async (file, baseFile) => {
  try {
    const blob = await prepareImageBlobFromFile(file)

    return { blob, filename: `${baseFile}.png` }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Jimp could not process image, uploading original file:', err.message || err)
    const buf = await file.arrayBuffer()
    const extMatch = (file.name || '').match(/(\.jpe?g|\.png)$/i)
    const ext = extMatch ? extMatch[1].toLowerCase() : '.jpg'
    let mime = 'image/jpeg'
    if (file.type && file.type.startsWith('image/')) {
      mime = file.type
    } else if (ext === '.png') {
      mime = 'image/png'
    }

    return {
      blob: new Blob([buf], { type: mime }),
      filename: `${baseFile}${ext}`
    }
  }
}

/**
 * Upload a camera-cropped photo with display name and optional categories (personal library only).
 * @param {Object} ctx vuex context
 * @param {Object} payload file and metadata
 * @param {File} payload.file image file
 * @param {string} payload.name display name
 * @param {string[]} [payload.categories] category tags
 * @returns {Promise<void>} resolves when the asset is saved
 */
export const uploadPersonalPhoto = async ({ commit }, { file, name, categories = [] }) => {
  const displayName = (name || '').trim() || 'Photo'
  const baseFile = Unidecode(displayName)
    .replace(/^[^a-z0-9]+/i, '')
    .replace(/[^a-z0-9. \-_]/gi, '_') || 'photo'
  const { blob, filename } = await blobForPersonalUpload(file, baseFile)
  const newFile = await new Parse.File(filename, blob).save()
  const asset = await AssetModel.New(displayName, newFile, newFile._url, getCurrentUserId()).save()
  const cats = Array.from(new Set((categories || []).filter(Boolean)))
  if (cats.length) {
    asset.set('categories', cats)
    await asset.save()
  }
  commit('addAsset', asset)
}

/**
 * Upload a file and create the asset
 * @param {Context} ctx context passed vuex
 * @param {File} file the file to upload
 */

const uploadFile = async ({ commit }, file) => {
  const blob = await prepareImageBlobFromFile(file)

  const filename = Unidecode(file.name)
    .replace(/^[^a-z0-9]+/i, '')
    .replace(/[^a-z0-9. \-_]/gi, '_')

  const newFile = await new Parse.File(filename, blob).save()
  const asset = await AssetModel.New(filename.replace(/\.[^/.]+$/, ''), newFile, newFile._url, getCurrentUserId()).save()
  commit('addAsset', asset)
}

export const addAsset = ({ commit }, obj) => {
  AssetModel.New(obj.name, false, obj.url, getCurrentUserId())
    .save()
    .then((asset) => {
      console.log(asset)
      commit('addAsset', asset)
    })
    .catch((err) => {
      commit('setError', err)
    })
}
