<template>
  <q-dialog :value="opened" persistent>
    <div v-if="!opened"/>
    <q-card v-else>
      <h4 class="q-mb-xs text-h4 text-center">{{ device.name }}</h4>

      <!-- Print qrcode and write down the code if the password is known -->
      <div v-if="device.password">
        <q-card-section class="column items-center justify-center">
          <h6 class="text-subtitle2 text-center">{{ $t('deviceDialogs.qrcodeHeading') }}</h6>
          <qrcode-vue :value="code" />
        </q-card-section>

        <q-card-section class="column items-center justify-center">
          <h5 class="text-subtitle2 text-center">{{ $t('deviceDialogs.codeHeading') }}</h5>
          <q-input rounded outlined disable class="fit" :input-style="{ textAlign: 'center' }" :value="code"/>
        </q-card-section>
      </div>

      <!-- Otherwise offer to reset the password -->
      <q-card-section v-else class="column items-center">
        <h6 class="text-subtitle2 text-center">{{ $t('deviceDialogs.alreadyUsedHeading') }}</h6>
        <q-btn @click="onReset" color="accent" :label="$t('deviceDialogs.resetPasswordLabel')"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('generic.delete')" color="negative" @click="onDelete"/>
        <q-btn flat :label="$t('generic.close')" @click="onClose"/>
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
    onReset () {
      this.$store.dispatch('devices/resetActive')
    },
    onDelete () {
      this.$store.dispatch('devices/deleteActive')
    },
    onClose () {
      this.$store.commit('devices/closeDialog')
    }
  },
  components: {
    QrcodeVue
  }
}
</script>
