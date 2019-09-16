import Parse from 'parse'

import AssetModel, { NAME_KEY } from '~/models/Asset'

import { modelFromAsset } from './utils'

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
      commit('setAssets', assets.reverse())
    })
}

export const destroyEditingAsset = ({ commit, state: { assets, editingIndex } }) => {
  modelFromAsset(assets[editingIndex])
    .catch((err) => {
      commit('setError', err)
    })
    .then((assetModel) => {
      assetModel.destroy()
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('removeEditingAsset')
          commit('cancelEdit')
        })
    })
}

export const saveEditingAsset = ({ commit, state: { assets, editingIndex, editingAsset } }) => {
  modelFromAsset(assets[editingIndex])
    .catch((err) => {
      commit('setError', err)
    })
    .then((assetModel) => {
      assetModel.set(NAME_KEY, editingAsset.name)
      assetModel.save()
        .catch((err) => {
          commit('setError', err)
        })
        .then((assetModel) => {
          commit('updateEditingAsset', assetModel)
          commit('cancelEdit')
        })
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
          throw err
        })
        .then((asset) => {
          commit('addAsset', asset)
        })
    })
}
