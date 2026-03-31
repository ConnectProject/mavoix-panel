
<template>
  <div @dragenter="onDragEnter">
    <!-- Dropzone -->
    <!-- Image drag & drop hidden feature -->
    <div
      ref="dnd"
      class="dnd z-max hidden text-center row items-center justify-center full-height full-width bg-black text-white"
    >
      <div class="text-center">
        <div class="dotted">
          <q-icon
            name="cloud_upload"
            style="font-size: 5em;"
          />
          <br>
          {{ $t('dnd.dropFiles') }}
        </div>
      </div>
      <div
        class="fixed full-height full-width transparent"
        @dragleave="onDragLeave"
      >
        <!-- full size multiple-files input -->
        <input
          type="file"
          class="full-height full-width transparent"
          multiple
          @input="uploadFiles"
        >
      </div>
    </div>

    <q-layout view="hHh lpr lff">
      <!-- Toolbar -->
      <q-header class="top-header">
        <q-toolbar class="top-main-nav">
          <q-toolbar-title class="text-weight-bold">
            {{ $t('appTitle') }}
          </q-toolbar-title>

          <div class="top-main-nav__center row items-center no-wrap q-gutter-xs">
            <q-btn
              flat
              no-caps
              :class="{ 'top-link--active': $route.name === 'tab' }"
              icon="tab"
              :label="$t('navDrawer.tabs')"
              @click="goToTabs"
            />
            <q-btn
              flat
              no-caps
              :class="{ 'top-link--active': $route.name === 'assets' }"
              icon="photo_library"
              :label="$t('navDrawer.assetsManager')"
              :to="{ name: 'assets' }"
            />
            <q-btn
              flat
              no-caps
              icon="settings"
              :label="$t('navDrawer.globalSettings')"
              @click="openGlobalSettingsDialog"
            />
          </div>
        </q-toolbar>
        <q-toolbar class="top-tabs-nav">
          <list-item-loading v-if="$store.state.tabs.loading" />
          <div
            v-else
            class="row items-end no-wrap full-width top-tabs-row"
          >
            <q-tabs
              inline-label
              no-caps
              dense
              class="top-tabs"
            >
              <q-route-tab
                v-for="(tab, index) in tabs"
                :key="index"
                :to="{ name: 'tab', params: { slug: tab.get('slug') }}"
                :style="{
                  color: getTextColor(tab.get('hexColor')),
                  background: tab.get('hexColor')
                }"
                class="top-tab-pill"
                active-class="top-tab-pill--active"
                :icon="tab.get('icon') || 'category'"
                :label="tab.get('name')"
              />
            </q-tabs>
            <q-btn
              class="top-tabs__add"
              dense
              flat
              icon="add_circle"
              @click="openCreateTabDialog"
            />
          </div>
        </q-toolbar>
      </q-header>

      <dialog-global-settings
        :value="$store.getters['global/globalSettingsDialogOpened']"
        @input="v => !v && closeGlobalSettingsDialog()"
      />
      <dialog-tab-settings
        :value="$store.getters['tabs/createTabDialogOpened']"
        :mode="'create'"
        @input="v => !v && closeCreateTabDialog()"
      />
      <DialogWelcomeMaVoix
        v-model="welcomeDialogOpen"
      />

      <q-page-container>
        <router-view />
      </q-page-container>

      <dialog-tab-name />
      <dialog-device-name />
      <dialog-device-invitation />
    </q-layout>
  </div>
</template>

<script>
/* eslint-disable max-lines */

/* Dialogs */
// import DialogAssetsManager from '~/components/dialogs/AssetsManager'

import Parse from 'parse'

