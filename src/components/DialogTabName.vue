<template>
  <q-dialog v-model="opened" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Rentrez le nom souhaité pour le tab</div>
      </q-card-section>

      <q-card-section>
        <q-input dense v-model="name" autofocus @keyup.enter="onValidateInternal" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="onCancel" />
        <q-btn flat label="Ajouter le tab" @click="onValidateInternal" />
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
  methods: {
    onValidateInternal () {
      this.$props.onValidate(this.name)
      this.name = ''
    }
  },
  props: {
    opened: Boolean,
    onCancel: Function,
    onValidate: Function
  }
}
</script>
