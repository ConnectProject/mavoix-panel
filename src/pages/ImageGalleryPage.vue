<template>
  <section>
    <h1 class="page-title">
      GALERIE D'IMAGES
    </h1>

    <hr>

    <!-- <section class="search-section">
      <label for="search-images">Search for images :</label>
      <input
        id="search-images"
        type="search"
      >
    </section> -->

    <section class="images-section">
      <h2>Explorez vos images : </h2>
      <div class="cards">
        <div class="image-card" v-for="image in assets">
          <img :src="image.url" alt="">
          <div>{{ image.name }}</div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Parse from 'parse'

export default {
  name: "ImageGalleryPage",
  mounted() {
    if (Parse.User.current()) {
      this.$store.dispatch('assetsManager/loadAssets')
    }
  },
  computed: {
    assets () {
      return this.$store.getters['assetsManager/all']
    }
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
}

.search-section {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  justify-content: center;
  padding: var(--spacing);
}

.search-section input {
  width: 400px;
}

.images-section h2 {
  font-size: 24px;
}

.cards {
  display: flex;
  flex-flow: row wrap;
  gap: var(--spacing);
}

.image-card {
  height: 200px;
  width: 150px;
  border: 1px solid var(--grey);
  border-radius: 8px;
}

.image-card img {
  width: 100%;
  aspect-ratio: 1;
}

.image-card div {
  text-align: center;
}
</style>
