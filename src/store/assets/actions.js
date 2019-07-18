import Parse from 'parse'

import AssetModel from '~/models/Asset'

export const openAndLoad = ({ commit, dispatch }) => {
  commit('openDialog')
  dispatch('loadAssets')
}

export const loadAssets = (context) => {
  new Parse.Query(AssetModel)
    .find()
    .catch((err) => {
      context.commit('setError', err)
    })
    .then((assets) => {
      context.commit('setAssets', assets)
    })
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

export const uploadFile = (context, file) => {
  new Parse.File(file.name, file)
    .save()
    .catch((err) => {
      context.commit('setError', err)
    })
    .then((file) => {
      AssetModel.New(file.name().split('from ')[1], file)
        .save()
        .catch((err) => {
          context.commit('setError', err)
        })
        .then((asset) => {
          context.commit('addAsset', asset)
        })
    })
}
