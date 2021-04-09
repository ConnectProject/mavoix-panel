import AssetModel, { NAME_KEY, PARSE_FILE_KEY, URL_KEY } from '~/models/Asset'
import Parse from 'parse'

/**
 * Return the index of an asset in an array of assets
 * @param {Asset[]} assets array of assets
 * @param {Asset} asset asset to find
 * @returns {number} index of the asset
 */
export const assetIndex = (assets, asset) => assets.findIndex((a) => a.id === asset.id)

/**
 * Transform a model to an object
 * @param {AssetModel} assetModel the model to transform
 * @returns {Object} the object
 */
export const assetFromModel = (assetModel) => {
  const parseFile = assetModel.get(PARSE_FILE_KEY)
  // update asset url if asset is a Parse file
  const url = parseFile
    // ? parseFile.url()
    ? `${Parse.serverURL}/files/${Parse.applicationId}/${parseFile._name}`
    : assetModel.get(URL_KEY)

  return {
    id: assetModel.id,
    name: assetModel.get(NAME_KEY),
    url: url,
    file: parseFile
  }
}

/**
 * Retrieve a model from an object
 * @param {Asset} asset the asset to retrieve
 * @returns {AssetModel} the asset model
 */
export const modelFromAsset = (asset) => new Parse.Query(AssetModel)
  .equalTo(PARSE_FILE_KEY, asset.file)
  .first()
