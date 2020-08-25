
<template>
  <div  @dragenter="onDragEnter">
    <!-- Camera zone -->
    <div v-if="isCamera"
      class="camera z-max text-center row items-center justify-center full-height full-width text-white"
    >
      <q-icon
        name="close"
        class="q-pa-xl cursor-pointer absolute-top-right"
        style="font-size: 3em"
        @click="isCamera = false"
      />
      <camera/>
    </div>
    <!-- Dropzone -->
    <div
      class="dnd z-max hidden text-center row items-center justify-center full-height full-width bg-black text-white"
      ref="dnd"
    >
      <div class="text-center">
        <div class="dotted">
          <q-icon name="cloud_upload" style="font-size: 5em;" />
          <br/>
          {{ $t('dnd.dropFiles') }}
        </div>
      </div>
      <div class="fixed full-height full-width transparent" @dragleave="onDragLeave">
        <!-- full size multiple-files input -->
        <input type="file" class="full-height full-width transparent" multiple @input="uploadFile" />
      </div>
    </div>
  <q-layout view="hHh Lpr lff">
    <!-- Toolbar -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="drawerOpen = !drawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>{{ $t('appTitle') }}</q-toolbar-title>

        <q-btn @click="onLogout" flat>{{ $t('logoutLabel') }}</q-btn>
      </q-toolbar>
    </q-header>

    <!-- Navigation drawer -->
    <q-drawer v-model="drawerOpen" :width="200" :breakpoint="500" show-if-abovebordered>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <!-- Home -->
          <q-item
            clickable
            v-ripple
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
            clickable
            v-ripple
            @click="$router.push({
              name: 'base',
              params: {
                assets: 'assets'
              }
            })"
          >
            <q-item-section avatar>
               <q-icon name="photo_library" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('navDrawer.assetsManager')}}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Tabs -->
          <q-item-label header>{{ $t('navDrawer.tabs') }}</q-item-label>
          <!-- If the query is loading -->
          <list-item-loading v-if="$store.state.tabs.loading" />
          <div v-else>
            <!-- Render fetched tab buttons -->
            <q-item
              v-for="(tab, index) in tabs"
              :key="index"
              clickable
              v-ripple
              :to="{ name: 'tab', params: { slug: tab.get('slug') }}"
            >
              <q-item-section avatar>
                <q-icon name="category" :style="{ color: tab.get('hexColor') }"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ tab.get('name') }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Click to add a tab -->
            <q-item clickable v-ripple @click="$store.commit('tabs/openDialog')">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('navDrawer.addTab') }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <!-- Devices -->
          <q-item-label header>{{ $t('navDrawer.devices') }}</q-item-label>
          <!-- If the query is loading -->
          <list-item-loading v-if="$store.state.devices.loading" />
          <!-- If the query has returned its result -->
          <div v-else>
            <!-- Render fetched devices buttons -->
            <q-item
              v-for="(device, index) in devices"
              :key="index"
              clickable
              v-ripple
              @click="$store.commit('devices/openDialog', index)"
            >
              <q-item-section avatar>
                <q-icon name="devices_other"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ device.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Click to add a device -->
            <q-item clickable v-ripple @click="$store.commit('devices/openNameDialog')">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('navDrawer.addDevice') }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
      <dialog-assets-manager @showCam="isCamera = true" />
    </q-page-container>

    <dialog-tab-name />
    <dialog-device-name />
    <dialog-device-invitation />
  </q-layout>
  </div>
</template>

<script>
import ListItemLoading from '~/components/ListItemLoading'

/* Dialogs */
import DialogAssetsManager from '~/components/dialogs/AssetsManager'
import DialogTabName from '~/components/dialogs/TabName'
import DialogDeviceName from '~/components/dialogs/DeviceName'
import DialogDeviceInvitation from '~/components/dialogs/DeviceInvitation'

import Camera from '~/components/Camera'

export default {
  name: 'LayoutHome',
  components: {
    ListItemLoading,
    DialogAssetsManager,
    DialogTabName,
    DialogDeviceName,
    DialogDeviceInvitation,
    Camera
  },
  /**
   * Load tabs
   * Load devices
   * If route is host/assets open assets manager
   */
  mounted () {
    this.$store.dispatch('tabs/loadTabs')
    this.$store.dispatch('devices/loadDevices')
    if (this.$route.params.assets && this.$route.params.assets === 'assets') {
      this.$store.dispatch('assetsManager/openAndLoad', {
        selectMode: false
      })
    }
    this.$store.dispatch('global/initTTS')
  },
  data () {
    return {
      dnd: false,
      isCamera: false,
      drawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    /**
     * Return all devices
     */
    devices () {
      return this.$store.getters['devices/devices']
    },
    /**
     * Return all tabs
     */
    tabs () {
      return this.$store.getters['tabs/tabs']
    }
  },
  watch: {
    /**
     * When route change, if its host/assets open assets manager
     */
    '$route' (to, from) {
      if (to.params.assets && to.params.assets === 'assets') {
        this.$store.dispatch('assetsManager/openAndLoad', {
          selectMode: false
        })
        console.log('ok')
        this.$store.dispatch('tabs/loadTabs')
      }
    }
  },
  methods: {
    /**
     * show dropzone when entering window
     **/
    onDragEnter (e) {
      let dt = e.dataTransfer
      if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('Files'))) {
        this.$refs['dnd'].classList.remove('hidden')
      }
    },
    /**
     * hide dropzone when leaving window
     **/
    onDragLeave (e) {
      this.$refs['dnd'].classList.add('hidden')
    },
    /**
     * Upload file on drop
     **/
    uploadFile ({ target: { files } }) {
      if (files.length > 0) {
        let file = ''
        let length = files.length
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
      this.$refs['dnd'].classList.add('hidden')
    },
    /**
     * Go to auth page
     **/
    onLogout () {
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
