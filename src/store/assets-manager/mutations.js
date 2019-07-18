import { assetIndex } from './utils'
import { NAME_KEY } from '~/models/Asset'

export const setAssets = (state, assetsModels) => {
  state.assetsModels = assetsModels
  state.loading = false
}

export const addAsset = (state, assetModel) => {
  state.assetsModels.unshift(assetModel)
}

export const removeAsset = (state, asset) => {
  state.assetsModels.splice(assetIndex(state.assetsModels, asset), 1)
}

export const updateEditingAsset = (state, newAsset) => {
  state.assetsModels[state.editingIndex] = newAsset
}

export const editAsset = (state, asset) => {
  state.editingIndex = assetIndex(state.assetsModels, asset)
  state.editingAsset = {
    name: state.assetsModels[state.editingIndex].get(NAME_KEY)
  }
  state.editing = true
}

export const editingAssetSetName = (state, name) => {
  state.editingAsset.name = name
}

export const cancelEdit = (state) => {
  state.editingIndex = -1
  state.editingAsset = {}
  state.editing = false
}

export const open = (state) => {
  state.opened = true
}

export const close = (state) => {
  state.opened = false
}

export const setError = (state, err) => {
  state.error = err
}
