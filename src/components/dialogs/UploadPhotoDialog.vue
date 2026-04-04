<template>
  <q-dialog
    :value="value"
    @input="$emit('input', $event)"
    @hide="onHide"
  >
    <q-card
      v-if="file"
      class="upload-photo-card bg-grey-10 text-white"
    >
      <q-btn
        icon="close"
        flat
        round
        dense
        class="upload-photo-close"
        color="grey-5"
        @click="close"
      />

      <q-card-section class="q-pt-lg">
        <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
          {{ $t('uploadPhoto.heading') }}
        </div>
        <div
          v-if="previewUrl"
          class="upload-photo-preview q-mx-auto"
        >
          <q-img
            :src="previewUrl"
            ratio="1"
            contain
            class="upload-photo-preview__img bg-grey-9"
            spinner-color="primary"
          />
        </div>

        <div class="row q-col-gutter-sm items-end q-mt-md">
          <div class="col-12 col-sm-4">
            <div class="row items-center no-wrap q-mb-xs">
              <span class="text-caption text-grey-5">{{ $t('takePhoto.nameLabel') }}</span>
              <image-name-hint-icon class="q-ml-xs" />
            </div>
            <q-input
              v-model="imageName"
              outlined
              dense
              dark
              color="grey-3"
              :placeholder="$t('takePhoto.nameLabel')"
              @keyup.enter="save"
            />
          </div>
          <div class="col-12 col-sm-5">
            <div class="row items-center q-mb-xs">
              <span class="text-caption text-grey-5">{{ $t('takePhoto.categoryLabel') }}</span>
            </div>
            <q-select
              v-model="selectedCategories"
              outlined
              dense
              dark
              multiple
              use-chips
              use-input
              new-value-mode="add-unique"
              input-debounce="0"
              :options="categoryOptions"
              popup-content-class="take-photo-cat-popup"
              class="upload-photo-select"
              @new-value="onNewCategoryValue"
            >
              <template #selected-item="scope">
                <q-chip
                  :key="`upload-sel-${scope.index}-${categoryChipKey(scope.opt)}`"
                  dense
                  square
                  removable
                  :color="chipColor(scope.opt)"
                  text-color="white"
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
                      :key="`upload-opt-${scope.index}-${categoryChipKey(scope.opt)}`"
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
          <div class="col-12 col-sm-3 flex flex-center">
            <q-btn
              unelevated
              no-caps
              color="grey-9"
              class="full-width"
              :label="$t('takePhoto.save')"
              :loading="saving"
              @click="save"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ImageNameHintIcon from '~/components/dialogs/ImageNameHintIcon.vue'

const stripImageExtension = function (name) {
  return (name || '').replace(/\.(jpe?g|png|gif|bmp)$/i, '').trim()
}

export default {
  name: 'UploadPhotoDialog',
  components: {
    ImageNameHintIcon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    file: {
      type: File,
      default: null
    },
    categoryOptions: {
      type: Array,
      default: () => []
    },
    chipColor: {
      type: Function,
      required: true
    },
    categoryChipKey: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      imageName: '',
      selectedCategories: [],
      saving: false,
      previewUrl: ''
    }
  },
  watch: {
    file: {
      handler (f) {
        this.revokePreview()
        if (f) {
          this.imageName = stripImageExtension(f.name)
          this.selectedCategories = []
          this.previewUrl = URL.createObjectURL(f)
        } else {
          this.imageName = ''
          this.previewUrl = ''
        }
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.revokePreview()
  },
  methods: {
    onHide () {
      this.revokePreview()
    },

    revokePreview () {
      if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewUrl)
      }
      this.previewUrl = ''
    },

    close () {
      this.$emit('input', false)
    },

    onNewCategoryValue (val, done) {
      const name = (val || '').trim()
      if (!name) {
        done('')

        return
      }
      this.$emit('add-category', name)
      done(name, 'add-unique')
    },

    async save () {
      if (!this.file || this.saving) {
        return
      }
      const name = (this.imageName || '').trim() || this.$t('takePhoto.defaultName')
      this.saving = true
      try {
        await this.$store.dispatch('assetsManager/uploadPersonalPhoto', {
          file: this.file,
          name,
          categories: this.selectedCategories
        })
        this.$emit('saved')
        this.close()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        this.$emit('failed', e)
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-photo-card
  position relative
  width 100%
  max-width 520px
  border-radius 12px

.upload-photo-close
  position absolute
  top 8px
  right 8px
  z-index 2

.upload-photo-preview
  max-width 280px

.upload-photo-preview__img
  border-radius 8px
  border 2px solid #42a5f5
  max-height 240px
</style>
