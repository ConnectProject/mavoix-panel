import Parse from 'parse'

import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import AssetModel from '~/models/Asset'
import DeviceUserModel from '~/models/DeviceUser'

/*
** Initilize parse client with its models
*/
export default async ({ app, Vue }) => {
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
}
