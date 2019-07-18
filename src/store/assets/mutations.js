export function setAssets (state, assetsModels) {
  state.assetsModels = assetsModels
  state.loading = false
}

export function addAsset (state, assetModel) {
  state.assetsModels.unshift(assetModel)
}

export function removeAsset (state, asset) {
  const index = state.assetsModels.findIndex((a) => a.id === asset.id)

  state.assetsModels.splice(index, 1)
}

export function openDialog (state) {
  state.dialogOpened = true
}

export function closeDialog (state) {
  state.dialogOpened = false
}

export function setError (state, err) {
  state.error = err
}
