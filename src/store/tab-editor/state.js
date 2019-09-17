export default {
  loading: true,
  error: null,

  tab: {
    slug: '',
    name: '',
    hexColor: ''
  },

  items: [],
  itemDialog: {
    opened: false,
    mode: null,
    index: -1,
    data: {
      asset: null,
      name: null
    }
  },

  history: {
    index: 0,
    data: []
  }
}
