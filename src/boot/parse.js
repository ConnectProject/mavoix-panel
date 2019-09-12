import Parse from 'parse'

import TabModel from 'mavoix-core/models/Tab'
import DeviceModel from 'mavoix-core/models/Device'
import DeviceInvitation from 'mavoix-core/models/DeviceInvitation'
import AssetModel from 'mavoix-core/models/Asset'

export default async ({ app, Vue }) => {
  Parse.initialize('mavoix-api', 'javascriptKey')
  Parse.serverURL = 'http://localhost:8080'

  /* Models */
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('Device', DeviceModel)
  Parse.Object.registerSubclass('DeviceInvitation', DeviceInvitation)
  Parse.Object.registerSubclass('Asset', AssetModel)
}
