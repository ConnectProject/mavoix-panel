import Parse from 'parse'
import AssetModel, { NAME_KEY, PARSE_FILE_KEY } from '~/models/Asset'

export const assetIndex = (assets, asset) => assets.findIndex((a) => a.id === asset.id)

export const assetFromModel = (assetModel) => ({
  id: assetModel.id,
  name: assetModel.get(NAME_KEY),
  file: assetModel.get(PARSE_FILE_KEY)
})

export const modelFromAsset = (asset) => {
  return new Parse.Query(AssetModel)
    .equalTo(PARSE_FILE_KEY, asset.file)
    .first()
}
