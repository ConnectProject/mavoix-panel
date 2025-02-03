<template>
  <span>
    <span
      v-for="(letter, index) in text"
      :key="index"
      class="colored-letter"
    >{{ letter }}</span>
  </span>
</template>

<script>
export default {
  name: 'ColoredText',
  props: {
    text: {
      default: '',
      type: String
    }
  }
}
</script>

<style scoped>
.colored-letter:nth-child(5n-4) {
  color: var(--red);
}

.colored-letter:nth-child(5n-4) {
  color: var(--red);
}

.colored-letter:nth-child(5n-3) {
  color: var(--yellow);
}

.colored-letter:nth-child(5n-2) {
  color: var(--green);
}

.colored-letter:nth-child(5n-1) {
  color: var(--grey);
}

.colored-letter:nth-child(5n) {
  color: var(--brown);
}
</style>
