import { i18n } from '~/boot/i18n.js'
import { localeFor } from '~/i18n'
import { pictogramNames } from '~/utils/pictogramLanguage'

/**
 * Set and enable tts
 * @param {State} state vuex state
 * @param {Speak} tts plugin
 * @returns {void}
 */
export const setTTS = (state, tts) => {
  state.tts = tts
  state.ttsEnabled = true
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @returns {void}
 */
export const setError = (state, err) => {
  state.error = err
  console.error(err)
}

export const setPublicImages = (state, images) => {
  state.images = images
}

export const setImages = (state, obj) => {
  if (obj.text.length > 1) {
    // search in the interface/speech language, as the picture names are in that language
    const text = obj.text.toLowerCase()
    const matching = (image) => pictogramNames(image, state.ttsLanguage).filter(name => name.toLowerCase().includes(text))
    state.imagesSelected = state.images.filter(image => matching(image).length).slice(0, 20)
      .map(image => Object.assign(image, { name: matching(image)[0] }))
  } else {
    state.imagesSelected = []
  }
}

export const openGlobalSettingsDialog = (state) => {
  state.globalSettingsDialogOpened = true
}

export const closeGlobalSettingsDialog = (state) => {
  state.globalSettingsDialogOpened = false
}

export const setImageSize = (state, imageSize) => {
  state.imageSize = imageSize
}

export const setTTSSpeed = (state, ttsSpeed) => {
  state.ttsSpeed = ttsSpeed
}

export const setTTSLanguage = (state, ttsLanguage) => {
  state.ttsLanguage = ttsLanguage
  // the interface follows the speech language
  if (i18n) {
    i18n.locale = localeFor(ttsLanguage)
  }
}
