<template>
  <q-dialog
    :value="value"
    @input="$emit('input', $event)"
  >
    <q-card class="asset-delete-dialog">
      <q-card-section class="text-center q-pb-none">
        <div class="asset-delete-dialog__title">
          {{ $t('assetEditor.deleteDialog.title') }}
        </div>
      </q-card-section>

      <q-card-section class="text-center q-pt-md q-pb-md">
        <div class="asset-delete-dialog__message">
          {{ $t('assetEditor.deleteDialog.message') }}
        </div>
      </q-card-section>

      <q-card-actions
        align="center"
        class="q-pt-none q-pb-md"
      >
        <q-btn
          no-caps
          class="asset-delete-dialog__btn asset-delete-dialog__btn--no"
          :label="$t('assetEditor.deleteDialog.cancel')"
          @click="onCancel"
        />
        <q-btn
          no-caps
          class="asset-delete-dialog__btn asset-delete-dialog__btn--yes"
          :label="$t('assetEditor.deleteDialog.confirm')"
          @click="onConfirm"
        />
      </q-card-actions>

      <q-card-section class="q-pt-none">
        <q-checkbox
          v-model="dontAskAgain"
          keep-color
          class="asset-delete-dialog__checkbox"
          :label="$t('assetEditor.deleteDialog.dontAskAgain')"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetDelete',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dontAskAgain: false
    }
  },
  watch: {
    value (opened) {
      if (!opened) {
        this.dontAskAgain = false
      }
    }
  },
  methods: {
    onCancel () {
      this.$emit('input', false)
    },
    onConfirm () {
      this.$emit('confirm', { dontAskAgain: this.dontAskAgain })
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
.asset-delete-dialog
  min-width 360px
  max-width 600px
  border-radius 12px

.asset-delete-dialog__title
  color #d13b37
  font-size 28px
  font-weight 700
  line-height 1.2

.asset-delete-dialog__message
  color #404a5b
  font-size 16px
  line-height 1.2

.asset-delete-dialog__btn
  min-width 110px
  min-height 40px
  border-radius 8px
  font-size 16px
  margin 0 6px

.asset-delete-dialog__btn--no
  background #d6dae3
  color #525e73

.asset-delete-dialog__btn--yes
  background #141f38
  color #ffffff

.asset-delete-dialog__checkbox
  font-size 14px
  color #242d3b
  padding-left 8px

.asset-delete-dialog__checkbox :deep(.q-checkbox__label)
  font-size 16px

.asset-delete-dialog__checkbox :deep(.q-checkbox__inner)
  width 22px
  height 40px
</style>
