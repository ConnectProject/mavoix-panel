/**
 * ARASAAC pictogram id found in one of its URLs. The same pictogram appears under several URLs
 * (api.arasaac.org/api/pictograms/<id>, static.arasaac.org/pictograms/<id>/<id>_300.png).
 * @param {string} url picture url
 * @returns {number|null} pictogram id, null when the url is not an ARASAAC one
 */
export default (url) => {
  const match = (/arasaac\.org\/(?:api\/)?pictograms\/(\d+)/u).exec(url || '')

  return match ? Number(match[1]) : null
}
