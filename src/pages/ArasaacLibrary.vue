<!-- eslint-disable max-lines -->
<template>
  <div class="arasaac-page">
    <div class="arasaac-shell">
      <div class="row items-start justify-between q-mb-md library-top-bar">
        <div>
          <div class="text-h4 text-weight-bold text-grey-8">
            {{ $t('addImagesModal.title') }}
          </div>
          <div class="row items-center q-mt-sm">
            <q-icon
              :name="activeLibrary === 'arasaac' ? 'travel_explore' : 'photo_library'"
              color="grey-7"
              size="18px"
              class="q-mr-sm"
            />
            <div class="text-h6 text-weight-bold text-grey-9">
              {{ activeLibrary === 'arasaac' ? $t('addImagesModal.libraryArasaac') : $t('addImagesModal.libraryPersonal') }}
            </div>
          </div>
        </div>

        <div class="row items-center text-center library-top-actions">
          <div
            class="library-action library-action--clickable"
            @click="toggleLibrary"
          >
            <q-icon
              :name="activeLibrary === 'arasaac' ? 'account_box' : 'public'"
              color="primary"
              size="36px"
            />
            <div class="library-action__label">
              {{ activeLibrary === 'arasaac' ? $t('addImagesModal.switchToPersonal') : $t('addImagesModal.switchToArasaac') }}
            </div>
          </div>
          <div
            class="library-action library-action--clickable"
            @click="takePhotoDialogOpen = true"
          >
            <q-icon
              name="add_a_photo"
              color="primary"
              size="36px"
            />
            <div class="library-action__label">
              {{ $t('addImagesModal.takePhoto') }}
            </div>
          </div>
          <input
            ref="uploadPhotoInput"
            type="file"
            class="arasaac-hidden-file-input"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            @change="onUploadFileChosen"
          >
          <div
            class="library-action library-action--clickable"
            @click="onUploadPhotoClick"
          >
            <q-icon
              name="upload"
              color="primary"
              size="36px"
            />
            <div class="library-action__label">
              {{ $t('addImagesModal.uploadPhoto') }}
            </div>
          </div>
        </div>
      </div>

      <div class="row items-end q-col-gutter-sm q-mb-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="search"
            outlined
            dense
            :placeholder="activeLibrary === 'arasaac' ? $t('addImagesModal.searchArasaac') : $t('addImagesModal.searchPersonal')"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <div
        class="row items-center arasaac-theme-row q-mb-md"
      >
        <span class="text-grey-8 q-mr-xs">{{ $t('addImagesModal.themeLabel') }}</span>
        <q-chip
          v-for="theme in themes"
          :key="`theme-${theme.key}`"
          clickable
          dense
          :icon="theme.icon"
          :color="selectedTheme === theme.key ? 'primary' : 'grey-3'"
          :text-color="selectedTheme === theme.key ? 'white' : 'grey-9'"
          @click="selectedTheme = selectedTheme === theme.key ? null : theme.key"
        >
          {{ $t(`addImagesModal.themes.${theme.key}`) }}
        </q-chip>
      </div>

      <div class="row items-center justify-between q-mb-md">
        <div class="text-grey-8 text-weight-medium">
          {{ pictogramCountLabel }}
        </div>
        <div class="row q-gutter-sm">
          <q-btn
            class="library-footer-btn"
            outline
            unelevated
            dense
            no-caps
            color="dark"
            :label="$t('addImagesModal.cancel')"
            @click="goBack"
          />
          <q-btn
            class="library-footer-btn"
            unelevated
            dense
            no-caps
            color="dark"
            :label="$t('addImagesModal.addToTab')"
            @click="onAddSelected"
          />
        </div>
      </div>

      <q-infinite-scroll
        scroll-target=".arasaac-page"
        :disable="!hasMoreImages"
        :offset="140"
        @load="onInfiniteLoad"
      >
        <div class="row q-col-gutter-xs library-grid">
          <div
            v-for="(image, index) in visibleImages"
            :key="`img-${image.url}-${index}`"
            class="col-4 col-sm-3 col-md-2"
          >
            <q-card
              flat
              class="library-card"
            >
              <q-img
                :src="image.url"
                ratio="1"
                contain
                class="library-card__image"
              >
                <div class="absolute-top-right q-pa-xs library-card__actions">
                  <div class="library-card__checkbox-wrap">
                    <q-checkbox
                      v-model="selectedUrls"
                      :val="image.url"
                      dense
                      color="primary"
                      class="library-card__checkbox"
                    />
                    <q-tooltip>
                      {{ $t('addImagesModal.selectImage') }}
                    </q-tooltip>
                  </div>
                  <q-icon
                    name="play_arrow"
                    size="24px"
                    color="primary"
                    role="button"
                    tabindex="0"
                    class="library-card__action"
                    :class="{ 'library-card__action--disabled': $store.getters['global/ttsEnabled'] === false }"
                    @click.stop="speak(image)"
                    @keyup.enter.stop="speak(image)"
                  >
                    <q-tooltip>
                      {{ $t('addImagesModal.playImage') }}
                    </q-tooltip>
                  </q-icon>
                  <q-icon
                    v-if="activeLibrary === 'personal'"
                    name="delete"
                    size="24px"
                    color="negative"
                    role="button"
                    tabindex="0"
                    class="library-card__action"
                    @click.stop="deletePersonalImage(image)"
                    @keyup.enter.stop="deletePersonalImage(image)"
                  >
                    <q-tooltip>
                      {{ $t('assetEditor.delete') }}
                    </q-tooltip>
                  </q-icon>
                </div>

                <div
                  v-if="isHidden(image.url)"
                  class="absolute-full image-overlay image-overlay--hidden"
                >
                  <q-icon
                    name="visibility_off"
                    class="overlay-icon"
                  />
                </div>
                <div
                  v-else-if="isUnavailable(image.url)"
                  class="absolute-full image-overlay image-overlay--unavailable"
                >
                  <q-icon
                    name="close"
                    class="overlay-icon overlay-icon--cross"
                  />
                </div>
              </q-img>
              <div class="library-card__name">
                {{ image.name }}
              </div>
              <div
                v-if="activeLibrary === 'personal'"
                class="library-card__categories"
              >
                <q-chip
                  v-for="cat in image.categories || []"
                  :key="`${image.id}-${cat}`"
                  clickable
                  dense
                  square
                  :icon="themeIconsByLabel[cat]"
                  color="grey-3"
                  text-color="grey-9"
                  class="image-category-chip"
                  @click.stop="openImageCategoryDialog(image)"
                >
                  {{ cat }}
                </q-chip>
                <q-chip
                  v-if="!(image.categories || []).length"
                  clickable
                  dense
                  square
                  outline
                  icon="sell"
                  color="grey-7"
                  class="image-category-chip"
                  @click.stop="openImageCategoryDialog(image)"
                >
                  {{ $t('addImagesModal.addTheme') }}
                </q-chip>
              </div>
            </q-card>
          </div>
        </div>
        <template #loading>
          <div class="row justify-center q-mt-sm q-pb-md library-infinite-loading">
            <q-spinner-dots
              color="grey-7"
              size="24px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <q-dialog
      v-model="imageCategoryDialogOpen"
      @hide="onImageCategoryDialogHide"
    >
      <q-card class="image-category-dialog-card">
        <q-card-section class="row items-center q-pb-sm">
          <div class="text-subtitle1 text-weight-bold text-grey-9">
            {{ $t('addImagesModal.assignCategoryTitle') }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            color="grey-7"
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-md">
          <q-scroll-area
            class="image-category-dialog__scroll"
            :thumb-style="{ borderRadius: '4px', width: '6px' }"
            :bar-style="{ borderRadius: '4px', width: '6px' }"
          >
            <div
              class="column q-gutter-sm"
            >
              <q-chip
                v-for="cat in categoryOptions"
                :key="`pick-${cat}`"
                clickable
                dense
                square
                :icon="themeIconsByLabel[cat]"
                :color="targetCategories.includes(cat) ? 'primary' : 'grey-3'"
                :text-color="targetCategories.includes(cat) ? 'white' : 'grey-9'"
                class="image-category-dialog__chip"
                @click="toggleCategoryForImage(cat)"
              >
                {{ cat }}
              </q-chip>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-actions
          align="right"
          class="q-px-md q-pb-md"
        >
          <q-btn
            v-close-popup
            flat
            no-caps
            :label="$t('generic.close')"
            color="grey-8"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <take-photo-dialog
      v-model="takePhotoDialogOpen"
      :category-options="categoryOptions"
      :category-icons="themeIconsByLabel"
      :category-chip-key="categoryChipKey"
      @saved="onTakePhotoSaved"
    />

    <upload-photo-dialog
      :value="uploadPhotoDialogOpen"
      :file="pendingUploadFile"
      :category-options="categoryOptions"
      :category-icons="themeIconsByLabel"
      :category-chip-key="categoryChipKey"
      @input="onUploadPhotoDialogInput"
      @saved="onUploadPhotoSaved"
      @failed="onUploadPhotoFailed"
    />

    <q-dialog
      v-model="personalPhotoSuccessOpen"
    >
      <q-card class="take-photo-success-card">
        <q-card-section class="column items-center q-pt-xl q-px-lg q-pb-md">
          <q-avatar
            color="positive"
            text-color="white"
            size="56px"
            font-size="28px"
            icon="check"
          />
          <div class="text-h6 text-weight-bold text-grey-9 q-mt-md text-center">
            {{ personalPhotoSuccessTitle }}
          </div>
          <div class="text-body2 text-grey-7 text-center q-mt-sm">
            {{ personalPhotoSuccessMessage }}
          </div>
        </q-card-section>
        <q-card-actions
          align="center"
          class="q-pb-lg"
        >
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="personalPhotoSuccessOk"
            @click="personalPhotoSuccessOpen = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="uploadErrorDialogOpen"
    >
      <q-card class="take-photo-success-card">
        <q-card-section class="q-pt-lg q-px-lg q-pb-md">
          <div class="text-h6 text-weight-bold text-grey-9">
            {{ $t('uploadError.title') }}
          </div>
          <p class="text-body2 text-grey-8 q-mt-sm q-mb-none">
            {{ $t('uploadError.lead') }}
          </p>
          <ul class="text-body2 text-grey-8 q-mt-sm q-mb-none q-pl-md">
            <li>{{ $t('uploadError.bulletExtension') }}</li>
            <li>{{ $t('uploadError.bulletRetry') }}</li>
          </ul>
        </q-card-section>
        <q-card-actions
          align="center"
          class="q-pb-lg"
        >
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="$t('uploadError.ok')"
            @click="uploadErrorDialogOpen = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
/* eslint-disable max-lines */
import Parse from 'parse'

import TakePhotoDialog from '~/components/dialogs/TakePhotoDialog.vue'
import UploadPhotoDialog from '~/components/dialogs/UploadPhotoDialog.vue'
import AssetModel from '~/models/Asset'
import { assetFromModel } from '~/store/assets-manager/utils'
import arasaacIdFromUrl from '~/utils/arasaacId'
import arasaacThemes from '~/utils/arasaacThemes'
import getCurrentUserId from '~/utils/getCurrentUserId'
import { pictogramName } from '~/utils/pictogramLanguage'

const PAGE_SIZE = 12
const INITIAL_VISIBLE_COUNT = 48

export default {
  name: 'PageArasaacLibrary',
  components: {
    TakePhotoDialog,
    UploadPhotoDialog
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      takePhotoDialogOpen: false,
      uploadPhotoDialogOpen: false,
      pendingUploadFile: null,
      personalPhotoSuccessOpen: false,
      personalPhotoSuccessMode: 'take',
      uploadErrorDialogOpen: false,
      activeLibrary: 'arasaac',
      search: '',
      selectedTheme: null,
      themes: arasaacThemes,
      visibleCount: INITIAL_VISIBLE_COUNT,
      selectedUrls: [],
      imageCategoryDialogOpen: false,
      imageCategoryTarget: null
    }
  },
  computed: {
    personalAssets () {
      return this.$store.getters['assetsManager/all'] || []
    },

    // Bibliothèque personnelle: Parse.File uploads only (not ARASAAC/tab URL-only assets).
    personalUploadAssets () {
      return this.personalAssets.filter((a) => Boolean(a.file))
    },
    personalAssetsByUrl () {
      return this.personalAssets.reduce((acc, asset) => {
        if (asset.url) {
          if (!acc[asset.url]) acc[asset.url] = []
          acc[asset.url].push(asset)
        }

        return acc
      }, {})
    },
    personalCategoriesByUrl () {
      return Object.keys(this.personalAssetsByUrl).reduce((acc, url) => {
        const categories = this.personalAssetsByUrl[url]
          .flatMap((asset) => asset.categories || [])
          .filter(Boolean)
        acc[url] = Array.from(new Set(categories))

        return acc
      }, {})
    },
    allImages () {
      if (this.activeLibrary === 'personal') {
        return this.personalUploadAssets.map((img) => ({
          id: img.id,
          url: img.url,
          name: img.name || 'Picto Name',
          categories: this.personalCategoriesByUrl[img.url] || []
        }))
      }

      const source = this.$store.state.global.images || []

      return source.map((img) => ({
        id: img.url,
        url: img.url,
        name: pictogramName(img, this.$store.state.global.ttsLanguage) || 'Picto Name',
        themes: img.themes || [],
        categories: this.personalCategoriesByUrl[img.url] || []
      }))
    },
    // Categories are restricted to the ARASAAC themes (no free-form categories).
    targetCategories () {
      const target = this.imageCategoryTarget

      return (target && this.personalCategoriesByUrl[target.url]) || []
    },
    categoryOptions () {
      return this.themes.map((theme) => this.$t(`addImagesModal.themes.${theme.key}`))
    },
    themeIconsByLabel () {
      return this.themes.reduce((acc, theme) => {
        acc[this.$t(`addImagesModal.themes.${theme.key}`)] = theme.icon

        return acc
      }, {})
    },
    filteredImages () {
      const q = (this.search || '').trim().toLowerCase()
      const themeLabel = this.selectedTheme ? this.$t(`addImagesModal.themes.${this.selectedTheme}`) : null

      return this.allImages.filter((img) => {
        const matchesText = !q || (img.name || '').toLowerCase().includes(q)
        const matchesTheme = !this.selectedTheme ||
          (img.themes || []).includes(this.selectedTheme) ||
          (img.categories || []).includes(themeLabel)

        return matchesText && matchesTheme
      })
    },
    hasMoreImages () {
      return this.visibleCount < this.filteredImages.length
    },
    visibleImages () {
      return this.filteredImages.slice(0, this.visibleCount)
    },

    tabItems () {
      return this.$store.getters['tabEditor/items'] || []
    },

    personalPhotoSuccessTitle () {
      return this.personalPhotoSuccessMode === 'upload'
        ? this.$t('uploadPhoto.successTitle')
        : this.$t('takePhoto.successTitle')
    },

    personalPhotoSuccessMessage () {
      return this.personalPhotoSuccessMode === 'upload'
        ? this.$t('uploadPhoto.successMessage')
        : this.$t('takePhoto.successMessage')
    },

    personalPhotoSuccessOk () {
      return this.personalPhotoSuccessMode === 'upload'
        ? this.$t('uploadPhoto.successOk')
        : this.$t('takePhoto.successOk')
    },

    pictogramCountLabel () {
      const n = this.filteredImages.length

      return n === 1
        ? this.$t('addImagesModal.pictogramCountOne', { n })
        : this.$t('addImagesModal.pictogramCountOther', { n })
    }
  },
  watch: {
    activeLibrary () {
      this.visibleCount = INITIAL_VISIBLE_COUNT
      this.search = ''
      this.selectedUrls = []
      this.selectedTheme = null
    },
    selectedTheme () {
      this.visibleCount = INITIAL_VISIBLE_COUNT
    },
    search () {
      this.visibleCount = INITIAL_VISIBLE_COUNT
    }
  },
  methods: {
    onInfiniteLoad (_, done) {
      this.visibleCount += PAGE_SIZE
      done()
    },

    async deletePersonalImage (image) {
      try {
        const assets = this.personalAssetsByUrl[image.url] || []
        if (!assets.length) {
          return
        }

        await Promise.all(assets.map(async (asset) => {
          const model = await new Parse.Query(AssetModel).get(asset.id)

          return model.destroy()
        }))

        this.selectedUrls = this.selectedUrls.filter((url) => url !== image.url)
        await this.$store.dispatch('assetsManager/loadAssets')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        this.$q.notify({
          position: 'top-right',
          message: e.message || String(e),
          color: 'negative'
        })
      }
    },

    toggleLibrary () {
      this.activeLibrary = this.activeLibrary === 'arasaac' ? 'personal' : 'arasaac'
    },

    goBack () {
      // This component is used inside a modal overlay from TabEditor.
      this.$emit('close')
    },

    onTakePhotoSaved () {
      this.personalPhotoSuccessMode = 'take'
      this.$store.dispatch('assetsManager/loadAssets')
      this.personalPhotoSuccessOpen = true
    },

    onUploadPhotoClick () {
      this.$refs.uploadPhotoInput.click()
    },

    isValidUploadFile (file) {
      const okMime = ['image/jpeg', 'image/jpg', 'image/png', 'image/pjpeg', 'image/x-png']
      const okExt = /\.(jpe?g|png)$/i
      if (file.type && okMime.includes(file.type)) {
        return true
      }
      if (file.type && file.type.startsWith('image/') && okExt.test(file.name)) {
        return true
      }
      if (!file.type && okExt.test(file.name)) {
        return true
      }

      return okExt.test(file.name)
    },

    onUploadFileChosen (e) {
      const input = e.target
      const file = input.files && input.files[0]
      input.value = ''
      if (!file) {
        return
      }
      if (!this.isValidUploadFile(file)) {
        this.uploadErrorDialogOpen = true

        return
      }
      this.pendingUploadFile = file
      this.uploadPhotoDialogOpen = true
    },

    onUploadPhotoDialogInput (open) {
      this.uploadPhotoDialogOpen = open
      if (!open) {
        this.pendingUploadFile = null
      }
    },

    onUploadPhotoSaved () {
      this.personalPhotoSuccessMode = 'upload'
      this.$store.dispatch('assetsManager/loadAssets')
      this.personalPhotoSuccessOpen = true
    },

    onUploadPhotoFailed () {
      this.uploadErrorDialogOpen = true
    },

    openImageCategoryDialog (image) {
      this.imageCategoryTarget = image
      this.imageCategoryDialogOpen = true
    },

    onImageCategoryDialogHide () {
      this.imageCategoryTarget = null
    },

    speak (image) {
      const tts = this.$store.getters['global/tts']
      if (this.$store.getters['global/ttsEnabled'] !== false && tts) {
        tts.speak({ text: image.name })
      }
    },

    async toggleCategoryForImage (category) {
      const target = this.imageCategoryTarget
      if (!category || !target) {
        return
      }
      try {
        await Promise.all((this.personalAssetsByUrl[target.url] || []).map(async (asset) => {
          const model = await new Parse.Query(AssetModel).get(asset.id)
          const current = model.get('categories') || []
          model.set('categories', current.includes(category)
            ? current.filter((c) => c !== category)
            : [...current, category])

          return model.save()
        }))
        await this.$store.dispatch('assetsManager/loadAssets')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        this.$q.notify({
          position: 'top-right',
          message: e.message || String(e),
          color: 'negative'
        })
      }
    },

    // Stable string for color hash and Vue :key (q-select may pass non-string options).
    categoryChipKey (category) {
      if (category === null || typeof category === 'undefined' || category === '') {
        return ''
      }
      if (typeof category === 'object') {
        const hasOwn = Object.prototype.hasOwnProperty
        const v = hasOwn.call(category, 'value')
          ? category.value
          : category.label
        if (v === null || typeof v === 'undefined' || v === '') {
          return ''
        }

        return String(v)
      }

      return String(category)
    },

    // a picture is the same when it has the same url, or the same ARASAAC id (the url format may differ)
    isSameImage (asset, url) {
      const id = arasaacIdFromUrl(url)

      return Boolean(asset && (asset.url === url || (id && asset.arasaacId === id)))
    },

    isHidden (url) {
      const item = this.tabItems.find((it) => this.isSameImage(it.asset, url))

      return Boolean(item && item.hidden)
    },

    isUnavailable (url) {
      const item = this.tabItems.find((it) => this.isSameImage(it.asset, url))

      return Boolean(item && !item.available)
    },

    async onAddSelected () {
      try {
        const uid = getCurrentUserId()

        const uniqueUrls = Array.from(new Set(this.selectedUrls))
        if (!uniqueUrls.length) {
          this.$emit('close')

          return
        }

        const assetsToAdd = await Promise.all(uniqueUrls.map(async (url) => {
          const existing = this.tabItems.find((it) => this.isSameImage(it.asset, url))
          if (existing) {
            return null
          }

          const entry = this.allImages.find((img) => img.url === url)
          if (!entry || !entry.url) {
            return null
          }

          const assetModel = await AssetModel.New(entry.name, false, entry.url, uid, { arasaacId: arasaacIdFromUrl(entry.url) }).save()
          const assetObj = assetFromModel(assetModel)

          return { assetObj, name: entry.name }
        }))

        assetsToAdd
          .filter(Boolean)
          .forEach(({ assetObj, name }) => {
            this.$store.commit('tabEditor/setItemDialogName', name)
            this.$store.commit('tabEditor/setItemDialogAsset', assetObj)
            this.$store.commit('tabEditor/addItem')
          })

        await this.$store.dispatch('tabEditor/saveCb', () => { /* auto-save on add */ })

        this.selectedUrls = []
        this.$emit('close')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        this.$q.notify({
          position: 'top-right',
          message: e.message || String(e),
          color: 'red'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.arasaac-hidden-file-input
  position absolute
  width 0
  height 0
  opacity 0
  pointer-events none

.arasaac-theme-row
  gap 4px

.arasaac-theme-row .q-chip
  margin 0

.arasaac-page
  background #f5f5f8
  min-height 100%

.arasaac-shell
  margin 8px 10px 0
  padding 12px 10px 8px
  border-radius 6px

.library-top-bar
  flex-wrap wrap
  row-gap 12px
  column-gap 16px

.library-top-actions
  flex-wrap wrap
  gap 8px 12px
  margin-left auto
  justify-content flex-end

.arasaac-shell :deep(.q-field__native)
  font-size 14px

.arasaac-shell :deep(.q-btn)
  font-size 13px
  padding 4px 10px

.arasaac-shell :deep(.library-footer-btn.q-btn)
  padding 2px 12px
  min-height 30px
  border-radius 10px
  box-shadow none !important

.library-action
  display flex
  flex-direction column
  align-items center
  min-width 96px

.library-action--clickable
  cursor pointer
  padding 8px 12px
  border-radius 8px
  transition background-color 0.15s ease
  background-color transparent

  &:hover
    background-color rgba(0, 0, 0, 0.07)

.library-action__label
  font-size 11px
  margin-top 4px
  color #111827
  text-align center

.library-grid
  /* 6 cols on md+, 4 on sm, 3 on xs — 12 images = even rows */
  align-items stretch

.library-pagination
  flex-shrink 0

.library-card
  background transparent
  border-radius 8px

.library-card__image
  background #ffffff
  border-radius 6px 6px 0 0
  max-height 108px

.library-card__actions
  /* q-img wraps slot content in an absolutely positioned, full-size, padded box: shrink it to the button column */
  display flex
  flex-direction column
  align-items center
  gap 4px
  width auto !important
  height auto !important
  left auto !important
  bottom auto !important
  padding 4px !important
  background transparent !important

  pointer-events none
  z-index 3

.library-card__action,
.library-card__checkbox-wrap
  pointer-events auto

.library-card__checkbox-wrap
  display flex

.image-overlay
  display flex
  align-items center
  justify-content center
  pointer-events none
  z-index 2

.image-overlay--hidden
  background rgba(55, 68, 92, 0.78)

.image-overlay--unavailable
  background rgba(255, 255, 255, 0.55)

.overlay-icon
  font-size 96px
  color #dfe5ee

.overlay-icon--cross
  color #e53935
  font-weight 700

.library-card__action,
.library-card__checkbox
  /* same 20px translucent circle for checkbox, play and delete */
  background rgba(255, 255, 255, 0.75)
  border-radius 50%
  padding 0

.library-card__action
  /* Same geometry as the tab editor buttons: 24px glyph, 2px of space, thin dim outline (30px in total). */
  box-sizing content-box
  display flex
  align-items center
  justify-content center
  width 28px
  height 28px
  padding 0
  border 1px solid rgba(0, 0, 0, 0.25)
  border-radius 50%
  cursor pointer
  transition box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)

/* Hover darkens the circle (~6.5% black, as q-checkbox does); nothing spills over the neighbours. */
.library-card__action:hover,
.library-card__action:focus-visible
  box-shadow inset 0 0 0 14px rgba(0, 0, 0, 0.065)
  outline none

.library-card__action--disabled
  opacity 0.4
  pointer-events none !important

.library-card__name
  text-align center
  padding 6px 6px
  background #dfe5ef
  color #374151
  font-size 13px
  line-height 1.3
  border-radius 0 0 6px 6px

.library-card__categories
  display flex
  align-items center
  gap 4px
  flex-wrap wrap
  margin-top 6px
  min-height 24px

.category-chip
  margin 0
  font-size 12px
  min-height 28px

.image-category-chip
  margin 0
  font-size 11px
  min-height 24px

</style>

<style lang="stylus">
/* Teleported popups/dialogs: classes must be unscoped */
.image-category-dialog-card
  width 100%
  max-width 360px
  border-radius 10px

.image-category-dialog__scroll
  height 240px

.image-category-dialog__chip
  width 100%
  justify-content flex-start
  max-width 100%

.take-photo-success-card
  width 100%
  max-width 400px
  border-radius 12px
  box-shadow 0 8px 32px rgba(0, 0, 0, 0.2)
</style>
