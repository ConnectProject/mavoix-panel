export default {
  loading: true,
  error: null,

  tab: {
    name: '',
    hexColor: ''
  },

  items: [],
  itemDialog: {
    opened: false,
    mode: null,
    data: {
      id: null,
      asset: null,
      name: null
    }
  },

  history: {
    index: 0,
    data: []
  }
}
