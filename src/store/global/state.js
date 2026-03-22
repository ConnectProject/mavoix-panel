/* eslint-disable max-lines */
const publicImages = require('./public_images.json')

export default {
  tts: null, // speech object from Speak() (speak-tts library)
  ttsEnabled: false, // true if tts enabled,
  error: null, // an error
  imagesSelected: [],
  images: publicImages,
  globalSettingsDialogOpened: false,
  imageSize: 'medium', // imageSize can be small, medium, large
  ttsSpeed: 1.0, // speed of the text to speech
  ttsLanguage: 'fr-FR' // language of the text to speech
}
