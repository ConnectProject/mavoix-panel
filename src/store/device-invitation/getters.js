import { TOKEN_KEY } from '~/models/DeviceInvitation'

export function token (state) {
  return state.invitation.get(TOKEN_KEY)
}

export function loading (state) {
  return state.loading
}
