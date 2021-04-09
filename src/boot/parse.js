
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
  const { PARSE_APP_ID, PARSE_JS_KEY, PARSE_URL } = process.env
  Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY)
  Parse.serverURL = PARSE_URL

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('TabItem', TabItemModel)
  Parse.Object.registerSubclass('Asset', AssetModel)

  /* User */
  Parse.User.allowCustomUserClass(true)
  Parse.User.registerSubclass('DeviceUser', DeviceUserModel)
  Parse.User.registerSubclass('ParseUser', ParseUserModel)
}
