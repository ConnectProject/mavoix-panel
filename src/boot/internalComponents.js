import Fab from '~/components/Fab.vue'
import VueTagsInput from '@johmun/vue-tags-input'

export default ({ Vue }) => {
  Vue.component('fab', Fab)
  Vue.component('tags-input', VueTagsInput)
}
