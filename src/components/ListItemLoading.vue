<template>
  <q-item>
    <q-item-section avatar>
      <!-- Animated spinner -->
      <q-spinner-puff
        color="primary"
        size="2em"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ $t('generic.loading') }}...
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ComponentListItemLoading'
}
</script>
