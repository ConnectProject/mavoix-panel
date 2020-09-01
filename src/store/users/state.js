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
  isConnected: false,
  user: {} // user connected
}
