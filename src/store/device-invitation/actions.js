
import DeviceInvitationModel from '~/models/DeviceInvitation'

export function create (context) {
  DeviceInvitationModel.Create()
    .save()
    .then((invitation) => {
      console.log(`Successfully created an invitation.`)
      context.commit('setInvitation', invitation)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}
