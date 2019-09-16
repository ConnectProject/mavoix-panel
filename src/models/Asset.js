import Parse from 'parse'

export const NAME_KEY = 'name'
export const PARSE_FILE_KEY = 'parseFile'

export default class AssetModel extends Parse.Object {
  constructor () {
    super('Asset')
  }

  static New (name, parseFile) {
    const newAssetModel = new AssetModel()

    newAssetModel
      .set(NAME_KEY, name)
      .set(PARSE_FILE_KEY, parseFile)
    return newAssetModel
  }
}
