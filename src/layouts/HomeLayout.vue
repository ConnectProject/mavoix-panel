<template>
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
    </q-page-container>

    <dialog-assets-manager />
    <dialog-tab-name />
    <dialog-device-name />
    <dialog-device-invitation />
  </q-layout>
</template>

<script>
import ListItemLoading from '~/components/ListItemLoading'

/* Dialogs */
import DialogAssetsManager from '~/components/dialogs/AssetsManager'
import DialogTabName from '~/components/dialogs/TabName'
import DialogDeviceName from '~/components/dialogs/DeviceName'
import DialogDeviceInvitation from '~/components/dialogs/DeviceInvitation'

export default {
  name: 'HomeLayout',
  components: {
    ListItemLoading,
    DialogAssetsManager,
    DialogTabName,
    DialogDeviceName,
    DialogDeviceInvitation
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
      }
    }
  },
  methods: {
    /**
     * Go to auth page
     */
    onLogout () {
      this.$router.push({
        name: 'auth'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0
}
</style>
