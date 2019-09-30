export const getDefaultState = () => ({
  loading: true,
  error: null,

  tab: {
    slug: '',
    name: '',
    hexColor: ''
  },

  items: [],
  deletedItems: [],
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
})

export default getDefaultState()
