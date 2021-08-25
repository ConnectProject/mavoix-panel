
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

    <q-layout view="hHh Lpr lff">
      <!-- Toolbar -->
      <q-header style="background:grey">
        <q-toolbar style="height:75px">
          <q-toolbar-title>{{ $t('appTitle') }}</q-toolbar-title>
          <q-btn
            onclick="alert('Go to doc')"
            flat
            icon="help"
          />
          <q-btn
            onclick="alert('Go to project\'s GitHub')"
            flat
            icon="fab fa-github"
          />
          <q-btn
            flat
            no-caps
            @click="onLogout"
          >
            {{ $t('logoutLabel') }}
          </q-btn>
        </q-toolbar>
      </q-header>

      <!-- Navigation drawer -->
      <q-drawer
        v-model="drawerOpen"
        :width="200"
        :breakpoint="500"
        show-if-abovebordered
      >
        <q-scroll-area
          style="background:grey"
          class="fit"
        >
          <q-list
            padding
            class="menu-list"
          >
            <!-- Home -->
            <q-item
              v-ripple
              clickable
              class="text-white"
              :to="{ name: 'home' }"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('navDrawer.home') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              clickable
              class="text-white"
              :to="{ name: 'assets' }"
            >
              <q-item-section avatar>
                <q-icon name="photo_library" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('navDrawer.assetsManager') }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Tabs -->
            <q-item-label
              header
              class="text-white"
            >
              {{ $t('navDrawer.tabs') }}
            </q-item-label>
            <!-- If the query is loading -->
            <list-item-loading v-if="$store.state.tabs.loading" />
            <div v-else>
              <!-- Render fetched tab buttons -->
              <q-item
                v-for="(tab, index) in tabs"
                :key="index"
                v-ripple
                :style="{
                  color: getTextColor(tab.get('hexColor')),
                  'border-radius':' 32px 0 0 32px',
                  background: tab.get('hexColor'),
                  marginRight:(tab.get('name')===selectedTab)?0:'1px',
                  marginLeft:(tab.get('name')===selectedTab)?'5px':'20px'
                }"
                clickable
                :to="{ name: 'tab', params: { slug: tab.get('slug') }}"
              >
                <q-item-section avatar>
                  <q-icon name="category" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ tab.get('name') }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <!-- Click to add a tab -->
              <q-item
                v-ripple
                style="margin-left:150px;border-radius:32px 0 0 32px;background:white"
                clickable
                @click="$store.commit('tabs/openDialog')"
              >
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
              </q-item>
            </div>

            <!-- Devices -->
            <q-item-label
              header
              class="text-white"
            >
              {{ $t('navDrawer.devices') }}</q-item-label>
            <!-- If the query is loading -->
            <list-item-loading v-if="$store.state.devices.loading" />
            <!-- If the query has returned its result -->
            <div v-else>
              <!-- Render fetched devices buttons -->
              <q-item
                v-for="(device, index) in devices"
                :key="index"
                v-ripple
                :style="{
                  color: 'black',
                  'border-radius':' 32px 0 0 32px',
                  marginRight:'1px',
                  marginLeft:'20px'
                }"
                class="bg-grey-4"
                clickable
                @click="$store.commit('devices/openDialog', index)"
              >
                <q-item-section avatar>
                  <q-icon name="devices_other" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ device.deviceName }}</q-item-label>
                </q-item-section>
              </q-item>

              <!-- Click to add a device -->
              <q-item
                v-ripple
                style="margin-left:150px;border-radius:32px 0 0 32px;background:white"
                clickable
                @click="$store.commit('devices/openNameDialog')"
              >
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <!-- <q-item-section>
                  <q-item-label>{{ $t('navDrawer.addDevice') }}</q-item-label>
                </q-item-section> -->
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>

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

import DialogDeviceInvitation from '~/components/dialogs/DeviceInvitation'
import DialogDeviceName from '~/components/dialogs/DeviceName'
import DialogTabName from '~/components/dialogs/TabName'

import ListItemLoading from '~/components/ListItemLoading'

import Parse from 'parse'

// import QrcodeVue from 'qrcode.vue'

export default {
  name: 'LayoutHome',
  components: {
    // QrcodeVue,
    ListItemLoading,
    // DialogAssetsManager,
    DialogTabName,
    DialogDeviceName,
    DialogDeviceInvitation
  },
  data () {
    return {
      // dnd: false,
      drawerOpen: this.$q.platform.is.desktop
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

  /**
   * Load tabs
   * Load devices
   * If route is host/assets open assets manager
   * @returns {void}
   */
  mounted () {
    if (!Parse.User.current()) {
      this.$router.push({
        name: 'auth'
      })
    } else {
      this.$store.dispatch('tabs/loadTabs')
      this.$store.dispatch('assetsManager/loadAssets')
      this.$store.dispatch('devices/loadDevices')
      this.$store.dispatch('global/initTTS')
    }
  },
  // watch: {
  //   /**
  //    * When route change, if its host/assets open assets manager
  //    * Do not seem to be useful anymore
  //    */
  //   '$route' (to, from) {
  //     if (to.params.assets && to.params.assets === 'assets') {
  //       this.$store.dispatch('assetsManager/openAndLoad', {
  //         selectMode: false
  //       })
  //       this.$store.dispatch('tabs/loadTabs', this.$store.state.users.user.id)
  //     }
  //   }
  // },
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
      // localStorage.clear()
      this.$router.push({
        name: 'auth'
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

      const getLuminance = function (hexColor) {
        var color = (hexColor.charAt(0) === '#') ? hexColor.substring(1, 7) : hexColor
        var r = parseInt(color.substring(0, 2), 16) // hexToR
        var g = parseInt(color.substring(2, 4), 16) // hexToG
        var b = parseInt(color.substring(4, 6), 16) // hexToB
        var uicolors = [r / 255, g / 255, b / 255]
        var c = uicolors.map(col => col <= 0.03928 ? col / 12.92 : ((col + 0.055) / 1.055) ** 2.4)

        return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
      }

      var L = getLuminance(bgColor)
      var L1 = getLuminance(lightColor)
      var L2 = getLuminance(darkColor)

      return (L > Math.sqrt((L1 + 0.05) * (L2 + 0.05)) - 0.05) ? darkColor : lightColor;
    }
  }
}
</script>

<style lang="stylus" scoped>
.transparent
  opacity 0

.menu-list .q-item
  border-radius 0 32px 32px 0
  margin 1px 1px 0 10px
  color black

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
