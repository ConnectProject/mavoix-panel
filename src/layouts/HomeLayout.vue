
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

    <q-layout view="hHh Lpr lFf">
      <!-- Toolbar -->
      <q-header elevated class="bg-white text-black">
        <!-- Top Navigation Bar -->
        <q-toolbar class="bg-white" style="height: 64px;">
          <q-toolbar-title>Ma Voix</q-toolbar-title>

          <q-btn flat :label="$t('navDrawer.home')" :to="{ name: 'home' }" />
          <q-btn flat :label="$t('navDrawer.tabs')" :to="{ name: 'home' }" />
          <q-btn flat :label="$t('navDrawer.assetsManager')" :to="{ name: 'assets' }" />

          <q-btn flat :label="$t('navDrawer.devices')" @click="devicesMenuOpen = !devicesMenuOpen">
            <q-icon name="devices_other" class="q-mr-xs" />
            <q-menu v-model="devicesMenuOpen" anchor="bottom left" self="top left">
              <q-list style="min-width: 200px;">
                <list-item-loading v-if="$store.state.devices.loading" />
                <template v-else>
                  <q-item
                    v-for="(device, index) in devices"
                    :key="index"
                    v-ripple
                    clickable
                    @click="$store.commit('devices/openDialog', index); devicesMenuOpen = false"
                  >
                    <q-item-section avatar>
                      <q-icon name="devices_other" />
                    </q-item-section>
                    <q-item-section>{{ device.deviceName }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    v-ripple
                    clickable
                    @click="$store.commit('devices/openNameDialog'); devicesMenuOpen = false"
                  >
                    <q-item-section avatar>
                      <q-icon name="add" />
                    </q-item-section>
                    <q-item-section>{{ $t('navDrawer.addDevice') }}</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
          </q-btn>

          <q-space />

          <q-btn flat icon="logout" @click="onLogout" />
        </q-toolbar>

        <TopTabBar />
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- Create tab: opened when tabs/openDialog sets tabs.dialogOpen = true; value bound to getter tabs/dialogOpened -->
      <dialog-tab-settings
        :value="$store.getters['tabs/dialogOpened']"
        mode="create"
        @input="v => !v && $store.commit('tabs/closeDialog')"
      />
      <dialog-tab-settings
        :value="$store.getters['tabs/editDialogOpened']"
        :tab="$store.getters['tabs/editTab']"
        mode="edit"
        @input="v => !v && $store.commit('tabs/closeEditDialog')"
      />
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
import DialogTabSettings from '~/components/dialogs/TabSettings'

import ListItemLoading from '~/components/ListItemLoading'

import TopTabBar from '~/components/navs/TopTabBar.vue'

import Parse from 'parse'

// import QrcodeVue from 'qrcode.vue'

export default {
  name: 'LayoutHome',
  components: {
    // QrcodeVue,
    ListItemLoading,
    // DialogAssetsManager,
    DialogTabSettings,
    DialogDeviceName,
    DialogDeviceInvitation,
    TopTabBar
  },
  data () {
    return {
      devicesMenuOpen: false
    }
  },
  computed: {
    /**
     * @returns {Object[]} all devices
     */
    devices () {
      return this.$store.getters['devices/devices']
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
      this.$store.dispatch('assetsManager/loadAssets')
      this.$store.dispatch('devices/loadDevices')
      this.$store.dispatch('global/initTTS')
      this.$store.dispatch('users/loadConnectUserId')
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
      // reset vuex store
      this.$store.commit('reset')
      Parse.User.logOut()
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.transparent {
  opacity: 0;
}

.drag-enter {
  background: red !important;
}

.dnd {
  position: fixed;
  opacity: 0.95;
}

.dotted {
  border: 2px dotted white;
  border-radius: 8px;
  padding: 24px 32px;
}
</style>
