export const getDefaultState = () => ({
  loading: true, // true if loading tab or/and items
  error: null, // an error

  tab: {
    slug: '', // the slug of the tab (name formatted as url)
    name: '', // the name of the tab
    hexColor: '' // the color of the tab
  },

  items: [], // items of the tab
  selectedItems: [], // list of items selected to be added to a tab
  deletedItems: [], // deleted items

  /**
   * Dialog to create/edit tab's items
   */
  itemDialog: {
    opened: false, // true if dialog's open
    mode: null, // dialog mode: `new` or `edit`
    index: -1, // position of the edited item if mode === 'edit'
    data: {
      asset: null, // asset of the item
      name: null // name of the item
    }
  },

  itemChoice: {
    opened: false, // true if dialog's open
    mode: null, // dialog mode: `new` or `edit`
    index: -1, // position of the edited item if mode === 'edit'
    data: {
      asset: null, // asset of the item
      name: null // name of the item
    }
  },
  /**
   * Undo / Redo stacks
   */
  undoStack: [],
  redoStack: []
})

export default getDefaultState()
