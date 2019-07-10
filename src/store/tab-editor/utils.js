export function changeByKey (state, key, newValue) {
  switch (key) {
    case 'name':
      state.tab.name = newValue
      break
    default:
      break
  }
}
