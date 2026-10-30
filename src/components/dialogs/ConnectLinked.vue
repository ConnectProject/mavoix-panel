<template>
  <q-dialog
    no-route-dismiss
    :value="value"
    @input="$emit('input', $event)"
  >
    <q-card class="connect-linked-dialog">
      <q-card-section>
        <div class="text-h5">
          {{ $t('connectLinked.title') }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="row items-start no-wrap q-gutter-md">
        <q-icon
          :name="error ? 'error_outline' : 'check_circle'"
          :color="error ? 'negative' : 'positive'"
          size="md"
        />
        <div class="text-body1">
          <template v-if="error">
            {{ $t('connectLinked.failure') }}
            <div class="text-body2 text-grey-8 q-mt-sm">
              {{ error }}
            </div>
          </template>
          <template v-else>
            {{ $t('connectLinked.success') }}
          </template>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          color="primary"
          :label="$t('generic.close')"
          @click="$emit('input', false)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogConnectLinked',

  props: {
    value: {
      type: Boolean,
      required: true
    },

    // error message when linking failed, empty when it worked
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.connect-linked-dialog
  min-width 320px
  max-width 520px
</style>
