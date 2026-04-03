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
        <div class="col-12 col-md-4">
          <div class="row items-center q-gutter-sm">
            <q-icon
              name="filter_alt"
              color="grey-7"
            />
            <span class="text-grey-8">{{ $t('addImagesModal.filter') }}</span>
            <q-select
              v-model="selectedCategoryFilters"
              outlined
              dense
              behavior="menu"
              options-dense
              class="category-select"
              :options="categoryOptions"
              multiple
              use-chips
              use-input
              new-value-mode="add-unique"
              input-debounce="0"
              popup-content-class="category-filter-popup"
            >
              <template #selected-item="scope">
                <q-chip
                  dense
                  square
                  :color="chipColor(scope.opt)"
                  text-color="white"
                  removable
                  class="q-ma-xs"
                  @remove="scope.removeAtIndex(scope.index)"
                >
                  {{ scope.opt }}
                </q-chip>
              </template>
              <template #option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-chip
                      dense
                      square
                      :color="chipColor(scope.opt)"
                      text-color="white"
                    >
                      {{ scope.opt }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </div>

      <div class="q-mb-md">
        <div class="row items-center q-col-gutter-xs">
          <div
            v-for="cat in categoryOptions"
            :key="`cat-${cat}`"
            class="col-auto"
          >
            <q-chip
              dense
              square
              :color="chipColor(cat)"
              text-color="white"
              class="category-chip"
            >
              <span>{{ cat }}</span>
              <q-btn
                flat
                dense
                round
                size="9px"
                icon="edit"
                class="q-ml-xs text-white"
                @click.stop="openCategoryMenu(cat, $event)"
              />
            </q-chip>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              dense
              icon="add_circle"
              color="primary"
              no-caps
              :label="$t('addImagesModal.addNewCategory')"
            >
              <q-menu
                ref="addCategoryMenu"
                anchor="bottom left"
                self="top left"
                @before-show="newCategoryName = ''"
              >
                <div
                  class="q-pa-sm row items-center q-gutter-sm add-category-menu__inner"
                >
                  <q-input
                    v-model="newCategoryName"
                    outlined
                    dense
                    autofocus
                    class="col"
                    :placeholder="$t('addImagesModal.newCategoryPlaceholder')"
                    @keyup.enter="confirmAddCategory"
                  />
                  <q-btn
                    flat
                    dense
                    color="primary"
                    :label="$t('addImagesModal.addButton')"
                    @click="confirmAddCategory"
                  />
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>
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

      <div class="row q-col-gutter-xs library-grid">
        <div
          v-for="(image, index) in paginatedImages"
          :key="`img-${page}-${index}`"
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
              <div class="absolute-top row justify-between q-pa-xs library-card__actions">
                <q-btn
                  round
                  dense
                  flat
                  icon="play_arrow"
                  color="primary"
                  class="library-card__action-btn"
                  :disable="$store.getters['global/ttsEnabled'] === false"
                  @click.stop="$store.getters['global/tts'].speak({ text: image.name })"
                />
                <q-checkbox
                  v-model="selectedUrls"
                  :val="image.url"
                  dense
                  color="primary"
                  class="library-card__checkbox"
                />
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
            <div class="library-card__categories">
              <q-chip
                v-for="cat in image.categories || []"
                :key="`${image.id}-${cat}`"
                dense
                square
                :color="chipColor(cat)"
                text-color="white"
                class="image-category-chip"
              >
                {{ cat }}
              </q-chip>
              <q-btn
                flat
                dense
                round
                size="10px"
                icon="add"
                color="primary"
                class="library-card__add-cat"
                @click.stop="openImageCategoryDialog(image)"
              />
            </div>
          </q-card>
        </div>
      </div>

      <div class="row justify-center q-mt-sm q-pt-sm q-pb-md library-pagination">
        <q-pagination
          v-model="page"
          :max="pageCount"
          :max-pages="10"
          class="library-pagination__q"
          direction-links
          boundary-links
          flat
          rounded
          color="black"
          text-color="black"
          active-color="grey-4"
          active-text-color="black"
        />
      </div>
    </div>

    <q-menu
      v-model="categoryMenuOpen"
      :target="categoryMenuTarget"
      self="top left"
      anchor="bottom left"
    >
      <q-list
        dense
        style="min-width: 180px"
      >
        <q-item
          clickable
          @click="startRenameCategory"
        >
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>{{ $t('addImagesModal.renameCategoryMenu') }}</q-item-section>
        </q-item>
        <q-item
          clickable
          @click="deleteCategoryFromAll"
        >
          <q-item-section avatar>
            <q-icon
              name="delete"
              color="negative"
            />
          </q-item-section>
          <q-item-section class="text-negative">
            {{ $t('addImagesModal.deleteCategoryMenu') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>

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
          <q-input
            v-model="newCategoryNameForImage"
            outlined
            dense
            autofocus
            class="q-mb-md image-category-dialog__new-input"
            :placeholder="$t('addImagesModal.newCategoryPlaceholder')"
            @keyup.enter="submitNewCategoryFromImageDialog"
          />

          <q-input
            v-model="imageCategorySearch"
            outlined
            dense
            clearable
            class="q-mb-md"
            :placeholder="$t('addImagesModal.search')"
          >
            <template #prepend>
              <q-icon
                name="search"
                color="grey-7"
              />
            </template>
          </q-input>

          <q-scroll-area
            class="image-category-dialog__scroll"
            :thumb-style="{ borderRadius: '4px', width: '6px' }"
            :bar-style="{ borderRadius: '4px', width: '6px' }"
          >
            <div
              v-if="!filteredCategoriesForImageDialog.length"
              class="text-grey-7 text-caption q-py-sm"
            >
              {{ $t('addImagesModal.noCategorySearchResults') }}
            </div>
            <div
              v-else
              class="column q-gutter-sm"
            >
              <q-chip
                v-for="cat in filteredCategoriesForImageDialog"
                :key="`pick-${cat}`"
                clickable
                dense
                square
                :color="chipColor(cat)"
                text-color="white"
                class="image-category-dialog__chip"
                @click="pickCategoryForImage(cat)"
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
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="$t('addImagesModal.addButton')"
            :disable="!(newCategoryNameForImage || '').trim()"
            @click="submitNewCategoryFromImageDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="renameCategoryDialogOpen">
      <q-card style="min-width: 320px">
        <q-card-section class="text-h6">
          {{ $t('addImagesModal.renameCategoryTitle') }}
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="renameCategoryName"
            outlined
            dense
            autofocus
            @keyup.enter="confirmRenameCategory"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('generic.cancel')"
            @click="renameCategoryDialogOpen = false"
          />
          <q-btn
            flat
            color="primary"
            :label="$t('generic.validate')"
            @click="confirmRenameCategory"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <take-photo-dialog
      v-model="takePhotoDialogOpen"
      :category-options="categoryOptions"
      :chip-color="chipColor"
      @saved="onTakePhotoSaved"
      @add-category="onTakePhotoAddCategory"
    />

    <upload-photo-dialog
      :value="uploadPhotoDialogOpen"
      :file="pendingUploadFile"
      :category-options="categoryOptions"
      :chip-color="chipColor"
      @input="onUploadPhotoDialogInput"
      @saved="onUploadPhotoSaved"
      @failed="onUploadPhotoFailed"
      @add-category="onTakePhotoAddCategory"
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
import getCurrentUserId from '~/utils/getCurrentUserId'

const PAGE_SIZE = 12
const CHIP_COLORS = ['primary', 'deep-purple-6', 'teal-7', 'indigo-6', 'brown-7', 'orange-6', 'blue-5']
const CATEGORY_CATALOG_KEY_PREFIX = 'mavoix.personalCategoryCatalog.'

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
      selectedCategoryFilters: [],
      personalCategoryCatalog: [],
      page: 1,
      selectedUrls: [],
      categoryMenuOpen: false,
      categoryMenuTarget: null,
      categoryMenuCategory: '',
      imageCategoryDialogOpen: false,
      imageCategoryTarget: null,
      imageCategorySearch: '',
      newCategoryNameForImage: '',
      newCategoryName: '',
      renameCategoryDialogOpen: false,
      renameCategoryName: ''
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
    personalAssetByUrl () {
      return this.personalAssets.reduce((acc, asset) => {
        if (asset.url) acc[asset.url] = asset

        return acc
      }, {})
    },
    allImages () {
      if (this.activeLibrary === 'personal') {
        return this.personalUploadAssets.map((img) => ({
          id: img.id,
          url: img.url,
          name: img.name || 'Picto Name',
          categories: img.categories || []
        }))
      }

      const source = this.$store.state.global.images || []

      return source.map((img) => ({
        id: img.url,
        url: img.url,
        name: (img.names && img.names.fr && img.names.fr[0]) || 'Picto Name',
        categories: (this.personalAssetByUrl[img.url] && this.personalAssetByUrl[img.url].categories) || []
      }))
    },
    categoryOptions () {
      const fromAssets = this.allImages
        .flatMap((img) => img.categories || [])
        .filter(Boolean)

      return Array.from(new Set([...this.personalCategoryCatalog, ...fromAssets]))
    },
    filteredCategoriesForImageDialog () {
      const q = (this.imageCategorySearch || '').trim().toLowerCase()
      const sorted = [...this.categoryOptions].sort((a, b) =>
        a.localeCompare(b, 'fr', { sensitivity: 'base' })
      )
      if (!q) {
        return sorted
      }

      return sorted.filter((c) => c.toLowerCase().includes(q))
    },
    filteredImages () {
      const q = (this.search || '').trim().toLowerCase()

      return this.allImages.filter((img) => {
        const matchesText = !q || (img.name || '').toLowerCase().includes(q)
        const matchesCategories = this.selectedCategoryFilters.length === 0 ||
          this.selectedCategoryFilters.some((cat) => (img.categories || []).includes(cat))

        return matchesText && matchesCategories
      })
    },
    pageCount () {
      return Math.max(1, Math.ceil(this.filteredImages.length / PAGE_SIZE))
    },
    paginatedImages () {
      const start = (this.page - 1) * PAGE_SIZE

      return this.filteredImages.slice(start, start + PAGE_SIZE)
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
      this.page = 1
      this.search = ''
      this.selectedUrls = []
      this.selectedCategoryFilters = []
    },
    search () {
      this.page = 1
    },
    pageCount (count) {
      if (this.page > count) this.page = count
    }
  },
  mounted () {
    this.loadCategoryCatalog()
  },
  methods: {
    toggleLibrary () {
      this.activeLibrary = this.activeLibrary === 'arasaac' ? 'personal' : 'arasaac'
    },

    getCategoryCatalogStorageKey () {
      return `${CATEGORY_CATALOG_KEY_PREFIX}${getCurrentUserId()}`
    },

    loadCategoryCatalog () {
      const raw = window.localStorage.getItem(this.getCategoryCatalogStorageKey())
      this.personalCategoryCatalog = raw ? JSON.parse(raw) : []
    },

    saveCategoryCatalog () {
      const deduped = Array.from(new Set(this.personalCategoryCatalog.filter(Boolean)))
      this.personalCategoryCatalog = deduped
      window.localStorage.setItem(this.getCategoryCatalogStorageKey(), JSON.stringify(deduped))
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

    onTakePhotoAddCategory (name) {
      const n = (name || '').trim()
      if (!n || this.personalCategoryCatalog.includes(n)) {
        return
      }
      this.personalCategoryCatalog.push(n)
      this.saveCategoryCatalog()
    },

    confirmAddCategory () {
      const name = (this.newCategoryName || '').trim()
      if (!name) {
        return
      }
      if (!this.personalCategoryCatalog.includes(name)) {
        this.personalCategoryCatalog.push(name)
        this.saveCategoryCatalog()
      }
      this.newCategoryName = ''
      this.$refs.addCategoryMenu?.hide()
    },

    openCategoryMenu (category, evt) {
      this.categoryMenuCategory = category
      this.categoryMenuTarget = evt.currentTarget
      this.categoryMenuOpen = true
    },

    startRenameCategory () {
      this.renameCategoryName = this.categoryMenuCategory
      this.renameCategoryDialogOpen = true
      this.categoryMenuOpen = false
    },

    async confirmRenameCategory () {
      const from = this.categoryMenuCategory
      const to = (this.renameCategoryName || '').trim()
      if (!from || !to || from === to) {
        this.renameCategoryDialogOpen = false

        return
      }

      await this.updateCategoryForAllAssets(from, to)
      const catIdx = this.personalCategoryCatalog.indexOf(from)
      if (catIdx !== -1) {
        this.personalCategoryCatalog.splice(catIdx, 1)
        if (!this.personalCategoryCatalog.includes(to)) {
          this.personalCategoryCatalog.push(to)
        }
        this.saveCategoryCatalog()
      }
      this.selectedCategoryFilters = Array.from(new Set(
        this.selectedCategoryFilters.map((c) => (c === from ? to : c))
      ))
      this.renameCategoryDialogOpen = false
      this.$store.dispatch('assetsManager/loadAssets')
    },

    async deleteCategoryFromAll () {
      const category = this.categoryMenuCategory
      if (!category) {
        return
      }
      await this.updateCategoryForAllAssets(category, null)
      this.selectedCategoryFilters = this.selectedCategoryFilters.filter((c) => c !== category)
      this.personalCategoryCatalog = this.personalCategoryCatalog.filter((c) => c !== category)
      this.saveCategoryCatalog()
      this.categoryMenuOpen = false
      this.$store.dispatch('assetsManager/loadAssets')
    },

    openImageCategoryDialog (image) {
      this.imageCategoryTarget = image
      this.imageCategorySearch = ''
      this.newCategoryNameForImage = ''
      this.imageCategoryDialogOpen = true
    },

    onImageCategoryDialogHide () {
      this.imageCategoryTarget = null
      this.imageCategorySearch = ''
      this.newCategoryNameForImage = ''
    },

    async pickCategoryForImage (cat) {
      await this.assignCategoryToImage(cat)
    },

    async submitNewCategoryFromImageDialog () {
      const name = (this.newCategoryNameForImage || '').trim()
      if (!name) {
        return
      }
      await this.assignCategoryToImage(name)
      this.newCategoryNameForImage = ''
    },

    async assignCategoryToImage (category) {
      const name = (category || '').trim()
      if (!name || !this.imageCategoryTarget) {
        return
      }
      try {
        await this.addCategoryToAsset(this.imageCategoryTarget, name)
        if (!this.personalCategoryCatalog.includes(name)) {
          this.personalCategoryCatalog.push(name)
          this.saveCategoryCatalog()
        }
        this.imageCategoryDialogOpen = false
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

    async addCategoryToAsset (image, category) {
      const userId = getCurrentUserId()
      const existing = this.personalAssetByUrl[image.url]
      let model
      if (existing && existing.id) {
        model = await new Parse.Query(AssetModel).get(existing.id)
      } else {
        model = await AssetModel.New(image.name || 'Picto Name', false, image.url, userId).save()
      }
      const categories = Array.from(new Set([...(model.get('categories') || []), category]))
      model.set('categories', categories)
      await model.save()
    },

    async updateCategoryForAllAssets (from, to) {
      await Promise.all(this.personalAssets.map(async (asset) => {
        const categories = asset.categories || []
        if (!categories.includes(from)) {
          return
        }
        const model = await new Parse.Query(AssetModel).get(asset.id)
        const next = to
          ? Array.from(new Set(categories.map((c) => (c === from ? to : c))))
          : categories.filter((c) => c !== from)
        model.set('categories', next)
        await model.save()
      }))
    },

    chipColor (category) {
      let hash = 0
      for (let i = 0; i < category.length; i += 1) {
        hash = ((hash << 5) - hash) + category.charCodeAt(i)
        hash |= 0
      }

      return CHIP_COLORS[Math.abs(hash) % CHIP_COLORS.length]
    },

    isHidden (url) {
      const item = this.tabItems.find((it) => it.asset && it.asset.url === url)

      return Boolean(item && item.hidden)
    },

    isUnavailable (url) {
      const item = this.tabItems.find((it) => it.asset && it.asset.url === url)

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
          const existing = this.tabItems.find((it) => it.asset && it.asset.url === url)
          if (existing) {
            return null
          }

          const entry = this.allImages.find((img) => img.url === url)
          if (!entry || !entry.url) {
            return null
          }

          const assetModel = await AssetModel.New(entry.name, false, entry.url, uid).save()
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

.category-select
  min-width 190px

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
  background transparent !important

  pointer-events none
  z-index 3

.library-card__action-btn,
.library-card__checkbox
  pointer-events auto

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

.library-card__action-btn
  background rgba(255, 255, 255, 0.75)

.library-card__checkbox
  background rgba(255, 255, 255, 0.75)
  border-radius 4px
  padding 0 2px

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

.add-category-menu__inner
  min-width 280px
</style>

<style lang="stylus">
/* Teleported popups/dialogs: classes must be unscoped */
.category-filter-popup
  min-width 280px

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
