import Parse from 'parse'
import AssetModel, { NAME_KEY, PARSE_FILE_KEY, URL_KEY } from '~/models/Asset'

/**
 * Return the index of an asset in an array of assets
 * @param {[Asset]} assets array of assets
 * @param {Asset} asset asset to find
 */
export const assetIndex = (assets, asset) => assets.findIndex((a) => a.id === asset.id)

/**
 * Transform a model to an object
 * @param {AssetModel} assetModel the model to transform
 */
export const assetFromModel = (assetModel) => ({
  id: assetModel.id,
  name: assetModel.get(NAME_KEY),
  url: assetModel.get(URL_KEY),
  file: assetModel.get(PARSE_FILE_KEY)
})

/**
 * Retrive a model from an object
 * @param {Asset} asset the asset to retrive
 */
export const modelFromAsset = (asset) => {
  return new Parse.Query(AssetModel)
    .equalTo(PARSE_FILE_KEY, asset.file)
    .first()
}
