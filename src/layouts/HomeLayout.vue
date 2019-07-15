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
              <q-item-label>Accueil</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="() => $store.commit('assets/openDialog')"
          >
            <q-item-section avatar>
               <q-icon name="photo_library" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Assets</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Tabs -->
          <q-item-label header>Tabs</q-item-label>
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
                <q-item-label>Ajouter un tab</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <!-- Devices -->
          <q-item-label header>Devices</q-item-label>
          <!-- If the query is loading -->
          <list-item-loading v-if="$store.state.devices.loading" />
          <!-- If the query has returned its result -->
          <div v-else>
            <!-- Click to add a device -->
            <q-item clickable v-ripple @click="$store.commit('devices/openDialog')">
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Add un device</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <dialog-tab-name
      :opened="$store.state.tabs.dialogOpen"
      :onCancel="() => $store.commit('tabs/closeDialog')"
      :onValidate="createAndGoToTab"
    />
    <dialog-device-invitation
      :opened="$store.state.devices.dialogOpen"
      :onCancel="() => $store.commit('devices/closeDialog')"
    />
    <dialog-assets-manager />
  </q-layout>
</template>

<script>
import ListItemLoading from '~/components/ListItemLoading'
import DialogDeviceInvitation from '~/components/DialogDeviceInvitation'
import DialogTabName from '~/components/DialogTabName'
import DialogAssetsManager from '~/components/DialogAssetsManager'

export default {
  name: 'HomeLayout',
  data () {
    return {
      drawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    devices () {
      return this.$store.getters['devices/devices']
    },
    tabs () {
      return this.$store.getters['tabs/tabs']
    }
  },
  methods: {
    createAndGoToTab (name) {
      this.$store.dispatch('tabs/createTabCb', {
        name,
        callback: (tab) => {
          this.$router.push({
            name: 'tab',
            params: {
              slug: tab.get('slug')
            }
          })
          this.$store.commit('tabs/closeDialog')
        }
      })
    },
    onLogout () {
      this.$router.push({
        name: 'auth'
      })
    }
  },
  mounted () {
    this.$store.dispatch('tabs/loadTabs')
    this.$store.dispatch('devices/loadDevices')
  },
  components: {
    ListItemLoading,
    DialogDeviceInvitation,
    DialogTabName,
    DialogAssetsManager
  }
}
</script>

<style lang="stylus" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0
}
</style>
