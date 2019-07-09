<template>
  <q-dialog v-model="opened" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <h6 class="q-ml-sm text-subtitle2">Pour ajouter une device a votre compte vous pouvez scanner le qrcode suivant:</h6>
      </q-card-section>

      <q-card-section class="row items-center">
        <h5 class="q-ml-sm text-subtitle2">Ou alors entrer le code d'invitation suivant dans l'application:</h5>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="onCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogDeviceInvitation',
  props: {
    opened: Boolean,
    onCancel: Function
  }
}
</script>
