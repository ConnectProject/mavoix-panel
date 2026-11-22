// all the devices module is no longer used

export default {
  loading: true, // true if devices are loading
  error: null, // an error

  /**
   * Dialog to create new device
   */
  nameDialog: {
    name: '', // the new device name
    opened: false // true if dialog is open
  },

  /**
   * Dialog to view device
   */
  dialog: {
    opened: false, // true if dialog is open
    index: -1 // index of the device
  },

  statuses: {}, // last status of each device by id: { level (0-100 or null), charging, seenAt (Date) }
  devices: [] // list of all devices
}
