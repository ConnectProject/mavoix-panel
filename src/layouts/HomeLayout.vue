<!-- eslint-disable max-lines -->

<template>
  <div @dragenter="onDragEnter">
    <!-- Camera zone -->
    <div
      v-if="isCamera"
      class="camera z-max text-center row items-center justify-center full-height full-width text-white"
    >
      <q-icon
        name="close"
        class="q-pa-xl cursor-pointer absolute-top-right"
        style="font-size: 3em"
        @click="isCamera = false"
      />
      <camera />
    </div>

    <!-- Dropzone -->
    <!-- This Dropzone seems to be never visible
    We should remove this part if we don't use it anymore (or is it a hidden feature?) -->
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
          @input="uploadFile"
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
                  color: 'white',
                  'border-radius':' 32px 0 0 32px',
                  background: tab.get('hexColor'),
                  marginRight:(tab.get('name')===selectedTab.name)?0:'1px',
                  marginLeft:(tab.get('name')===selectedTab.name)?'5px':'20px'
                }"
                clickable
                :to="{ name: 'tab', params: { slug: tab.get('slug') }}"
              >
                <q-item-section>
                  <q-item-label
                    style="color:black;text-align:center"
                  >
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
            <!--
            <q-item clickable v-ripple @click="$store.commit('tabs/openDialog')">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('navDrawer.addTab') }}</q-item-label>
              </q-item-section>
            </q-item>
            -->
            </div>

            <!-- Devices -->
            <q-item-label
              header
              class="text-white"
            >
              {{ $t('navDrawer.devices') }}
            </q-item-label>
            <center>
              <qrcode-vue :value="code" />
            </center>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      <!-- <dialog-assets-manager @showCam="isCamera = true" /> -->
      </q-page-container>

      <dialog-tab-name />
      <dialog-device-name />
      <dialog-device-invitation />
    </q-layout>
  </div>
</template>

<script>
import Camera from '~/components/Camera'

/* Dialogs */
// import DialogAssetsManager from '~/components/dialogs/AssetsManager'

import DialogDeviceInvitation from '~/components/dialogs/DeviceInvitation'
import DialogDeviceName from '~/components/dialogs/DeviceName'
import DialogTabName from '~/components/dialogs/TabName'

import ListItemLoading from '~/components/ListItemLoading'

import QrcodeVue from 'qrcode.vue'

console.log('id:')
console.log(localStorage.id)
export default {
  name: 'LayoutHome',
  components: {
    QrcodeVue,
    ListItemLoading,
    // DialogAssetsManager,
    DialogTabName,
    DialogDeviceName,
    DialogDeviceInvitation,
    Camera
  },
  data () {
    return {
      dnd: false,
      isCamera: false,
      drawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    code () {
      return localStorage.getItem('username') + ':' +
        localStorage.getItem('password')
    },
    users () {
      return this.$store.getters['users/users']
    },

    /**
     * @returns {Object} all devices
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
      return this.$store.getters['tabEditor/tab']
    }
  },

  /**
   * Load tabs
   * Load devices
   * If route is host/assets open assets manager
   * @returns {void}
   */
  mounted () {
    if (!localStorage.getItem('id')) {
      this.$router.push({
        name: 'auth'
      })
    } else {
      this.$store.dispatch('tabs/loadTabs')
      this.$store.dispatch('devices/loadDevices')
      this.$store.dispatch('global/initTTS')
    }
    this.$root.$on('showCam', () => { this.isCamera = true })
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
    uploadFile ({ target: { files } }) {
      if (files.length > 0) {
        let file = ''
        const {length} = files
        for (let i = 0; i < files.length; i++) {
          file = files[i]
          this.$store.dispatch('assetsManager/uploadFile', file)
        }
        if (length > 1) {
          this.$q.notify({ position: 'top-right', message: length + this.$t('dnd.filesSaved'), color: 'blue' })
        } else {
          this.$q.notify({ position: 'top-right', message: this.$t('dnd.fileSaved'), color: 'blue' })
        }
      }
      this.$refs.dnd.classList.add('hidden')
    },

    /**
     * Go to auth page
     * @returns {void}
     **/
    onLogout () {
      localStorage.clear()
      this.$router.push({
        name: 'auth'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.transparent{
  opacity: 0
}
.menu-list .q-item {
  border-radius: 0 32px 32px 0
  margin 1px 1px 0 10px
  color black
}
.drag-enter{
  background red !important
}
.dnd{
  position fixed
  opacity .95
}
.camera{
  position fixed
  background-color rgba(0,0,0,0.8)
}
.dotted{
  border 2px dotted white
  border-radius 8px
  padding 24px 32px;
}
</style>
