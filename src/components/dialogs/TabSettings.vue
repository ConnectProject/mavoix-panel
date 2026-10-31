<template>
  <div>
    <q-dialog
      :value="opened"
      @input="onDialogInput"
    >
      <q-card class="tab-settings-card">
        <q-card-section :style="{ background: hexColor, color: '#000000' }">
          <div class="text-h5 text-bold">
            {{ mode==="create" ? $t('tabSettings.createTitle') : $t('tabSettings.editTitle') }}
          </div>
          <q-space />
        </q-card-section>

        <q-separator />
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="name"
            class="name-input"
            :label="$t('tabSettings.tabName')"
            outlined
            autofocus
          />

          <div
            class="text-subtitle1 q-mb-sm"
            style="font-size: 1.05rem; font-weight: 500;"
          >
            {{ $t('tabSettings.backgroundColor') }}
          </div>
          <color-palette
            :value="hexColor"
            :label="$t('tabSettings.backgroundColor')"
            :current-label="$t('tabSettings.currentColor')"
            @input="onColorPicked"
          />

          <div>
            <div
              class="text-subtitle1 q-mb-xs"
              style="font-size: 1.05rem; font-weight: 500;"
            >
              {{ $t('tabSettings.icon') }}
            </div>
            <div class="icon-grid q-mt-sm">
              <q-btn
                v-for="iconName in iconOptions"
                :key="iconName"
                flat
                round
                dense
                size="md"
                :color="icon === iconName ? 'primary' : 'grey'"
                :icon="iconName"
                @click="icon = iconName"
              >
                <q-tooltip>{{ iconLabel(iconName) }}</q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-actions class="tab-settings-actions q-gutter-sm">
          <q-btn
            v-if="mode === 'edit'"
            :label="$t('generic.delete')"
            class="tab-settings-btn tab-settings-btn--delete"
            unelevated
            @click="onDelete"
          />
          <q-space />
          <q-btn
            :label="$t('generic.cancel')"
            class="tab-settings-btn tab-settings-btn--secondary"
            unelevated
            @click="onDialogInput(false)"
          />
          <q-btn
            :label="$t('generic.save')"
            class="tab-settings-btn tab-settings-btn--primary"
            unelevated
            @click="onSave"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete confirmation -->
    <q-dialog
      v-model="confirmDeleteOpen"
      persistent
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ $t('generic.delete') }}?
          </div>
          <div class="text-body2 q-pt-sm">
            {{ $t('tabSettings.deleteConfirmMessage') }}
          </div>
        </q-card-section>
        <q-card-actions
          align="center"
          class="tab-settings-actions"
        >
          <q-btn
            :label="$t('generic.cancel')"
            class="tab-settings-btn tab-settings-btn--secondary"
            unelevated
            @click="confirmDeleteOpen = false"
          />
          <q-btn
            :label="$t('generic.delete')"
            class="tab-settings-btn tab-settings-btn--delete"
            unelevated
            @click="confirmAndDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
/* eslint-disable max-lines */
import ColorPalette from '~/components/ColorPalette.vue'
import arasaacThemes from '~/utils/arasaacThemes'
import { navigateAfterTabDeleted } from '~/utils/mavoixNavigation'
import tabIcons from '~/utils/tabIcons'

export default {
  name: 'DialogTabSettings',

  components: { ColorPalette },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    mode: {
      type: String,
      required: true
    },
    tab: {
      type: Object,
      required: false,
      default: null
    }
  },

  data () {
    return {
      confirmDeleteOpen: false,
      savedHexColor: null, // colour of the tab when the dialog opened, restored if the dialog is dismissed
      name: '',
      hexColor: '#ffffff',
      icon: '',
      iconOptions: tabIcons
    }
  },

  computed: {
    opened () {
      return this.value // tab editor passes :value="$store.getters['tabEditor/tabSettingsDialogOpened']" and Home layout passes :value="$store.getters['tabs/createTabDialogOpened']"
    }
  },

  watch: {
    opened (newVal) {
      if (newVal) {
        if (this.mode === 'edit' && this.tab) {
          this.name = this.tab.name
          this.hexColor = this.tab.hexColor
          this.savedHexColor = this.tab.hexColor
          this.icon = this.tab.icon
        }
      }
    }
  },

  methods: {
    iconLabel (iconName) {
      const theme = arasaacThemes.find((candidate) => candidate.icon === iconName)

      return theme
        ? this.$t(`addImagesModal.themes.${theme.key}`)
        : this.$t(`tabSettings.otherIcons.${iconName}`)
    },

    onColorPicked (hexColor) {
      this.hexColor = hexColor
      if (this.mode === 'edit') {
        this.$store.commit('tabEditor/previewHexColor', hexColor)
      }
    },

    onDialogInput (opened) {
      if (!opened && this.mode === 'edit' && this.savedHexColor) {
        this.$store.commit('tabEditor/previewHexColor', this.savedHexColor)
      }
      this.$emit('input', opened)
    },

    onSave () {
      if (!this.name) {
        this.$q.notify({
          message: this.$t('tabSettings.nameRequired'),
          color: 'negative'
        })

        return
      }
      if (!this.hexColor) {
        this.$q.notify({
          message: this.$t('tabSettings.backgroundColorRequired'),
          color: 'negative'
        })

        return
      }

      if (this.mode === 'create') {
        this.$store.dispatch('tabs/createTabCb', {
          name: this.name,
          hexColor: this.hexColor,
          icon: this.icon,
          callback: (tab) => {
            this.$emit('input', false)
            this.$router.push({
              name: 'tab',
              params: { slug: tab.get('slug') }
            })
          }
        })
      } else if (this.mode === 'edit' && this.tab) {
        this.$store.dispatch('tabEditor/updateTab', {
          name: this.name,
          hexColor: this.hexColor,
          icon: this.icon,
          callback: () => {
            this.$emit('input', false)
          }
        })
      } else {
        this.$q.notify({
          message: this.$t('tabSettings.updateError'),
          color: 'negative'
        })
      }
    },

    onDelete () {
      this.confirmDeleteOpen = true
    },

    async confirmAndDelete () {
      this.confirmDeleteOpen = false
      this.$emit('input', false)
      await this.$store.dispatch('tabEditor/deleteTab')
      navigateAfterTabDeleted(this.$router, this.$store)
    }
  }
}

</script>

<style lang="stylus" scoped>
.tab-settings-card
  width 560px
  max-width 92vw

.icon-grid
  display grid
  // 13 columns: the 26 icons fit in two rows; 9 columns on narrow screens
  grid-template-columns repeat(13, minmax(0, 1fr))
  justify-items center

  @media (max-width 640px)
    grid-template-columns repeat(9, minmax(0, 1fr))

.name-input
    margin-bottom 16px

.tab-settings-actions
  padding-top 24px

.tab-settings-btn
  min-width 130px
  border-radius 9999px
  background #424242
  color #ffffff
  text-transform none
  font-weight 500
  justify-content center

.tab-settings-btn--delete
  background #c62828

.tab-settings-btn--secondary
  background #e0e0e0
  color #424242

.tab-settings-btn--primary
  background #027BE3
</style>
