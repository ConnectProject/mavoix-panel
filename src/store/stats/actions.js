/* eslint-disable no-await-in-loop -- pages of 1000 rows are fetched one after the other */
import Parse from 'parse'

import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import getCurrentUserId from '~/utils/getCurrentUserId'
import { buildUsageData, localDay } from '~/utils/statsUsageData'

const PAGE_SIZE = 1000

/**
 * Read every row of a query, page by page (cursor on createdAt: skip gets slow on large tables).
 * @param {function(): Parse.Query} makeQuery builds a fresh query restricted to the current user
 * @returns {Promise<Parse.Object[]>} every row, oldest first
 */
const fetchAll = async (makeQuery) => {
  const rows = new Map()
  let after = null
  for (;;) {
    const query = makeQuery().ascending('createdAt')
      .limit(PAGE_SIZE)
    if (after) {
      query.greaterThanOrEqualTo('createdAt', after)
    }
    const page = await query.find()
    const known = rows.size
    page.forEach((row) => rows.set(row.id, row))
    if (page.length < PAGE_SIZE || rows.size === known) {
      return [...rows.values()]
    }
    after = page[page.length - 1].createdAt
  }
}

/**
 * @param {Parse.Object} item TabItem with its asset included
 * @returns {Object|null} { tabId, assetId, name, imageUrl, order }, or null when the item has no picture
 */
const toItem = (item) => {
  const asset = item.get('asset')
  if (!asset) {
    return null
  }
  const file = asset.get('parseFile')

  return { tabId: item.get('tab').id, assetId: asset.id, name: item.get('name'), imageUrl: file ? file.url() : asset.get('url'), order: item.get('order') }
}

/**
 * Load the usage data of the current user only: every query is restricted to the account id
 * (the caregiver account when the panel is used from a linked account).
 * @param {Context} ctx context passed by vuex
 * @returns {Promise} did the action succeed
 */
export const loadUsage = async ({ commit }) => {
  commit('setLoading', true)
  try {
    const userId = getCurrentUserId()
    const [tabs, items, sessions, phrases] = await Promise.all([
      fetchAll(() => new Parse.Query(TabModel).equalTo('user', userId)),
      fetchAll(() => new Parse.Query(TabItemModel).equalTo('user', userId)
        .include('asset')),
      fetchAll(() => new Parse.Query('UsageSession').equalTo('user', userId)),
      fetchAll(() => new Parse.Query('UsagePhrase').equalTo('user', userId))
    ])
    commit('setData', buildUsageData({
      end: localDay(new Date()),
      tabs: tabs.map((tab) => ({ id: tab.id, name: tab.get('name') })),
      items: items.map(toItem).filter(Boolean),
      sessions: sessions.map((s) => ({ sessionId: s.get('sessionId'), begin: s.get('begin'), end: s.get('end') || s.get('begin') })),
      phrases: phrases.map((p) => ({ sessionId: p.get('sessionId'), timestamp: p.get('timestamp'), cards: p.get('cards') || [] }))
    }))
  } catch (err) {
    commit('setError', err)
  }
}
