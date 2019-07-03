<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Toolbar -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ $t('appTitle') }}
        </q-toolbar-title>

        <router-link to="/">{{ $t('logoutLabel') }}</router-link>
      </q-toolbar>
    </q-header>

    <!-- Navigation drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      :dark="true"
    >
      <q-list>
        <!-- Tabs -->
        <q-item-label header>Tabs</q-item-label>
        <q-item clickable :to="{ name: 'tabs-all' }">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Liste des tabs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'tabs-new' }">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ajouter un tab</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Devices -->
        <q-item-label header>Appareils</q-item-label>
        <q-item clickable :to="{ name: 'devices-all' }">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Liste des appareils</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'devices-new' }">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ajouter un appareil</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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
