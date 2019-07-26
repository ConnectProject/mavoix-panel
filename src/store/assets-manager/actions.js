import Parse from 'parse'

import AssetModel, { NAME_KEY } from '~/models/Asset'

export const openAndLoad = ({ commit, dispatch }, { selectMode = false, selectCallback }) => {
  commit('open', { selectMode, selectCallback })
  dispatch('loadAssets')
}

export const loadAssets = ({ commit }) => {
  new Parse.Query(AssetModel)
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((assets) => {
      commit('setAssets', assets)
    })
}

export const destroyEditingAsset = ({ commit, state: { assetsModels, editingIndex } }) => {
  const asset = assetsModels[editingIndex]

  asset.destroy()
    .catch((err) => {
      commit('setError', err)
    })
    .then(() => {
      commit('removeAsset', asset)
      commit('cancelEdit')
    })
}

export const saveEditingAsset = ({ commit, state: { assetsModels, editingIndex, editingAsset } }) => {
  const asset = assetsModels[editingIndex]

  asset.set(NAME_KEY, editingAsset.name)
  asset.save()
    .catch((err) => {
      commit('setError', err)
    })
    .then((newAsset) => {
      commit('updateEditingAsset', newAsset)
      commit('cancelEdit')
    })
}

export const uploadFile = ({ commit }, file) => {
  new Parse.File(file.name, file)
    .save()
    .catch((err) => {
      commit('setError', err)
    })
    .then((file) => {
      AssetModel.New(file.name().split('from ')[1] || file.name(), file)
        .save()
        .catch((err) => {
          commit('setError', err)
        })
        .then((asset) => {
          commit('addAsset', asset)
        })
    })
}
