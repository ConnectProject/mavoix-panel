import DeviceInvitationModel from '~/models/DeviceInvitation'

export const create = ({ commit }) => {
  DeviceInvitationModel.Create()
    .save()
    .then((invitation) => {
      console.log(`Successfully created an invitation.`)
      commit('setInvitation', invitation)
    })
    .catch((err) => {
      commit('setError', err)
    })
}
