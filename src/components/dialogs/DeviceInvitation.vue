<!-- does not seem to be used anymore -->

<template>
  <q-dialog
    :value="opened"
    persistent
  >
    <!-- Don't print anything if device not loaded -->
    <div v-if="!opened" />

    <q-card
      v-else
      class="device-card"
    >
      <h4 class="q-mb-xs text-h4 text-center">
        {{ device.deviceName }}
      </h4>

      <q-tabs
        v-model="tab"
        dense
        no-caps
        align="center"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab
          name="qr"
          :label="$t('deviceDialogs.tabQr')"
        />
        <q-tab
          name="image"
          :label="$t('deviceDialogs.tabImage')"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          name="qr"
          class="q-pa-none"
        >
          <!-- Print qrcode and write down the code if the password is known -->
          <div v-if="device.password">
            <q-card-section class="column items-center justify-center">
              <h6 class="text-subtitle2 text-center">
                {{ $t('deviceDialogs.qrcodeHeading') }}
              </h6>
              <qrcode-vue
                :value="code"
                :size="240"
              />
            </q-card-section>

            <q-card-section class="column items-center justify-center">
              <h5 class="text-subtitle2 text-center">
                {{ $t('deviceDialogs.codeHeading') }}
              </h5>
              <q-input
                rounded
                outlined
                readonly
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
        </q-tab-panel>

        <q-tab-panel
          name="image"
          class="q-pa-lg"
        >
          <q-toggle
            :value="overridden"
            :label="$t('deviceDialogs.imageOverride')"
            @input="onToggleOverride"
          />
          <div class="text-caption text-grey-8 q-mt-xs q-mb-md">
            {{ $t('deviceDialogs.imageOverrideNote') }}
          </div>
          <div class="row items-center no-wrap q-gutter-md">
            <span>{{ $t('globalSettings.sizeSmall') }}</span>
            <q-slider
              :value="localScale"
              :min="0"
              :max="100"
              :disable="!overridden"
              color="primary"
              @input="localScale = $event"
              @change="onScaleChange"
            />
            <span>{{ $t('globalSettings.sizeLarge') }}</span>
          </div>
        </q-tab-panel>
      </q-tab-panels>

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

// slider position matching the medium size (170px between 120px and 240px)
const MEDIUM_SCALE = 42

export default {
  name: 'DialogDeviceInvitation',
  components: {
    QrcodeVue
  },
  data () {
    return {
      tab: 'qr',
      localScale: MEDIUM_SCALE // slider position while it is dragged
    }
  },
  computed: {

    /**
     * @returns {(number|null)} image scale chosen for this device, null when it follows the global setting
     */
    imageScale () {
      const settings = this.$store.getters['devices/settings'][this.device && this.device.id]

      return settings && typeof settings.imageScale === 'number' ? settings.imageScale : null
    },

    /**
     * @returns {boolean} true if this device has its own image size
     */
    overridden () {
      return this.imageScale !== null
    },

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
     * @returns {string} the code (in the form username:password)
     */
    code () {
      return `${this.device.username}:${this.device.password}`
    }
  },
  watch: {
    imageScale: {
      immediate: true,
      handler (value) {
        this.localScale = value === null ? MEDIUM_SCALE : value
      }
    },
    opened (value) {
      if (value) {
        this.tab = 'qr'
      }
    }
  },
  methods: {

    /**
     * Turn the device's own image size on or off
     * @param {boolean} on true to use the slider position, false to follow the global setting
     * @returns {void}
     */
    onToggleOverride (on) {
      this.saveScale(on ? this.localScale : null)
    },

    /**
     * Called when the slider is released: the device shows the new size right away
     * @param {number} value slider position
     * @returns {void}
     */
    onScaleChange (value) {
      this.saveScale(value)
    },

    saveScale (imageScale) {
      this.$store.dispatch('devices/setImageScale', { deviceId: this.device.id, imageScale })
    },

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

<style lang="stylus" scoped>
.device-card
  min-width 340px
</style>
