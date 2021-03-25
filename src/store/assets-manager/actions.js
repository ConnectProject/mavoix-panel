import Parse from 'parse'
import Unidecode from 'unidecode'
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
    .equalTo('user', localStorage.getItem('id'))
    .find()
    .then((assets) => {
      console.log(assets)
      commit('setAssets', assets.reverse())
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Delete the asset that's edited
 * @param {Context} ctx
 */
export const destroyEditingAsset = ({ commit, state: { assets, editingIndex } }) => {
  modelFromAsset(assets[editingIndex])
    .then((assetModel) =>
      assetModel.destroy()
    ).then(() => {
      commit('removeEditingAsset')
      commit('cancelEdit')
    }).catch((err) => {
      commit('setError', err)
    })
}

/**
 * Save the asset that's edited
 * @param {Context} ctx
 */
export const saveEditingAsset = ({ commit, state: { assets, editingIndex, editingAsset } }) => {
  modelFromAsset(assets[editingIndex])
    .then((assetModel) => {
      assetModel.set(NAME_KEY, editingAsset.name)
      return assetModel.save()
    })
    .then((assetModel) => {
      commit('updateEditingAsset', assetModel)
      commit('cancelEdit')
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Upload a file and create the asset
 * @param {Context} ctx
 * @param {File} file the file to upload
 */

export const uploadFile = ({ commit }, file) => {
  const name = Unidecode(file.name)
    .replace(/^[^a-z0-9]+/i, '')
    .replace(/[^a-z0-9. \-_]/gi, '_')

  return new Parse.File(name, file)
    .save()
    .then((file) =>
      AssetModel.New(name, file, file._url, localStorage.getItem('id'))
        .save()
    )
    .then((asset) => {
      commit('addAsset', asset)
    })
    .catch((err) => {
      commit('setError', err)
      throw err
    })
}

export const addAsset = ({ commit }, obj) => {
  AssetModel.New(obj.name, false, obj.url, localStorage.getItem('id'))
    .save()
    .then((asset) => {
      console.log(asset)
      commit('addAsset', asset)
    })
    .catch((err) => {
      commit('setError', err)
    })
}
