import DeviceInvitationModel from '~/models/DeviceInvitation'

export const create = ({ commit }) => {
  DeviceInvitationModel.Create()
    .save()
    .then((invitation) => {
      commit('setInvitation', invitation)
    })
    .catch((err) => {
      commit('setError', err)
    })
}
