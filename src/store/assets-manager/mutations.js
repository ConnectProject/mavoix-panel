import { assetFromModel, assetIndex } from './utils'

/**
 * Clear assets and set new ones
 * @param {State} state vuex state
 * @param {{AssetModel}} assetsModels asset models to set
 * @returns {void}
 */
export const setAssets = (state, assetsModels) => {
  state.assets = []

  assetsModels.forEach(assetModel => {
    state.assets.push(assetFromModel(assetModel))
  })

  state.loading = false
}

/**
 * Add an asset
 * @param {State} state vuex state
 * @param {AssetModel} assetModel asset model to ass
 * @returns {void}
 */
export const addAsset = (state, assetModel) => {
  state.assets.unshift(assetFromModel(assetModel))
}

/**
 * Remove the asset that's edited
 * @param {State} state vuex state
 * @returns {void}
 */
export const removeEditingAsset = (state) => {
  state.assets.splice(state.editingIndex, 1)
}

/**
 * Update the edited asset's fields
 * @param {State} state vuex state
 * @param {AssetModel} assetModel asset model
 * @returns {void}
 */
export const updateEditingAsset = (state, assetModel) => {
  const asset = assetFromModel(assetModel)
  state.assets[state.editingIndex].name = asset.name
}

/**
 * Start editing an asset
 * @param {State} state vuex state
 * @param {Asset} asset asset to edit
 * @returns {void}
 */
export const editAsset = (state, asset) => {
  state.editingIndex = assetIndex(state.assets, asset)
  state.editingAsset = {
    name: state.assets[state.editingIndex].name
  }
  // state.editing = true
}

/**
 * Set edited asset's name
 * @param {State} state vuex state
 * @param {String} name new name
 * @returns {void}
 */
export const editingAssetSetName = (state, name) => {
  state.editingAsset.name = name
}

/**
 * Cancel editing asset without saving changes
 * @param {State} state vuex state
 * @returns {void}
 */
export const cancelEdit = (state) => {
  state.editing = false
}

// /**
//  * Call selectCallback and close assets manager
//  *
//  * @param {State} state vuex state
//  * @param {Asset} asset asset to select
//  * Never called
//  */
// export const selectAsset = (state, asset) => {
//   if (state.selectCallback) {
//     state.selectCallback(asset)
//     state.opened = false
//   }
// }

/**
 * Open the assets manager
 * @param {State} state vuex state
 * @param {{Boolean, Function}} {
 *  selectMode: true if open to select an asset, false if to manage
 *  selectCallback: is selectMode is true, call this function when selecting an asset
 * }
 * @returns {void}
 */
// export const open = (state, { selectMode, selectCallback }) => {
//   state.opened = true
//   state.selectMode = selectMode
//   state.selectCallback = selectCallback
// }

/**
 * Close assets manager
 * @param {State} state vuex state
 * @returns {void}
 */
export const close = (state) => {
  state.opened = false
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @returns {void}
 */
export const setError = (state, err) => {
  console.error(err)
  state.error = err.message
}

/**
 * Used to reset a thrown error so that it can be thrown again
 * @param {State} state vuex state
 * @returns {void}
 */
export const resetError = (state) => {
  state.error = null
}
