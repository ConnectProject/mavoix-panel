const normalize = (lang) => String(lang || '').replace(/_/g, '-')
  .toLowerCase()

/**
 * Best installed voice for a language. Without an explicit voice, browsers may keep their default
 * (often English) voice and only tag the utterance with the language.
 * @param {SpeechSynthesisVoice[]} voices installed voices
 * @param {string} language BCP 47 code (`fr-FR`, `en_GB`, ...)
 * @returns {SpeechSynthesisVoice|undefined} voice of the exact locale, else of the same language
 */
export const pickVoice = (voices, language) => {
  const wanted = normalize(language)
  const [base] = wanted.split('-')
  const rank = (voice) => {
    const lang = normalize(voice.lang)
    if (lang === wanted) {
      return 0
    }

    const [langBase] = lang.split('-')

    return langBase === base ? 1 : 2
  }
  const candidates = (voices || []).filter((voice) => rank(voice) < 2)

  // exact locale first, then installed (offline) voices before online ones, default voice first
  return candidates.sort((a, b) => rank(a) - rank(b) ||
    Number(b.localService) - Number(a.localService) ||
    Number(b.default) - Number(a.default))[0]
}
