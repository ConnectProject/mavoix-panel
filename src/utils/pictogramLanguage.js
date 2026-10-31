/**
 * Key of the names in the catalog for a speech language.
 * @param {string} language speech language code (`fr-FR`, `en_GB`, ...)
 * @returns {string} two-letter code
 */
export const pictogramLang = (language) => String(language || 'fr').slice(0, 2)
  .toLowerCase()

/**
 * Names of a pictogram in the given language, falling back to English, then French, then any language.
 * @param {object} entry catalog entry
 * @param {string} language speech language code
 * @returns {string[]} names, possibly empty
 */
export const pictogramNames = (entry, language) => {
  const names = (entry && entry.names) || {}
  const own = names[pictogramLang(language)]

  if (own && own.length) {
    return own
  }

  // pictograms without a name in the language fall back to English
  return names.en || names.fr || Object.values(names)[0] || []
}

/**
 * @param {object} entry catalog entry
 * @param {string} language speech language code
 * @returns {string|undefined} first name found
 */
export const pictogramName = (entry, language) => pictogramNames(entry, language)[0]
