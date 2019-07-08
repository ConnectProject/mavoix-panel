<template>
  <q-layout view="hHh Lpr lff">
    <!-- Toolbar -->
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>{{ $t('appTitle') }}</q-toolbar-title>

        <router-link to="/">{{ $t('logoutLabel') }}</router-link>
      </q-toolbar>
    </q-header>

    <!-- Navigation drawer -->
    <q-drawer v-model="leftDrawerOpen" :width="200" :breakpoint="500" show-if-abovebordered>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <!-- Tabs -->
          <q-item clickable v-ripple :to="{ name: 'tabs-all' }">
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tabs</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Devices -->
          <q-item clickable v-ripple :to="{ name: 'devices-all' }">
            <q-item-section avatar>
              <q-icon name="devices" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Devices</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}
</style>
