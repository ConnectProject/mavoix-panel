import AssetModel from '~/models/Asset'
import DeviceUserModel from '~/models/DeviceUser'
import Parse from 'parse'
import ParseUserModel from '~/models/ParseUser'
import TabItemModel from '~/models/TabItem'
import TabModel from '~/models/Tab'

/*
** Initilize parse client with its models
*/
export default ({ app, Vue }) => {
  Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY)
  Parse.serverURL = process.env.PARSE_URL

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('TabItem', TabItemModel)
  Parse.Object.registerSubclass('Asset', AssetModel)

  /* User */
  Parse.User.allowCustomUserClass(true)
  Parse.User.registerSubclass('DeviceUser', DeviceUserModel)
  Parse.User.registerSubclass('ParseUser', ParseUserModel)
  // throw new Error('error')
}
