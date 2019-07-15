export default {
  loading: true,
  itemsLoading: true,
  error: null,

  newItemDialogOpened: false,

  models: {
    tab: null,
    items: null
  },
  history: {
    index: 0,
    data: []
  },
  tab: {
    name: '',
    hexColor: '',
    items: []
  }
}
