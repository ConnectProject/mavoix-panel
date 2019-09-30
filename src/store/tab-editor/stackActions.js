import { itemIndex } from './utils'

class Action {
  constructor (from, to) {
    this.from = from
    this.to = to
  }

  whoo () {
    const from = this.from

    this.from = this.to
    this.to = from
  }

  /* Called on undo */
  reverse (state) {
    throw new Error('action reverse() not implemented')
  }

  /* Called on redo */
  do (state) {
    throw new Error('action do() not implemented')
  }
}

export class ActionName extends Action {
  reverse (state) {
    state.tab.name = this.from
  }

  do (state) {
    state.tab.name = this.to
  }
}

export class ActionHexColor extends Action {
  reverse (state) {
    state.tab.hexColor = this.from
  }

  do (state) {
    state.tab.hexColor = this.to
  }
}

export class ActionNewItem extends Action {
  reverse (state) {
    state.items.splice(itemIndex(state, this.to), 1)
  }

  do (state) {
    state.items.push(this.to)
  }
}

export class ActionUpdateItem extends Action {
  reverse (state) {
    state.items = [
      ...state.items.filter((item) => item.key !== this.from.key),
      this.from
    ]
    this._order(state)
  }

  do (state) {
    state.items = [
      ...state.items.filter((item) => item.key !== this.from.key),
      this.to
    ]
    this._order(state)
  }

  _order (state) {
    state.items.sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
  }
}
