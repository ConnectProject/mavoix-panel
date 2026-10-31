import enUs from './en-us'
import frFr from './fr-fr'

export default {
  'fr-fr': frFr,
  'en-us': enUs
}

/**
 * Interface locale for a speech language code (`fr-FR`, `en_GB`, ...).
 * Languages without their own message set use English.
 * @param {string} language speech language code
 * @returns {string} key of the message set to use
 */
export const localeFor = (language) => (String(language).toLowerCase()
  .startsWith('fr')
  ? 'fr-fr'
  : 'en-us')
