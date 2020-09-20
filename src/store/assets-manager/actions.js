import Parse from 'parse'
import Unidecode from 'unidecode'
import { LocalStorage } from 'quasar'
import AssetModel, { NAME_KEY } from '~/models/Asset'

import { modelFromAsset } from './utils'

/**
 * Open the asset manager and load assets
 * @param {Context} ctx
 * @param {{ Boolean, Function }} {
 *  selectMode: is the asset manager started to select an asset or to manage them
 *  selectCallback: is selectMode is true call this function with the selected asset as parameter
 * }
 *
 */
export const openAndLoad = ({ commit, dispatch }, { selectMode = false, selectCallback }) => {
  commit('open', { selectMode, selectCallback })
  dispatch('loadAssets')
}

/**
 * Load every assets for the user
 * @param {Context} ctx
 */
export const loadAssets = ({ commit }) => {
  new Parse.Query(AssetModel)
    .equalTo('user', LocalStorage.id)
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((assets) => {
      console.log(assets)
      commit('setAssets', assets.reverse())
    })
}

/**
 * Delete the asset that's edited
 * @param {Context} ctx
 */
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

/**
 * Save the asset that's edited
 * @param {Context} ctx
 */
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

/**
 * Upload a file and create the asset
 * @param {Context} ctx
 * @param {File} file the file to upload
 */

export const uploadFile = ({ commit }, file) => {
  const name = Unidecode(file.name)

  new Parse.File(name, file)
    .save()
    .catch((err) => {
      commit('setError', err)
    })
    .then((file) => {
      AssetModel.New(name, file, file._url, LocalStorage.id)
        .save()
        .catch((err) => {
          commit('setError', err)
        })
        .then((asset) => {
          commit('addAsset', asset)
        })
    })
}

export const addAsset = ({ commit }, obj) => {
  AssetModel.New(obj.name, false, obj.url, LocalStorage.id)
    .save()
    .catch((err) => {
      commit('setError', err)
    })
    .then((asset) => {
      console.log(asset)
      commit('addAsset', asset)
    })
}
