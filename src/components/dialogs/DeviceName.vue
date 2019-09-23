<template>
  <q-dialog :value="opened" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">{{ $t('deviceDialogs.new.heading') }}</div>
      </q-card-section>

      <q-card-section>
        <q-input dense v-model="name" autofocus @keyup.enter="onSubmit" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="$t('generic.cancel')" color="negative" @click="onCancel" />
        <q-btn flat :label="$t('generic.save')" @click="onSubmit" :disable="name === ''" />
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
      return this.$store.getters['devices/nameDialog'].opened
    }
  },
  methods: {
    onSubmit () {
      if (this.name === '') {
        return
      }
      this.$store.dispatch('devices/create', this.name)
      this.name = ''
    },
    onCancel () {
      this.$store.commit('devices/closeNameDialog')
    }
  }
}
</script>
