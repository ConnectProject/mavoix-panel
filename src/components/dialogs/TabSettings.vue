<template>
  <q-dialog v-model="opened" persistent>
    <q-card style="width: 420px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">
          {{ mode === 'create' ? $t('tabSettings.createTitle') : $t('tabSettings.editTitle') }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="form.name"
          :label="$t('tabSettings.tabName')"
          filled
          autofocus
        />

        <div>
          <div class="text-caption q-mb-xs">{{ $t('tabSettings.backgroundColor') }}</div>
          <div class="row items-center q-gutter-sm">
            <input
              type="color"
              :value="normalizedHex"
              @input="form.hexColor = $event.target.value"
              class="color-input"
            />
            <span class="text-caption">{{ normalizedHex }}</span>
          </div>
        </div>

        <div>
          <div class="text-caption q-mb-xs">{{ $t('tabSettings.icon') }}</div>
          <div class="icon-grid q-mt-sm">
            <q-btn
              v-for="iconName in iconOptions"
              :key="iconName"
              flat
              round
              :color="form.icon === iconName ? 'primary' : 'grey'"
              :icon="iconName"
              @click="form.icon = iconName"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat :label="$t('generic.cancel')" v-close-popup />
        <q-btn
          color="primary"
          :label="mode === 'create' ? $t('tabSettings.createButton') : $t('generic.save')"
          :disable="!form.name"
          @click="onSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

/**
 * TabSettings is used in two places:
 * - Create (HomeLayout): no tab. value = tabs/dialogOpened (opened by tabs/openDialog). Save → createTabCb (API).
 * - Edit (HomeLayout or TabEditor): tab is the Parse model when available (tabs/editTab or tabEditor/tabModel).
 *   Save → updateTabCb (API). If tab is ever a plain object (fallback), Save → persistTabSettings (API).
 * isParseModel(tab) is true when tab has .get (Parse model); then we always use updateTabCb.
 */
export default {
  name: 'DialogTabSettings',

  props: {
    value: Boolean,
    tab: Object,
    mode: {
      type: String,
      default: 'edit'
    }
  },

  data () {
    return {
      form: {
        name: '',
        hexColor: '#2171e1',
        icon: ''
      },
      hue: 210,
      iconOptions: [
        'restaurant',
        'directions_run',
        'soup_kitchen',
        'check_circle',
        'home',
        'settings',
        'local_cafe',
        'build',
        'sports_bar',
        'wine_bar',
        'calculate',
        'flag',
        'category',
        'favorite',
        'star'
      ]
    }
  },

  computed: {
    opened: {
      get () { return this.value },
      set (v) { this.$emit('input', v) }
    },
    normalizedHex () {
      const hex = (this.form.hexColor || '').trim()
      if (!hex) return '#2171e1'

      return hex.startsWith('#') ? hex : '#' + hex
    }
  },

  watch: {
    value (isOpen) {
      if (isOpen) this.syncFormFromTab()
    },
    tab: {
      immediate: true,
      handler () {
        this.syncFormFromTab()
      }
    }
  },

  methods: {
    isParseModel (tab) {
      return tab && typeof tab.get === 'function'
    },

    syncFormFromTab () {
      const { tab } = this
      if (!tab) {
        this.form.name = ''
        this.form.hexColor = '#2171e1'
        this.form.icon = ''

        return
      }
      const rawHex = this.isParseModel(tab) ? tab.get('hexColor') : tab.hexColor
      const hex = (rawHex && String(rawHex).trim()) || '#2171e1'
      this.form.name = this.isParseModel(tab) ? tab.get('name') : tab.name
      this.form.hexColor = hex.startsWith('#') ? hex : '#' + hex
      this.form.icon = this.isParseModel(tab) ? (tab.get('icon') || '') : (tab.icon || '')
    },

    onSave () {
      const hexColor = this.normalizedHex
      if (this.mode === 'create') {
        this.$store.dispatch('tabs/createTabCb', {
          name: this.form.name,
          hexColor,
          icon: this.form.icon || '',
          callback: (tab) => {
            this.$router.push({ name: 'tab', params: { slug: tab.get('slug') } })
          }
        })
        this.$store.commit('tabs/closeDialog')
      } else if (this.isParseModel(this.tab)) {

        /* Edit: tab is Parse model (from bar or from TabEditor via tabEditor/tabModel). Save via API and sync tab-editor. */
        this.$store.dispatch('tabs/updateTabCb', {
          tab: this.tab,
          name: this.form.name,
          hexColor,
          icon: this.form.icon || '',
          callback: () => {
            this.$store.commit('tabEditor/setTab', this.tab)
          }
        })
      } else {

        /* Fallback: tab is plain object (e.g. tabModel not set yet). Persist via tabEditor. */
        this.$store.dispatch('tabEditor/persistTabSettings', {
          name: this.form.name,
          hexColor,
          icon: this.form.icon || ''
        })
      }
      this.opened = false
    }
  }
}
</script>

<style scoped>
.color-input {
  width: 48px;
  height: 32px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}
</style>
