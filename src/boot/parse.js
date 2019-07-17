import Parse from 'parse'

import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import DeviceModel from '~/models/Device'
import DeviceInvitation from '~/models/DeviceInvitation'
import AssetModel from '~/models/Asset'

export default async ({ app, Vue }) => {
  Parse.initialize('mavoix-api', 'djDi7D6j2m')
  Parse.serverURL = 'http://localhost:8080'

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('TabItem', TabItemModel)
  Parse.Object.registerSubclass('Device', DeviceModel)
  Parse.Object.registerSubclass('DeviceInvitation', DeviceInvitation)
  Parse.Object.registerSubclass('Asset', AssetModel)
}
