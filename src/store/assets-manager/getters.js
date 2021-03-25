/**
 * Return true if asset's manager is open
 * @param {State} State
 */
export const opened = ({ opened }) => opened

/**
 * Return true if asset's manager is loading assets
 * @param {State} state
 */
export const loading = ({ loading }) => loading

/**
 * Return all assets
 * @param {State} state
 */
export const all = ({ assets }) => assets

/**
 * Return the asset that's edited
 * @param {State} state
 */
export const editingAsset = ({ editingAsset }) => editingAsset

/**
 * Return true if editing an asset
 * @param {State} state
 */
export const editing = ({ editing }) => editing

/**
 * Return true if asset's manager is open to select an asset, false if is open to manage assets
 * @param {State} state
 */
export const selectMode = ({ selectMode }) => selectMode

export const error = ({ error }) => error
