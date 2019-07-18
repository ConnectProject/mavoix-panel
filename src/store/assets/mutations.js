export const setAssets = (state, assetsModels) => {
  state.assetsModels = assetsModels
  state.loading = false
}

export const addAsset = (state, assetModel) => {
  state.assetsModels.unshift(assetModel)
}

export const removeAsset = (state, asset) => {
  const index = state.assetsModels.findIndex((a) => a.id === asset.id)
  state.assetsModels.splice(index, 1)
}

export const openDialog = (state) => {
  state.dialogOpened = true
}

export const closeDialog = (state) => {
  state.dialogOpened = false
}

export const setError = (state, err) => {
  state.error = err
}
