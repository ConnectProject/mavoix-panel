<template>
  <q-dialog :value="opened" persistent>
    <div v-if="!opened"/>
    <q-card v-else>
      <q-card-section class="column items-center justify-center">
        <h6 class="q-ml-sm text-subtitle2 text-center">{{ $t('deviceDialogs.qrcodeHeading') }}</h6>
        <qrcode-vue :value="code" />
      </q-card-section>

      <q-card-section class="column items-center justify-center">
        <h5 class="q-ml-sm text-subtitle2 text-center">{{ $t('deviceDialogs.codeHeading') }}</h5>
        <q-input rounded outlined disable class="fit" :input-style="{ textAlign: 'center' }" :value="code"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('generic.cancel')" color="negative" @click="onCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'DialogDeviceInvitation',
  computed: {
    opened () {
      return this.$store.getters['devices/dialog'].opened
    },
    device () {
      return this.$store.getters['devices/active']
    },
    code () {
      return `${this.device.name}:${this.device.password}`
    }
  },
  methods: {
    onCancel () {
      this.$store.commit('devices/closeDialog')
    }
  },
  components: {
    QrcodeVue
  }
}
</script>
