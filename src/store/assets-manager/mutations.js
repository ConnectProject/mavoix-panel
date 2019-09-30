import { assetIndex, assetFromModel } from './utils'

export const setAssets = (state, assetsModels) => {
  state.assets = []

  assetsModels.forEach(assetModel => {
    state.assets.push(assetFromModel(assetModel))
  })

  state.loading = false
}

export const addAsset = (state, assetModel) => {
  state.assets.unshift(assetFromModel(assetModel))
}

export const removeEditingAsset = (state) => {
  state.assets.splice(state.editingIndex, 1)
}

export const updateEditingAsset = (state, assetModel) => {
  const asset = assetFromModel(assetModel)
  state.assets[state.editingIndex].name = asset.name
}

export const editAsset = (state, asset) => {
  state.editingIndex = assetIndex(state.assets, asset)
  state.editingAsset = {
    name: state.assets[state.editingIndex].name
  }
  state.editing = true
}

export const editingAssetSetName = (state, name) => {
  state.editingAsset.name = name
}

export const cancelEdit = (state) => {
  state.editing = false
}

export const selectAsset = (state, asset) => {
  if (state.selectCallback) {
    state.selectCallback(asset)
    state.opened = false
  }
}

export const open = (state, { selectMode, selectCallback }) => {
  state.opened = true
  state.selectMode = selectMode
  state.selectCallback = selectCallback
}

export const close = (state) => {
  state.opened = false
}

export const setError = (state, err) => {
  console.error(err)
  state.error = err
}
