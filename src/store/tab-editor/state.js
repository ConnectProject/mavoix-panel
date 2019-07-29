export default {
  loading: true,
  error: null,

  itemDialogOpened: false,
  itemDialogMode: null,
  itemDialogData: {
    id: null,
    asset: null,
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
