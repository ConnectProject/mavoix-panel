import deDe from './de-de'
import enUs from './en-us'
import esEs from './es-es'
import frFr from './fr-fr'
import itIt from './it-it'
import nlNl from './nl-nl'
import ptPt from './pt-pt'

export default {
  'fr-fr': frFr,
  'en-us': enUs,
  'es-es': esEs,
  'pt-pt': ptPt,
  'de-de': deDe,
  'it-it': itIt,
  'nl-nl': nlNl
}

const LOCALES = { fr: 'fr-fr', es: 'es-es', pt: 'pt-pt', de: 'de-de', it: 'it-it', nl: 'nl-nl' }

/**
 * Interface locale for a speech language code (`fr-FR`, `en_GB`, ...).
 * Languages without their own message set use English.
 * @param {string} language speech language code
 * @returns {string} key of the message set to use
 */
export const localeFor = (language) => {
  const code = String(language).slice(0, 2)
    .toLowerCase()

  return LOCALES[code] || 'en-us'
}
