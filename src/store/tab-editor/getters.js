export const tab = ({ tab }) => tab

export const isDialogOpened = ({ newItemDialogOpened }) => newItemDialogOpened

export const isUndoable = ({ history }) => history.index > 0

export const isRedoable = ({ history }) => history.index === history.data.length

export const tabModel = ({ models: { tab } }) => tab

export const loading = ({ loading }) => loading
