/**
 * Set tabs
 * @param {State} state vuex state
 * @param {TabModel[]} tabs tabs to set
 * @returns {void}
 */
export const setTabs = (state, tabs) => {
  state.tabs = tabs
  state.loading = false
}

/**
 * Add a tab
 * @param {State} state vuex state
 * @param {TabModel} tab tab to add
 * @returns {void}
 */
export const addTab = (state, tab) => {
  state.tabs.push(tab)
}

/**
 * Remove a tab from its id
 * @param {State} state vuex state
 * @param {String} id tab's id to remove
 * @returns {void}
 */
export const removeTabById = (state, id) => {
  state.tabs = state.tabs.filter(el => el.id !== id)
}

/**
 * Open the new tabs dialog
 * @param {State} state vuex state
 * @returns {void}
 */
export const openDialog = (state) => {
  state.dialogOpen = true
}

/**
 * Close the new tabs dialog
 * @param {State} state vuex state
 * @returns {void}
 */
export const closeDialog = (state) => {
  state.dialogOpen = false
}

/**
 * Open the edit tab dialog (from tab bar)
 * @param {State} state vuex state
 * @param {TabModel} tab Parse tab model to edit
 * @returns {void}
 */
export const openEditDialog = (state, tab) => {
  state.editTab = tab
  state.editDialogOpen = true
}

/**
 * Close the edit tab dialog
 * @param {State} state vuex state
 * @returns {void}
 */
export const closeEditDialog = (state) => {
  state.editDialogOpen = false
  state.editTab = null
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @returns {void}
 */
export const setError = (state, err) => {
  state.error = err
  state.loading = false
}