import DialogDeviceInvitation from '~/components/dialogs/DeviceInvitation'
import DialogDeviceName from '~/components/dialogs/DeviceName'
import DialogGlobalSettings from '~/components/dialogs/GlobalSettings'
import DialogTabName from '~/components/dialogs/TabName'
import DialogTabSettings from '~/components/dialogs/TabSettings'
import DialogWelcomeMaVoix from '~/components/dialogs/WelcomeMaVoix'
import ListItemLoading from '~/components/ListItemLoading'
import { getLandingTabSlug, setLastTabSlug, shouldHideWelcome } from '~/utils/mavoixNavigation'

// import QrcodeVue from 'qrcode.vue'

export default {
  name: 'LayoutHome',
  components: {
    // QrcodeVue,
    ListItemLoading,
    // DialogAssetsManager,
    DialogTabName,
    DialogDeviceName,
    DialogDeviceInvitation,
    DialogTabSettings,
    DialogGlobalSettings,
    DialogWelcomeMaVoix
  },
  data () {
    return {
      welcomeDialogOpen: false,
      welcomeOfferedThisSession: false
    }
  },
  computed: {
    // code () {
    //   return localStorage.getItem('username') + ':' +
    //     localStorage.getItem('password')
    // },
    // users () {
    //   return this.$store.getters['users/users']
    // },

    /**
     * @returns {Object} all devices
     * never called
     */
    devices () {
      return this.$store.getters['devices/devices']
    },

    /**
     * @returns {Object} all tabs
     */
    tabs () {
      return this.$store.getters['tabs/tabs']
    },
    selectedTab () {
      return this.$route.params.slug
      // return this.$store.getters['tabEditor/tab']
    }
  },

  watch: {
    '$route' (to) {
      if (to.name === 'tab' && to.params.slug) {
        setLastTabSlug(to.params.slug)
      }
      if (to.name === 'home') {
        this.ensureTabsThenMaybeRedirectFromHome()
      }
    }
  },

  beforeCreate () {
    if (!Parse.User.current()) {
      this.$router.replace({
        name: 'auth'
      })
    }
  },

  /**
   * Load tabs
   * Load devices
   * If route is host/assets open assets manager
   * @returns {void}
   */
  mounted () {
    if (Parse.User.current()) {
      this.$store.dispatch('tabs/loadTabs')
        .then(() => this.ensureTabsThenMaybeRedirectFromHome())
        .then(() => {
          this.maybeOpenWelcomeDialogOnce()
        })
      this.$store.dispatch('assetsManager/loadAssets')
      this.$store.dispatch('devices/loadDevices')
      this.$store.dispatch('users/loadConnectUserId')
      this.$store.dispatch('global/loadGlobalSettings')
      this.$store.dispatch('global/initTTS')
    }
  },
  methods: {

    /**
     * show dropzone when entering window
     * @param {object} e event
     * @returns {void}
     **/
    onDragEnter (e) {
      const dt = e.dataTransfer
      if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
        this.$refs.dnd.classList.remove('hidden')
      }
    },

    /**
     * hide dropzone when leaving window
     * @param {object} e event
     * @returns {void}
     **/
    onDragLeave (e) {
      this.$refs.dnd.classList.add('hidden')
    },

    /**
     * Upload file on drop
     * This function may not be used if the DropZone is not used
     * @returns {void}
     **/
    uploadFiles ({ target: { files } }) {
      this.$store.dispatch('assetsManager/uploadFiles', { files })
      this.onDragLeave()
    },

    /**
     * Go to auth page
     * @returns {void}
     **/
    onLogout () {
      // reset vuex store
      this.$store.commit('reset')
      Parse.User.logOut()
      this.$router.push({
        path: '/'
      })
    },

    /**
     * Get text color given background color
     * https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black
     * @param {string} bgColor background color
     * @param {string} lightColor light text color
     * @param {string} darkColor dark text color
     * @returns {string} text color
     **/
    getTextColor (bgColor, lightColor = '#FFFFFF', darkColor = '#000000') {
      if (!bgColor) return darkColor

      const getLuminance = function (hexColor) {
        const color = (hexColor.charAt(0) === '#') ? hexColor.substring(1, 7) : hexColor
        const r = parseInt(color.substring(0, 2), 16) // hexToR
        const g = parseInt(color.substring(2, 4), 16) // hexToG
        const b = parseInt(color.substring(4, 6), 16) // hexToB
        const uicolors = [r / 255, g / 255, b / 255]
        const c = uicolors.map(col => (col <= 0.03928 ? col / 12.92 : ((col + 0.055) / 1.055) ** 2.4))

        return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
      }

      const L = getLuminance(bgColor)
      const L1 = getLuminance(lightColor)
      const L2 = getLuminance(darkColor)

      return (L > Math.sqrt((L1 + 0.05) * (L2 + 0.05)) - 0.05) ? darkColor : lightColor
    },

    openCreateTabDialog () {
      this.$store.commit('tabs/openCreateTabDialog')
    },

    goToTabs () {
      if (this.tabs.length > 0) {
        const slug = getLandingTabSlug(this.tabs)
        this.$router.push({ name: 'tab', params: { slug } })
      } else {
        this.openCreateTabDialog()
      }
    },

    shouldSkipRedirectFromHome () {
      const q = this.$route.query || {}

      if (q.code) {
        return true
      }

      if (q.stay === '1') {
        return true
      }

      return false
    },

    async ensureTabsThenMaybeRedirectFromHome () {
      if (this.$route.name !== 'home') {
        return
      }
      if (this.shouldSkipRedirectFromHome()) {
        return
      }
      if (this.tabs.length === 0) {
        await this.$store.dispatch('tabs/ensureDefaultTabIfEmpty')
      }
      this.redirectFromHomeToTab()
    },

    redirectFromHomeToTab () {
      if (this.$route.name !== 'home') {
        return
      }
      if (this.shouldSkipRedirectFromHome()) {
        return
      }
      const slug = getLandingTabSlug(this.tabs)
      if (slug) {
        this.$router.replace({ name: 'tab', params: { slug } })
      }
    },

    maybeOpenWelcomeDialogOnce () {
      if (this.welcomeOfferedThisSession || shouldHideWelcome()) {
        return
      }
      this.welcomeOfferedThisSession = true
      this.$nextTick(() => {
        this.welcomeDialogOpen = true
      })
    },

    closeCreateTabDialog () {
      this.$store.commit('tabs/closeCreateTabDialog')
    },

    openGlobalSettingsDialog () {
      this.$store.commit('global/openGlobalSettingsDialog')
    },

    closeGlobalSettingsDialog () {
      this.$store.commit('global/closeGlobalSettingsDialog')
    }
  }
}
</script>

