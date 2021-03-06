import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

/*
** Initialize internationalization component
*/

let i18n

export default ({ app, Vue }) => {
  Vue.use(VueI18n)

  app.i18n = new VueI18n({
    locale: 'fr-fr',
    fallbackLocale: 'fr-fr',
    messages
  });

  ({ i18n } = app)
}

export { i18n }
