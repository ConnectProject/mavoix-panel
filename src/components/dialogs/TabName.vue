<template>
  <q-dialog
    :value="opened"
    persistent
  >
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">
          {{ $t('newTabDialog.heading') }}
        </div>
      </q-card-section>

      <!-- Tab's name -->
      <q-card-section>
        <q-input
          dense
          v-model="name"
          autofocus
          @keyup.enter="onSubmit"
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <!-- Cancel -->
        <q-btn
          flat
          :label="$t('generic.cancel')"
          color="negative"
          @click="onCancel"
        />

        <!-- Submit -->
        <q-btn
          flat
          :label="$t('generic.save')"
          @click="onSubmit"
          :disable="name === ''"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ComponentDialogTabName',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    /**
     * Return true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['tabs/dialogOpened']
    }
  },
  methods: {
    /**
     * Call on submit to create the tab and redirect to it
     * then close the dialog
     */
    onSubmit () {
      if (this.name === '') {
        return
      }
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
    /**
     * Call to cancel
     */
    onCancel () {
      this.$store.commit('tabs/closeDialog')
    }
  }
}
</script>
