<template>
  <div
    role="radiogroup"
    :aria-label="label"
  >
    <!-- colour that is not in the palette (tabs created before the palette existed) -->
    <div
      v-if="custom"
      class="color-custom"
    >
      <button
        type="button"
        role="radio"
        class="color-swatch color-swatch--selected"
        :style="{ background: custom.hex }"
        :title="custom.name"
        :aria-label="custom.name"
        aria-checked="true"
        tabindex="0"
        @keydown.right.prevent="move(0, 1)"
        @keydown.down.prevent="move(0, 1)"
        @keydown.left.prevent="move(0, -1)"
        @keydown.up.prevent="move(0, -1)"
      >
        <q-icon
          name="check"
          size="20px"
          color="black"
        />
      </button>
      <span>{{ custom.name }}</span>
    </div>

    <div class="color-palette">
      <button
        v-for="(color, index) in palette"
        :key="color.hex"
        type="button"
        role="radio"
        class="color-swatch"
        :class="{ 'color-swatch--selected': isSelected(color) }"
        :style="{ background: color.hex }"
        :title="color.name"
        :aria-label="color.name"
        :aria-checked="isSelected(color) ? 'true' : 'false'"
        :tabindex="isFocusable(color, index) ? 0 : -1"
        @click="$emit('input', color.hex)"
        @keydown.right.prevent="move(index + offset, 1)"
        @keydown.down.prevent="move(index + offset, 1)"
        @keydown.left.prevent="move(index + offset, -1)"
        @keydown.up.prevent="move(index + offset, -1)"
      >
        <q-icon
          v-if="isSelected(color)"
          name="check"
          size="20px"
          color="black"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { TAB_COLORS, isPaletteColor } from '~/utils/tabColors'

export default {
  name: 'ColorPalette',

  props: {
    value: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    // name given to a colour that is not in the palette (tabs created before the palette existed)
    currentLabel: {
      type: String,
      default: ''
    }
  },

  computed: {
    palette () {
      return TAB_COLORS
    },

    custom () {
      return this.value && !isPaletteColor(this.value) ? { name: this.currentLabel, hex: this.value } : null
    },

    // number of swatches before the palette in the radio group
    offset () {
      return this.custom ? 1 : 0
    },

    selectedIndex () {
      return this.palette.findIndex(this.isSelected)
    }
  },

  methods: {
    isSelected (color) {
      return color.hex.toLowerCase() === (this.value || '').toLowerCase()
    },

    // roving tabindex: only the selected swatch (or the first one) is in the tab order
    isFocusable (color, index) {
      return this.selectedIndex === -1 ? index === 0 && !this.custom : this.isSelected(color)
    },

    move (index, step) {
      const swatches = Array.from(this.$el.querySelectorAll('.color-swatch'))
      const next = (index + step + swatches.length) % swatches.length
      const hex = next < this.offset ? this.custom.hex : this.palette[next - this.offset].hex
      this.$emit('input', hex)
      this.$nextTick(() => this.$el.querySelectorAll('.color-swatch')[next].focus())
    }
  }
}
</script>

<style lang="stylus" scoped>
.color-palette
  display grid
  grid-template-columns repeat(8, 35px)
  justify-content center
  gap 10px

.color-custom
  display flex
  align-items center
  gap 12px
  margin-bottom 12px

.color-swatch
  width 35px
  height 35px
  padding 0
  border 2px solid rgba(0, 0, 0, 0.15)
  border-radius 50%
  cursor pointer
  display flex
  align-items center
  justify-content center

  &:hover
    border-color rgba(0, 0, 0, 0.45)

  &:focus-visible
    outline 3px solid #027BE3
    outline-offset 2px

.color-swatch--selected
  border-color #000
  box-shadow 0 0 0 2px #fff, 0 0 0 4px #000
</style>
