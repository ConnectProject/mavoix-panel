export function setInvitation (state, invitation) {
  state.invitation = invitation
  state.loading = false
}

export function setError (state, err) {
  state.error = err
  state.loading = false
}
