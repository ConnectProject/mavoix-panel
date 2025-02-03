<template>
  <section class="home-page">
    <header class="page-header">
      <h1 class="page-title">
        <span>Bienvenue sur MaVoix</span>
        <small>{{ username }}</small>
      </h1>
    </header>

    <section>
      <h2 class="section-title">
        Vos onglets ({{ tabs.length }}) :
      </h2>
      <div class="cards-list">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="card"
          :style="{ 'background-color': tab.attributes.hexColor }"
        >
          <h3>{{ tab.attributes.name }}</h3>
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">
        Vos appareils ({{ devices.length }}) :
      </h2>
      <div class="cards-list">
        <div
          v-for="device in devices"
          :key="device.deviceName"
          class="device-card"
        >
          {{ device.deviceName }}
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Parse from 'parse'

export default {
  name: 'HomePage',
  computed: {
    username() {
      return Parse.User.current()?.getUsername()
    },
    tabs() {
      return this.$store.getters['tabs/tabs']
    },
    devices() {
      return this.$store.getters['devices/devices']
    }
  },
  mounted() {
    if (Parse.User.current()) {
      this.$store.dispatch('tabs/loadTabs')
      this.$store.dispatch('devices/loadDevices')
      this.$store.dispatch('global/initTTS')
      this.$store.dispatch('users/loadConnectUserId')
    }
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.page-header {
  display: flex;
  justify-content: space-between;

  &::before {
    content: url("/home-image-left.png");
  }

  &::after {
    content: url("/home-image-right.png");
  }
}

.page-title {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin: var(--spacing);
  gap: var(--spacing);
}

.page-title small {
  font-size: 24px;
}

.section-title {
  font-size: 24px;
}

.cards-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: var(--spacing);
}

.card {
  height: 250px;
  width: 250px;
  border: 1px solid var(--grey);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: var(--spacing);
}

.device-card {
  height: 200px;
  width: 250px;
  border: 5px solid var(--black);
  border-radius: 10px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: var(--spacing);
}

.card h3 {
  font-size: 24px;
  margin: 0;
  text-transform: uppercase;
}
</style>
