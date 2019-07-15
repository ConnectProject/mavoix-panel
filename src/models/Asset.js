import Parse from 'parse'

export const SOURCE_KEY = 'source'

export default class AssetModel extends Parse.Object {
  constructor () {
    super('Asset')
  }

  static New (source) {
    const newAssetModel = new AssetModel()

    newAssetModel.set(SOURCE_KEY, source)
    return newAssetModel
  }
}
