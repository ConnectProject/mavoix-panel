import Parse from 'parse'

export const NAME_KEY = 'name'
export const URL_KEY = 'url'
export const PARSE_FILE_KEY = 'parseFile'
export const PARENT_KEY = 'parent'
export const USER_KEY = 'user'

/*
** Represents assets
*/
export default class AssetModel extends Parse.Object {
  constructor () {
    super('Asset')
  }

  static New (name, parseFile, url, user) {
    const newAssetModel = new AssetModel()
    console.log(url)
    newAssetModel
      .set(NAME_KEY, name) // Asset's name
      .set(USER_KEY, user)
      .set(PARENT_KEY, null) // Asset's creator
      .set(URL_KEY, url) // Asset's creator
    if (parseFile) {
      newAssetModel.set(PARSE_FILE_KEY, parseFile) // Asset's parse file
    }

    return newAssetModel
  }
}
