/* eslint-disable no-shadow */
/* eslint-disable valid-jsdoc */
/**
 * Return true if asset's manager is open
 * @param {State} state vuex state
 */
export const opened = ({ opened }) => opened

/**
 * Return true if asset's manager is loading assets
 * @param {State} state vuex state
 */
export const loading = ({ loading }) => loading

/**
 * Return all assets
 * @param {State} state vuex state
 */
export const all = ({ assets }) => assets

/**
 * Return the asset that's edited
 * @param {State} state vuex state
 */
export const editingAsset = ({ editingAsset }) => editingAsset

/**
 * Return true if editing an asset
 * @param {State} state vuex state
 */
export const editing = ({ editing }) => editing

/**
 * Return true if asset's manager is open to select an asset, false if is open to manage assets
 * @param {State} state vuex state
 */
export const selectMode = ({ selectMode }) => selectMode

export const error = ({ error }) => error
