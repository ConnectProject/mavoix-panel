import { TOKEN_KEY } from '~/models/DeviceInvitation'

export const token = ({ invitation }) => invitation.get(TOKEN_KEY)

export const loading = ({ loading }) => loading
