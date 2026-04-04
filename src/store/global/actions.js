import Parse from 'parse'
import Speak from 'speak-tts'

import ParseUser from '~/models/ParseUser'
import TabModel, { SPEED_KEY, LANGUAGE_KEY, IMAGE_SIZE_KEY } from '~/models/Tab'
import getCurrentUserId from '~/utils/getCurrentUserId'

/**
 * Push global TTS + image size onto every Tab owned by the current account
 * so mavoix-app (Tab fields) stays in sync with Global settings.
 * @param {{ ttsSpeed: number, ttsLanguage: string, imageSize: string }} stateSlice global module state
 * @returns {Promise<void>} resolves after all tabs are updated (or none exist)
 */
const syncAllTabsTts = async (stateSlice) => {
  const userId = getCurrentUserId()
  if (!userId) {
    return
  }

  const speed = typeof stateSlice.ttsSpeed === 'number' ? stateSlice.ttsSpeed : 1
  const language = (stateSlice.ttsLanguage || 'fr-FR').replace(/-/g, '_')
  const imageSize = stateSlice.imageSize === 'small' || stateSlice.imageSize === 'large'
    ? stateSlice.imageSize
    : 'medium'

  const tabs = await new Parse.Query(TabModel)
    .equalTo('user', userId)
    .find()

  tabs.forEach((tab) => {
    tab.set(SPEED_KEY, speed)
    tab.set(LANGUAGE_KEY, language)
    tab.set(IMAGE_SIZE_KEY, imageSize)
  })

  if (tabs.length > 0) {
    await Parse.Object.saveAll(tabs)
  }
}

// eslint-disable-next-line valid-jsdoc
/**
 * Init the text to speech plugin
 */
export const initTTS = ({ commit, rootState }) => {
  const speech = new Speak()
  // Use global store for TTS language and speed
  let lang = rootState.global.ttsLanguage || 'fr-FR'
  // Replace '_' with '-' for Speak.js format
  lang = lang.replace('_', '-')
  const speed = rootState.global.ttsSpeed !== null ? rootState.global.ttsSpeed : 1

  speech.init({
    'volume': 1,
    'lang': lang,
    'rate': speed,
    'pitch': 1
  }).then(() => {
    commit('setTTS', speech)
  })
    .catch((err) => {
      commit('setError', err)
    })
}

export const loadGlobalSettings = async ({ commit, dispatch }) => {
  try {
    const user = ParseUser.current()
    if (user) {
      // Example fields - adapt keys as necessary if you have different field names
      const imageSize = user.get('imageSize')
      const ttsSpeed = user.get('ttsSpeed')
      const ttsLanguage = user.get('ttsLanguage')
      if (imageSize) commit('setImageSize', imageSize)
      if (ttsSpeed) commit('setTTSSpeed', ttsSpeed)
      if (ttsLanguage) commit('setTTSLanguage', ttsLanguage)
    }
    await dispatch('initTTS')
  } catch (err) {
    commit('setError', err)
  }
}

export const saveGlobalSettings = async ({ state, commit, dispatch }) => {
  try {
    const user = ParseUser.current()
    if (user) {
      user.set('imageSize', state.imageSize)
      user.set('ttsSpeed', state.ttsSpeed)
      user.set('ttsLanguage', state.ttsLanguage)
      await user.save()
      await syncAllTabsTts(state)
      await dispatch('tabs/loadTabs', null, { root: true })
    }
    await dispatch('initTTS')
  } catch (err) {
    commit('setError', err)
  }
}
