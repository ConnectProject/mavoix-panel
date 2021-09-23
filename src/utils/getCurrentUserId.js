import Parse from 'parse'

/**
 * @returns {string} current user id
 */
export default () => {
  const currentUser = Parse.User.current()

  return currentUser.get('linkedAccount') || currentUser.id
}
