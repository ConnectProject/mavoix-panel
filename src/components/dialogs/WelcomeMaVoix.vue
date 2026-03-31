<template>
  <q-dialog
    :value="value"
    @input="$emit('input', $event)"
  >
    <q-card class="welcome-dialog">
      <q-card-section>
        <div class="text-h6 q-mb-sm">
          {{ $t('welcome.title') }}
        </div>
        <p class="text-body2 text-grey-8 q-mb-lg welcome-dialog__intro">
          {{ $t('welcome.intro') }}
        </p>

        <div class="column q-gutter-md welcome-dialog__steps">
          <div class="row items-start welcome-dialog__step">
            <q-icon
              name="photo_library"
              color="primary"
              size="md"
              class="welcome-dialog__step-icon"
            />
            <div class="welcome-dialog__step-text text-body1">
              {{ $t('welcome.stepImages') }}
            </div>
          </div>
          <div class="row items-start welcome-dialog__step">
            <q-icon
              name="add_circle"
              color="primary"
              size="md"
              class="welcome-dialog__step-icon"
            />
            <div class="welcome-dialog__step-text text-body1">
              {{ $t('welcome.stepTabs') }}
            </div>
          </div>
          <div class="row items-start welcome-dialog__step">
            <q-icon
              name="settings"
              color="primary"
              size="md"
              class="welcome-dialog__step-icon"
            />
            <div class="welcome-dialog__step-text text-body1">
              {{ $t('welcome.stepSettings') }}
            </div>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <q-checkbox
          v-model="dontShowAgain"
          dense
          :label="$t('welcome.dontShowAgain')"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          no-caps
          unelevated
          color="primary"
          :label="$t('welcome.ok')"
          @click="onOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { setHideWelcome } from '~/utils/mavoixNavigation'

export default {
  name: 'DialogWelcomeMaVoix',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dontShowAgain: false
    }
  },
  watch: {
    value (open) {
      if (!open) {
        this.dontShowAgain = false
      }
    }
  },
  methods: {
    onOk () {
      if (this.dontShowAgain) {
        setHideWelcome()
      }
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.welcome-dialog
  min-width 320px
  max-width 520px

.welcome-dialog__intro
  line-height 1.5
  margin-bottom 0

.welcome-dialog__steps
  padding 4px 0

.welcome-dialog__step
  gap 14px

.welcome-dialog__step-icon
  flex-shrink 0
  margin-top 2px

.welcome-dialog__step-text
  line-height 1.55
  flex 1
  min-width 0
</style>
