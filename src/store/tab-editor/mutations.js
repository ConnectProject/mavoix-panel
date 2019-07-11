import { changeByKey } from './utils'
import { NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'

export function setTab (state, tabModel) {
  state.tabModel = tabModel
  state.tab = {
    name: tabModel.get(NAME_KEY),
    hexColor: tabModel.get(HEX_COLOR_KEY),
    items: []
  }
  state.loading = false
}

export function setItems (state, itemsModel) {
  state.itemsModel = itemsModel
  state.tab.items = itemsModel.map((el) => ({
    name: el.get('name')
  }))
  state.tab.itemsLoading = false
}

export function setName (state, name) {
  pushHistory(state, { key: NAME_KEY, from: state.tab.name, to: name })
  state.tab.name = name
}

export function setHexColor (state, hexColor) {
  pushHistory(state, { key: HEX_COLOR_KEY, from: state.tab.hexColor, to: hexColor })
  state.tab.hexColor = hexColor
}

export function pushHistory (state, { key, from, to }) {
  state.history.splice(state.index, state.history.length - state.index, {
    key,
    from,
    to
  })
  state.index++
}

export function undo (state) {
  if (state.index === 0) return
  const history = state.history[state.index - 1]

  state.index--
  changeByKey(state, history.key, history.from)
}

export function redo (state) {
  if (state.index === state.history.length) return
  const history = state.history[state.index]

  state.index++
  changeByKey(state, history.key, history.to)
}

export function clearState (state) {
  Object.assign(state, import('./state'))
}

export function setError (state, err) {
  state.error = err
  state.loading = false
}
