export const getDefaultState = () => ({
  loading: true, // true if loading tab or/and items
  error: null, // an error

  tab: {
    slug: '', // the slug of the tab (name formatted as url)
    name: '', // the name of the tab
    hexColor: '', // the color of the tab
    speed: '',
    language: ''
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

  itemLanguage: {
    opened: false
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
  language: 'French',
  speed: 'Normal',
  undoStack: [],
  redoStack: [],
  languages: ['French', 'English (US)', 'English (UK)', 'German', 'Dutch', 'Spanish', 'Italian', 'Portuguese'],
  languagesCodes: ['fr_FR', 'en_US', 'en_UK', 'de_DE', 'nl_NL', 'es_ES', 'it_IT', 'pt_PT'],
  speeds: ['25%', '50%', '75%', 'Normal', '125%', '150%', '175%', '200%'],
  speedsCodes: [0.25, 0.5, 0.75, 1.0, 1.25, 1.50, 1.75, 2.0]
})

export default getDefaultState()
