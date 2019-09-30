export const setTTS = (state, tts) => {
  state.tts = tts
}

export const setError = (_, err) => {
  console.error(err)
}
