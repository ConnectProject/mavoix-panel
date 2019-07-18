export const setInvitation = (state, invitation) => {
  state.invitation = invitation
  state.loading = false
}

export const setError = (state, err) => {
  state.error = err
  state.loading = false
}
