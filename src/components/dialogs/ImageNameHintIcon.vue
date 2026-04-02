<template>
  <q-icon
    name="info_outline"
    size="16px"
    class="image-name-hint-icon cursor-pointer"
    color="grey-5"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 8]"
      max-width="320px"
    >
      <div class="text-body2 text-weight-bold q-mb-xs">
        {{ $t('imageNameHint.title') }}
      </div>
      <div class="text-caption">
        {{ $t('imageNameHint.body') }}
      </div>
    </q-tooltip>
  </q-icon>
</template>

<script>
export default {
  name: 'ImageNameHintIcon'
}
</script>

<style scoped>
.image-name-hint-icon {
  vertical-align: middle;
}
</style>