<style lang="stylus" scoped>
.transparent
  opacity 0

.top-header
  background #f4f5f8
  color #1f2a44

.top-main-nav
  position relative
  min-height 66px
  padding 0 14px

.top-main-nav__center
  position absolute
  left 50%
  transform translateX(-50%)
  max-width calc(100% - 260px)
  overflow-x auto
  overflow-y hidden
  white-space nowrap

.top-link--active
  background #e6ebf7
  border-radius 999px

.top-tabs-nav
  min-height 40px
  padding 0 10px 0
  background transparent

.top-tabs
  max-width calc(100vw - 120px)
  overflow-x auto

.top-tab-pill
  border-radius 12px 12px 0 0
  margin-right 2px
  min-height 40px
  padding 0 10px
  margin-top 10px

.top-tab-pill--active
  min-height 40px
  margin-top 8px

.top-tabs-row
  gap 2px

.top-tabs__add
  margin-bottom 0

.top-tabs-nav :deep(.q-toolbar__content)
  min-height 40px !important
  padding 0

.top-tabs :deep(.q-tab)
  min-height 40px
  padding-bottom 0

.top-tabs :deep(.q-tab__indicator)
  display none

.drag-enter
  background red !important

.dnd
  position fixed
  opacity .95

.dotted
  border 2px dotted white
  border-radius 8px
  padding 24px 32px
</style>
