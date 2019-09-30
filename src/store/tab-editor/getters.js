export const tab = ({ tab }) => tab

export const items = ({ items }) => items

export const deletedItems = ({ deletedItems }) => deletedItems

export const itemDialog = ({ itemDialog: { data } }) => data

export const itemDialogOpened = ({ itemDialog: { opened } }) => opened

export const itemDialogMode = ({ itemDialog: { mode } }) => mode

export const isUndoable = ({ undoStack }) => undoStack.length === 0

export const isRedoable = ({ redoStack }) => redoStack.length === 0

export const tabModel = ({ tabModel }) => tabModel

export const loading = ({ loading }) => loading
