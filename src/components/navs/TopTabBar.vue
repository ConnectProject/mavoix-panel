<template>
  <div class="top-tab-bar row items-center">
    <!-- Tabs -->
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-item"
      :class="{ active: tab.get('slug') === currentSlug }"
      :style="tabStyle(tab)"
      @click="openTab(tab)"
    >
      <q-icon v-if="tab.get('icon')" :name="tab.get('icon')" class="q-mr-xs" size="18px" />
      <span>{{ tab.get('name') }}</span>
    </div>

    <!-- Add new tab -->
    <div
      class="tab-item add-tab"
      @click="openCreateDialog"
    >
      +
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopTabBar',

  computed: {
    tabs () {
      return this.$store.getters['tabs/tabs']
    },
    currentSlug () {
      return this.$route.params.slug
    }
  },

  methods: {
    openTab (tab) {
      this.$router.push({
        name: 'tab',
        params: { slug: tab.get('slug') }
      })
    },

    openCreateDialog () {
      this.$store.commit('tabs/openDialog')
    },

    tabStyle (tab) {
      const raw = tab.get('hexColor')
      const bg = this.normalizeHex(raw)
      return {
        backgroundColor: bg,
        color: this.getTextColor(bg)
      }
    },

    normalizeHex (hex) {
      if (!hex) return '#cccccc'
      const h = String(hex).trim()
      return h.startsWith('#') ? h : '#' + h
    },

    getTextColor (hex) {
      if (!hex) return '#000'

      const color = String(hex).replace('#', '')
      const r = parseInt(color.substring(0, 2), 16)
      const g = parseInt(color.substring(2, 4), 16)
      const b = parseInt(color.substring(4, 6), 16)

      // Perceived brightness formula
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness > 150 ? '#000' : '#fff'
    }
  }
}
</script>

<style scoped>
/* Container */
.top-tab-bar {
  display: flex;
  align-items: flex-end;
  padding: 0 8px;
  height: 46px;
  border-bottom: 1px solid #bbb;
  overflow-x: auto;
}

/* Base tab */
.tab-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  margin-right: 6px;
  cursor: pointer;
  user-select: none;
  font-weight: 500;

  border-top-left-radius: 14px;
  border-top-right-radius: 14px;

  opacity: 0.85;
  transform: translateY(6px);
  transition: all 0.2s ease;
}

/* Hover */
.tab-item:hover {
  opacity: 1;
}

/* Active tab */
.tab-item.active {
  transform: translateY(0);
  opacity: 1;
  z-index: 2;
}

/* Merge active tab with page */
.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: inherit;
}

/* Add tab (+) */
.tab-item.add-tab {
  background: #e2dfdf;
  color: #2171e1;
  font-size: 20px;
  font-weight: bold;
  padding: 6px 14px;
  transform: translateY(6px);
}

.tab-item.add-tab:hover {
  background: #e0e0e0;
}
</style>
