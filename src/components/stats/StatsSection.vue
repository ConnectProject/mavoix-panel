<template>
  <q-card
    flat
    bordered
    class="q-pa-md stats-section"
  >
    <h2 class="text-h6 q-mt-none q-mb-xs">
      {{ title }}
    </h2>
    <p
      v-if="hint"
      class="text-grey-8 q-mb-md"
    >
      {{ hint }}
    </p>
    <slot />
  </q-card>
</template>

<script>

/** Titled card that wraps every block of the stats page. */
export default {
  name: 'StatsSection',
  props: {
    title: { type: String, required: true },
    hint: { type: String, default: '' }
  }
}
</script>
