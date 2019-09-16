<template>
  <q-dialog :value="opened" persistent>
    <div v-if="loading"></div>
    <q-card v-else>
      <q-card-section class="row items-center justify-center">
        <h6 class="q-ml-sm text-subtitle2">Pour ajouter une device a votre compte vous pouvez scanner le qrcode suivant:</h6>
        <qrcode-vue :value="code" />
      </q-card-section>

      <q-card-section class="row items-center justify-center">
        <h5 class="q-ml-sm text-subtitle2">Ou alors entrer le code d'invitation suivant dans l'application:</h5>
        <q-input rounded outlined disable class="fit" :input-style="{ textAlign: 'center' }" :value="code"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="onCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'DialogDeviceInvitation',
  computed: {
    loading () {
      return this.$store.getters['deviceInvitation/loading']
    },
    code () {
      return this.$store.getters['deviceInvitation/code']
    },
    opened () {
      return this.$store.getters['deviceInvitation/dialogOpened']
    }
  },
  watch: {
    opened (newValue) {
      if (newValue) {
        this.$store.dispatch('deviceInvitation/create')
      }
    }
  },
  methods: {
    onCancel () {
      this.$store.commit('deviceInvitation/closeDialog')
    }
  },
  components: {
    QrcodeVue
  }
}
</script>
