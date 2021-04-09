import Speak from 'speak-tts'

// eslint-disable-next-line valid-jsdoc
/**
 * Init the text to speech plugin
 */
export const initTTS = ({ commit, rootState }) => {
  const speech = new Speak()
  let lang = 'fr-FR'
  if (rootState.tabEditor.tab.language) {
    lang = rootState.tabEditor.tab.language.replace('-', '_')
  }
  let speed = 1
  if (rootState.tabEditor.tab.language) {
    ({speed} = rootState.tabEditor.tab)
  }
  console.log(rootState.tabEditor.tab)
  speech.init({
    'volume': 1,
    'lang': lang,
    'rate': speed,
    'pitch': 1
  }).then(() => {
    commit('setTTS', speech)
  })
    .catch((err) => {
      commit('setError', err)
    })
}
