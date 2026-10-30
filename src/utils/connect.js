/**
 * Where Connect sends the user back after authorizing MaVoix (the Home page links the account).
 * @returns {string} redirect uri
 */
export const connectRedirectUri = () => `${window.location.origin}/home`

/**
 * @returns {string} Connect page where the user authorizes MaVoix to share data
 */
export const connectAuthorizeUri = () =>
  `${process.env.CONNECT_URL}/authorize?client_id=${process.env.CONNECT_CLIENT_ID}&redirect_uri=${connectRedirectUri()}&response_type=code`
