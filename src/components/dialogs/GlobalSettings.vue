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

.speed-labels
  font-size 0.95rem
</style>
