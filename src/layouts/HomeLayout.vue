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
          <!-- Tabs -->
          <q-item-label header>Tabs</q-item-label>
          <!-- If the query is loading -->
          <list-item-loading v-if="tabsLoading" />
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
                <q-icon name="category" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ tab.get('name') }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Click to add a tab -->
            <q-item clickable v-ripple @click="tabNameDialogOpen = true">
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
          <list-item-loading v-if="devicesLoading" />
          <!-- If the query has returned its result -->
          <div v-else>
            <!-- Click to add a device -->
            <q-item clickable v-ripple @click="deviceInviteDialogOpen = true">
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
      :opened="tabNameDialogOpen"
      :onCancel="() => tabNameDialogOpen = false"
      :onValidate="createAndGoToTab"
    />
    <dialog-device-invitation
      :opened="deviceInviteDialogOpen"
      :onCancel="() => deviceInviteDialogOpen = false"
    />
  </q-layout>
</template>

<script>
import Parse from 'parse'

import ListItemLoading from '~/components/ListItemLoading'
import DialogDeviceInvitation from '~/components/DialogDeviceInvitation'
import DialogTabName from '~/components/DialogTabName'

import TabModel from '~/models/Tab'
import DeviceModel from '~/models/Device'

export default {
  name: 'HomeLayout',
  data () {
    return {
      tabsLoading: true,
      tabs: [],
      tabNameDialogOpen: false,

      devicesLoading: true,
      devices: [],
      deviceInviteDialogOpen: false,

      drawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    fetchTabs () {
      return new Parse.Query(TabModel)
        .find()
        .then(tabs => {
          console.log(`Successfully fetched ${tabs.length} tabs.`)
          this.tabs = tabs
          this.tabsLoading = false
        })
        .catch(err => {
          throw err
        })
    },
    fetchDevices () {
      return new Parse.Query(DeviceModel)
        .find()
        .then(devices => {
          console.log(`Successfully fetched ${devices.length} devices.`)
          this.devices = devices
          this.devicesLoading = false
        })
        .catch(err => {
          throw err
        })
    },
    createAndGoToTab (name) {
      TabModel.Create(name)
        .save()
        .then((res) => {
          this.tabs.push(res)
          this.$router.push({
            name: 'tab',
            params: {
              slug: res.get('slug')
            }
          })
        })
        .catch((err) => {
          throw err
        })
      this.tabNameDialogOpen = false
    },
    onLogout () {
      this.$router.push({
        name: 'auth'
      })
    }
  },
  mounted () {
    this.fetchTabs()
      .then(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 2000)
        })
      })
      .then(this.fetchDevices)
      .catch((err) => {
        throw err
      })
  },
  components: {
    ListItemLoading,
    DialogDeviceInvitation,
    DialogTabName
  }
}
</script>

<style lang="stylus" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0
}
</style>
