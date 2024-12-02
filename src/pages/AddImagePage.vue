<template>
  <section>
    <h1 class="page-title">
      GALERIE D'IMAGES
    </h1>

    <hr>

    <section>
      <h2>Créer une nouvelle image :</h2>

      <div class="actions">
        <button class="picture-action" type="button">Prendre une photo</button>
        <button class="import-action" type="button">Importer une image</button>
        <button class="search-action" type="button">Chercher dans les images d'Arasaac</button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'AddImagePage'
}
</script>

<style>
.page-title {
  text-align: center;
}

section h2 {
  font-size: 24px;
  text-align: center;
}

.actions {
  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing);
  justify-content: center;
}

.picture-action {
  background-color: var(--red);
  border-color: var(--red);
}
.import-action {
  background-color: var(--yellow);
  border-color: var(--yellow);
}
.search-action {}
</style>
