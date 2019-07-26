export default {
  loading: true,
  error: null,

  newItemDialogOpened: false,
  newItemData: {
    assetModel: null,
    name: null
  },

  tabModel: null,
  tab: {
    name: '',
    hexColor: '',
    items: []
  },

  history: {
    index: 0,
    data: []
  }
}
