import Parse from 'parse'

import TabModel from '~/models/Tab'
import DeviceModel from '~/models/Device'

export default () => {
  Parse.Object.registerSubclass('Tab', TabModel)
  Parse.Object.registerSubclass('Device', DeviceModel)
}
