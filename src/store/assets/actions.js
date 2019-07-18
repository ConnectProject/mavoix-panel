import Parse from 'parse'

import AssetModel from '~/models/Asset'

export const openAndLoad = ({ commit, dispatch }) => {
  commit('openDialog')
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

export const editAsset = ({ commit }, asset) => {
}

export const destroyAsset = ({ commit, state: { assetsModels } }, asset) => {
  if (asset) {
    asset.destroy()
      .catch((err) => {
        commit('setError', err)
      })
      .then(() => {
        commit('removeAsset', asset)
      })
  }
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
