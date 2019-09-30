export const setTTS = (state, tts) => {
  state.tts = tts
}

export const setError = (state, err) => {
  state.ttsEnabled = false
  console.error(err)
}
