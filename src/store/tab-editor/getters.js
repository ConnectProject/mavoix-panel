export const tab = ({ tab }) => tab

export const itemDialog = ({ itemDialogData }) => itemDialogData

export const itemDialogOpened = ({ itemDialogOpened }) => itemDialogOpened

export const itemDialogMode = ({ itemDialogMode }) => itemDialogMode

export const isUndoable = ({ history }) => history.index > 0

export const isRedoable = ({ history }) => history.index === history.data.length

export const tabModel = ({ tabModel }) => tabModel

export const loading = ({ loading }) => loading
