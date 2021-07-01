<!-- does not seem to be used anymore -->

<template>
  <q-dialog
    :value="opened"
    persistent
  >
    <!-- Don't print anything if device not loaded -->
    <div v-if="!opened" />

    <q-card v-else>
      <h4 class="q-mb-xs text-h4 text-center">
        {{ device.deviceName }}
      </h4>

      <!-- Print qrcode and write down the code if the password is known -->
      <div v-if="device.password">
        <q-card-section class="column items-center justify-center">
          <h6 class="text-subtitle2 text-center">
            {{ $t('deviceDialogs.qrcodeHeading') }}
          </h6>
          <qrcode-vue :value="code" />
        </q-card-section>

        <q-card-section class="column items-center justify-center">
          <h5 class="text-subtitle2 text-center">
            {{ $t('deviceDialogs.codeHeading') }}
          </h5>
          <q-input
            rounded
            outlined
            disable
            class="fit"
            :input-style="{ textAlign: 'center' }"
            :value="code"
          />
        </q-card-section>
      </div>

      <!-- Otherwise offer to reset the password -->
      <q-card-section
        v-else
        class="column items-center"
      >
        <h6 class="text-subtitle2 text-center">
          {{ $t('deviceDialogs.alreadyUsedHeading') }}
        </h6>
        <q-btn
          color="accent"
          :label="$t('deviceDialogs.resetPasswordLabel')"
          @click="onReset"
        />
      </q-card-section>

      <q-card-actions align="right">
        <!-- Delete device -->
        <q-btn
          flat
          :label="$t('generic.delete')"
          color="negative"
          @click="onDelete"
        />

        <!-- Close dialog -->
        <q-btn
          flat
          :label="$t('generic.close')"
          @click="onClose"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'DialogDeviceInvitation',
  components: {
    QrcodeVue
  },
  computed: {

    /**
     * @returns {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['devices/dialog'].opened
    },

    /**
     * @returns {Object} the device
     */
    device () {
      return this.$store.getters['devices/active']
    },

    /**
     * @returns {string} the code (in the form name:password)
     */
    code () {
      return `${this.device.name}:${this.device.password}`
    }
  },
  methods: {

    /**
     * Call to create a new password for the device
     * @returns {void}
     */
    onReset () {
      this.$store.dispatch('devices/resetActive')
    },

    /**
     * Call to delete the device
     * @returns {void}
     */
    onDelete () {
      this.$store.dispatch('devices/deleteActive')
    },

    /**
     * Call to close the dialog
     * @returns {void}
     */
    onClose () {
      this.$store.commit('devices/closeDialog')
    }
  }
}
</script>
