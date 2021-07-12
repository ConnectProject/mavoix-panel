export default {
  // opened: false, // true if asset's manager is open
  loading: true, // true if asset's manager is loading assets
  error: null, // an error of the asset manager

  // selectMode: false, // true if opened to select an asset, false if to manage assets
  // selectCallback: null, // function to call with the selected asset if selectMode is set on true

  assets: [], // array of assets

  editing: false, // true if an asset's beein edited
  editingIndex: 0, // index of the edited asset in the array
  editingAsset: {
    name: '' // name of the edited asset
  }
}
