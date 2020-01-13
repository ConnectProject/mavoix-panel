/**
 * Set and enable tts
 * @param {State} state
 * @param {Speak} tts plugin
 */
export const setTTS = (state, tts) => {
  state.tts = tts
  state.ttsEnabled = true
}

/**
 * Used to throw an error
 * @param {State} state
 * @param {Error} error is the error to set
 */
export const setError = (state, err) => {
  state.error = err
  console.error(err)
}
