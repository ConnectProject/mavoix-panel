/**
 * Tabs in display order: by their `order` field, tabs that never had one (created before reordering existed,
 * or added since) come last, oldest first.
 * @param {Parse.Object[]} tabs tab models
 * @returns {Parse.Object[]} new sorted array
 */
export default (tabs) => {
  const orderOf = (tab) => {
    const order = tab.get('order')

    return typeof order === 'number' ? order : Infinity
  }

  return [...tabs].sort((a, b) => {
    const diff = orderOf(a) - orderOf(b)
    if (diff !== 0 && !Number.isNaN(diff)) {
      return diff
    }

    return (a.createdAt || 0) - (b.createdAt || 0)
  })
}
