import Speak from 'speak-tts'

import ParseUser from '~/models/ParseUser'

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
    }
    await dispatch('initTTS')
  } catch (err) {
    commit('setError', err)
  }
}
