/* eslint-disable max-lines */
const publicImages = require('./public_images.json')

export default {
  tts: null, // tts plugin
  ttsEnabled: false, // true if tts enabled,
  error: null, // an error
  imagesSelected: [],
  images: publicImages
}
