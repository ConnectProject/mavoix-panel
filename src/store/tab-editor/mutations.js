import { changeByKey } from './utils'

export function setTab (state, tabModel) {
  state.tabModel = tabModel
  state.tab = {
    name: tabModel.get('name')
  }
  state.loading = false
}

export function setName (state, name) {
  pushHistory(state, { key: 'name', from: state.tab.name, to: name })
  state.tab.name = name
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
