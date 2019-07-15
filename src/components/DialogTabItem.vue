<template>
  <q-dialog :value="opened" persistent>
    <q-card>
      <q-card-section class="row items-center justify-center">
        <h6>Please enter the name of the new item:</h6>
        <q-input filled/>
      </q-card-section>
      <q-card-section class="row items-center justify-center">
        <h6>Please select an image for the new item:</h6>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="onCloseDialog"/>
        <q-btn flat label="Save" color="primary" @click="saveItem"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabName',
  computed: {
    opened () {
      return this.$store.getters['tabEditor/isDialogOpened']
    }
  },
  methods: {
    onCloseDialog () {
      return this.$store.commit('tabEditor/closeNewItemDialog')
    },
    saveItem () {

    }
  }
}
</script>
