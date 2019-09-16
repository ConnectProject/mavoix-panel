import Parse from 'parse'

import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import DeviceModel from '~/models/Device'
import AssetModel from '~/models/Asset'

export default async ({ app, Vue }) => {
  Parse.initialize('mavoix-api', 'javascriptKey')
  Parse.serverURL = 'http://localhost:8080'

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('TabItem', TabItemModel)
  Parse.Object.registerSubclass('Device', DeviceModel)
  Parse.Object.registerSubclass('Asset', AssetModel)
}
