import VueTagsInput from '@johmun/vue-tags-input'
import Draggable from 'vuedraggable'

import Fab from '~/components/Fab.vue'

/*
** Add project's components globally
*/
export default ({ Vue }) => {
  Vue.component('Fab', Fab) // never used
  Vue.component('TagsInput', VueTagsInput) // never used
  Vue.component('Draggable', Draggable)
}
