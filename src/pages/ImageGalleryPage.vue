<template>
  <section>
    <h1 class="page-title">
      GALERIE D'IMAGES
    </h1>

    <hr>

    <section class="search-section">
      <label for="search-images">Cherchez dans vos images :</label>
      <input
        id="search-images"
        v-model="imageFilter"
        type="search"
      >
      <span>ou</span>
      <router-link
        :to="{ name: 'AddImagePage'}"
        class="button-link"
      >
        AJOUTER UNE NOUVELLE IMAGE
      </router-link>
    </section>

    <section class="images-section">
      <h2>Explorez vos images : </h2>
      <div class="cards">
        <div
          v-for="image in filteredImages"
          class="image-card"
        >
          <img
            :src="image.url"
            alt=""
          >
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
  data: function () {
    return {
      imageFilter: ''
    }
  },
  computed: {
    images() {
      return this.$store.getters['assetsManager/all']
    },
    filteredImages() {
      return this.images.filter(image => {
        const keyword = this.normalizeString(this.imageFilter)
        const imageName = this.normalizeString(image.name)

        return imageName.includes(keyword)
      })
    }
  },
  mounted() {
    if (Parse.User.current()) {
      this.$store.dispatch('assetsManager/loadAssets')
    }
  },
  methods: {

    /**
     * Make a string lowercase remove diacritics.
     * It is used to provide a case-insensitive and
     * diacritic-insensitive filtering for the user.
     * @param {string} str - The string to normalize
     * @return {string} The normalized string
     */
    normalizeString(str) {
      return str
        .normalize("NFD") // Normalize the unicode chain to extract diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritic characters
        .toLowerCase()
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
