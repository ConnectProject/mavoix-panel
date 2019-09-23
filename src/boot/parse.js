import Parse from 'parse'

import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import AssetModel from '~/models/Asset'
import DeviceUserModel from '~/models/DeviceUser'

export default async ({ app, Vue }) => {
  Parse.initialize('mavoix-api', 'javascriptKey')
  Parse.serverURL = 'http://localhost:8080'

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('TabItem', TabItemModel)
  Parse.Object.registerSubclass('Asset', AssetModel)

  /* User */
  Parse.User.allowCustomUserClass(true)
  Parse.User.registerSubclass('DeviceUser', DeviceUserModel)
}
