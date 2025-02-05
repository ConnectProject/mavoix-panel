<template>
  <section class="image-import">
    <div>
      <label
        id="import-dropzone"
        for="image-input"
        class="drop-zone"
      >
        <input
          id="image-input"
          type="file"
          name="image-input"
        >
      </label>
    </div>

    <div class="new-card">
      <h2>NOUVELLE CARTE</h2>
      <label for="card-name-input">
        Nom de la carte
      </label>
      <input
        id="card-name-input"
        type="text"
        name="card-name-input"
      >
      <label for="card-categories-input">
        Catégories
      </label>
      <input
        id="card-categories-input"
        type="text"
        name="card-categories-input"
      >
      <button type="button">
        AJOUTER
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddImageImport'
}
</script>

<style scoped>
.image-import {
  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing);
  justify-content: center;
}

.drop-zone {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  justify-items: center;
  border-radius: 20px;
  border: 2px dashed var(--grey);
  cursor: pointer;
  gap: var(--spacing);
  height: 100%;
  padding: var(--spacing);
}

.new-card {
  display: flex;
  flex-flow: column wrap;
  gap: var(--spacing);
  border: 2px solid var(--grey);
  border-radius: 20px;
  padding: var(--spacing);
}
</style>
