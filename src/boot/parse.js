import Parse from 'parse'

import AssetModel from '~/models/Asset'
import DeviceUserModel from '~/models/DeviceUser'
import ParseUserModel from '~/models/ParseUser'
import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'

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
