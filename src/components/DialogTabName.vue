<template>
  <q-dialog :value="opened" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">{{ $t('newTabDialog.heading') }}</div>
      </q-card-section>

      <q-card-section>
        <q-input dense v-model="name" autofocus @keyup.enter="onSubmit" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="$t('generic.cancel')" color="negative" @click="onCancel" />
        <q-btn flat :label="$t('generic.save')" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabName',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    opened () {
      return this.$store.getters['tabs/dialogOpened']
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('tabs/createTabCb', {
        name: this.name,
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
      this.name = ''
    },
    onCancel () {
      this.$store.commit('tabs/closeDialog')
    }
  }
}
</script>
