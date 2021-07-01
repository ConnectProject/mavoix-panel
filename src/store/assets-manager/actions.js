import AssetModel, { NAME_KEY } from '~/models/Asset'
import Jimp from 'jimp'
import Parse from 'parse'
import Unidecode from 'unidecode'

import { modelFromAsset } from './utils'

/**
 * Open the asset manager and load assets
 * @param {Context} ctx context passed vuex
 * @param {{ Boolean, Function }} {
 *  selectMode: is the asset manager started to select an asset or to manage them
 *  selectCallback: is selectMode is true call this function with the selected asset as parameter
 * }
 * @returns {void}
 */
export const openAndLoad = ({ commit, dispatch }, { selectMode = false, selectCallback }) => {
  commit('open', { selectMode, selectCallback })
  dispatch('loadAssets')
}

/**
 * Load every assets for the user
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
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
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const destroyEditingAsset = ({ commit, state: { assets, editingIndex } }) => {
  modelFromAsset(assets[editingIndex])
    .then((assetModel) =>
      assetModel.destroy()
    )
    .then(() => {
      commit('removeEditingAsset')
      commit('cancelEdit')
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Save the asset that's edited
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
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
 * @param {Context} ctx context passed vuex
 * @param {File} file the file to upload
 */

export const uploadFile = async ({ commit }, file) => {
  const image = await Jimp.read(await file.arrayBuffer())
  const maxDim = Math.max(image.bitmap.width, image.bitmap.height)
  if (maxDim > 512) {
    if (maxDim === image.bitmap.width) {
      image.resize(512, Jimp.AUTO)
    } else {
      image.resize(Jimp.AUTO, 512)
    }
  }
  const buf = await image.getBufferAsync(Jimp.AUTO)
  var blob = new Blob([buf])

  const filename = Unidecode(file.name)
    .replace(/^[^a-z0-9]+/i, '')
    .replace(/[^a-z0-9. \-_]/gi, '_')

  return new Parse.File(filename, blob)
    .save()
    .then((newFile) =>
      AssetModel.New(filename.replace(/\.[^/.]+$/, ""), newFile, newFile._url, localStorage.getItem('id'))
        .save()
    )
    .then((asset) => {
      commit('addAsset', asset)
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
