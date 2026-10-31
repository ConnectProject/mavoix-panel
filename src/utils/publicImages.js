let catalogue = null

/**
 * The bundled ARASAAC pictogram catalogue (~7.6 MB of JSON). It lives in its own webpack chunk, fetched
 * on first use, so that it stays out of the main bundle and off the critical path of the first paint.
 * The array is frozen so that Vue does not walk it to make it reactive.
 * @returns {Promise<Array>} catalogue entries
 */
export const loadPublicImages = async () => {
  if (!catalogue) {
    const module = await import(/* webpackChunkName: "public-images" */ '~/store/global/public_images.json')
    catalogue = Object.freeze(module.default || module)
  }

  return catalogue
}
