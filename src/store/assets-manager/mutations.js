import { assetIndex, assetFromModel } from './utils'

/**
 * Clear assets and set new ones
 * @param {State} state
 * @param {{AssetModel}} assetsModels asset models to set
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
 * @param {State} state
 * @param {AssetModel} assetModel asset model to ass
 */
export const addAsset = (state, assetModel) => {
  state.assets.unshift(assetFromModel(assetModel))
}

/**
 * Remove the asset that's edited
 * @param {State} state
 */
export const removeEditingAsset = (state) => {
  state.assets.splice(state.editingIndex, 1)
}

/**
 * Update the edited asset's fields
 * @param {State} state
 * @param {AssetModel} assetModel
 */
export const updateEditingAsset = (state, assetModel) => {
  const asset = assetFromModel(assetModel)
  state.assets[state.editingIndex].name = asset.name
}

/**
 * Start editing an asset
 * @param {State} state
 * @param {Asset} asset asset to edit
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
 * @param {State} state
 * @param {String} name new name
 */
export const editingAssetSetName = (state, name) => {
  state.editingAsset.name = name
}

/**
 * Cancel editing asset without saving changes
 * @param {State} state
 */
export const cancelEdit = (state) => {
  state.editing = false
}

// /**
//  * Call selectCallback and close assets manager
//  *
//  * @param {State} state
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
 * @param {State} state
 * @param {{Boolean, Function}} {
 *  selectMode: true if open to select an asset, false if to manage
 *  selectCallback: is selectMode is true, call this function when selecting an asset
 * }
 */
export const open = (state, { selectMode, selectCallback }) => {
  state.opened = true
  state.selectMode = selectMode
  state.selectCallback = selectCallback
}

/**
 * Close assets manager
 * @param {State} state
 */
export const close = (state) => {
  state.opened = false
}

/**
 * Used to throw an error
 * @param {State} state
 * @param {Error} error is the error to set
 */
export const setError = (state, err) => {
  console.error(err)
  state.error = err.message
}

/**
 * Used to reset a thrown error so that it can be thrown again
 * @param {State} state
 */
export const resetError = (state) => {
  state.error = null
}
