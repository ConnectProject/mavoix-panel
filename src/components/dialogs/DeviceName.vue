<template>
  <q-dialog
    :value="opened"
    persistent
  >
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">
          {{ $t('deviceDialogs.new.heading') }}
        </div>
      </q-card-section>

      <!-- Device name -->
      <q-card-section>
        <q-input
          v-model="name"
          dense
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

        <!-- Save -->
        <q-btn
          flat
          :label="$t('generic.save')"
          :disable="name === ''"
          @click="onSubmit"
        />
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

    /**
     * @returns {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['devices/nameDialog'].opened
    }
  },
  methods: {

    /**
     * Call when submit to create the device and open the dialog
     * @returns {void}
     */
    onSubmit () {
      if (this.name === '') {
        return
      }
      this.$store.dispatch('devices/create', this.name)
      this.name = ''
    },

    /**
     * Call to call the dialog
     * @returns {void}
     */
    onCancel () {
      this.$store.commit('devices/closeNameDialog')
    }
  }
}
</script>
