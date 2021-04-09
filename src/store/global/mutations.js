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

export const setImages = (state, obj) => {
  if (obj.text.length > 1) {
    let lang = 'fr'
    if (obj.language) {
      lang = obj.language
    }
    console.log(lang)
    console.log(obj.text)
    state.imagesSelected = state.images.filter(word => word.names[lang]?.includes(obj.text)).slice(0, 10)
  } else {
    state.imagesSelected = []
  }
}
