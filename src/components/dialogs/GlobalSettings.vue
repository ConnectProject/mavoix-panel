<template>
  <div>
    <q-dialog
      :value="value"
      @input="$emit('input', $event)"
    >
      <q-card style="min-width: 520px;">
        <q-card-section>
          <div class="text-h5">
            {{ $t('globalSettings.title') }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-xl q-px-xl">
          <div>
            <div class="text-subtitle1 q-mb-sm">
              {{ $t('globalSettings.imageSizeLabel') }}
            </div>
            <q-option-group
              v-model="localImageSize"
              inline
              type="radio"
              :options="imageSizeOptions"
            />
          </div>

          <div>
            <div class="text-subtitle1 q-mb-sm">
              {{ $t('globalSettings.ttsSpeedLabel') }}
            </div>
            <q-slider
              v-model="localTTSSpeedIndex"
              :min="0"
              :max="3"
              :step="1"
              markers
              color="primary"
            />
            <div class="row justify-between q-mt-xs text-grey-7 speed-labels">
              <span>{{ $t('globalSettings.speedVerySlow') }}</span>
              <span>{{ $t('globalSettings.speedSlow') }}</span>
              <span>{{ $t('globalSettings.speedNormal') }}</span>
              <span>{{ $t('globalSettings.speedFast') }}</span>
            </div>
          </div>

          <div>
            <div class="text-subtitle1 q-mb-sm">
              {{ $t('globalSettings.ttsLanguageLabel') }}
            </div>
            <q-select
              v-model="localTTSLanguage"
              outlined
              class="global-language-select"
              emit-value
              map-options
              :options="languageOptions"
            />
          </div>

          <div>
            <div class="text-subtitle1 q-mb-sm">
              {{ $t('globalSettings.connectLabel') }}
            </div>
            <q-toggle
              :value="Boolean(connectUserId)"
              :label="connectUserId ? $t('globalSettings.connectOn') : $t('globalSettings.connectOff')"
              @input="onConnectToggle"
            />
            <div class="text-body2 text-grey-8 q-mt-xs connect-description">
              {{ $t('globalSettings.connectDescription') }}
            </div>
          </div>

          <div>
            <div class="text-subtitle1 q-mb-sm">
              {{ $t('globalSettings.configLabel') }}
            </div>
            <div class="row q-gutter-sm">
              <q-btn
                outline
                color="primary"
                icon="upload"
                :loading="importing"
                :disable="exporting"
                :label="$t('globalSettings.importConfig')"
                @click="$refs.configInput.click()"
              />
              <q-btn
                outline
                color="primary"
                icon="download"
                :loading="exporting"
                :disable="importing"
                :label="$t('globalSettings.exportConfig')"
                @click="onExport"
              />
              <input
                ref="configInput"
                type="file"
                accept=".zip,application/zip"
                class="hidden"
                @change="onImport"
              >
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            unelevated
            color="primary"
            :label="$t('generic.validate')"
            @click="onValidate"
          />
          <q-btn
            flat
            color="negative"
            :label="$t('generic.cancel')"
            @click="$emit('input', false)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from 'quasar'

import { exportAppConfig, importAppConfig } from '~/utils/appConfig'
import { connectAuthorizeUri } from '~/utils/connect'

export default {
  name: 'DialogGlobalSettings',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      localImageSize: 'medium',
      localTTSSpeedIndex: 2,
      localTTSLanguage: 'fr-FR',
      exporting: false,
      importing: false,
      speedCodes: [0.5, 0.75, 1.0, 1.25],
      imageSizeOptions: [
        { label: this.$t('globalSettings.sizeSmall'), value: 'small' },
        { label: this.$t('globalSettings.sizeMedium'), value: 'medium' },
        { label: this.$t('globalSettings.sizeLarge'), value: 'large' }
      ],
      languageOptions: [
        { label: 'Français', value: 'fr-FR' },
        { label: 'English (US)', value: 'en-US' },
        { label: 'English (UK)', value: 'en-GB' },
        { label: 'Deutsch', value: 'de-DE' },
        { label: 'Nederlands', value: 'nl-NL' },
        { label: 'Español', value: 'es-ES' },
        { label: 'Italiano', value: 'it-IT' },
        { label: 'Português', value: 'pt-PT' }
      ]
    }
  },

  computed: {
    connectUserId () {
      return this.$store.state.users.connectUserId
    }
  },

  watch: {
    value (opened) {
      if (opened) {
        this.localImageSize = this.$store.getters['global/imageSize']
        const savedSpeed = this.$store.getters['global/ttsSpeed']
        const idx = this.speedCodes.indexOf(savedSpeed)
        this.localTTSSpeedIndex = idx === -1 ? 2 : idx
        this.localTTSLanguage = this.$store.getters['global/ttsLanguage']
      }
    }
  },

  methods: {
    // enabling goes through Connect's authorization page, which sends the user back to the Home page
    onConnectToggle (enabled) {
      if (enabled) {
        window.location.href = connectAuthorizeUri()
      } else {
        this.$store.dispatch('users/unlinkFromConnect')
      }
    },

    async onExport () {
      this.exporting = true
      try {
        const blob = await exportAppConfig(this.$store.state.global)
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'mavoix-config.zip'
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (err) {
        Notify.create({ message: this.$t('globalSettings.exportError') + err.message, color: 'red' })
      } finally {
        this.exporting = false
      }
    },

    applyGlobal (global) {
      if (global.imageSize) this.$store.commit('global/setImageSize', global.imageSize)
      if (global.ttsSpeed) this.$store.commit('global/setTTSSpeed', global.ttsSpeed)
      if (global.ttsLanguage) this.$store.commit('global/setTTSLanguage', global.ttsLanguage)

      return this.$store.dispatch('global/saveGlobalSettings')
    },

    async onImport (event) {
      const [file] = event.target.files
      event.target.value = ''
      if (!file) {
        return
      }
      this.importing = true
      try {
        const { global, tabs } = await importAppConfig(file)
        await this.applyGlobal(global)
        this.$store.dispatch('assetsManager/loadAssets')
        Notify.create({ message: tabs + this.$t('globalSettings.importDone'), color: 'blue' })
        this.$emit('input', false)
      } catch (err) {
        Notify.create({ message: this.$t('globalSettings.importError') + err.message, color: 'red' })
      } finally {
        this.importing = false
      }
    },

    onValidate () {
      this.$store.commit('global/setImageSize', this.localImageSize)
      this.$store.commit('global/setTTSSpeed', this.speedCodes[this.localTTSSpeedIndex])
      this.$store.commit('global/setTTSLanguage', this.localTTSLanguage)

      this.$store.dispatch('global/saveGlobalSettings')
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.global-language-select
  max-width 320px

.global-language-select .q-field__control
  border 2px solid #9aa0ac !important
  border-radius 12px

.connect-description
  max-width 440px

.speed-labels
  font-size 0.95rem
</style>
