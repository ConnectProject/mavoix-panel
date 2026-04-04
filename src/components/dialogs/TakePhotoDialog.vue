<template>
  <q-dialog
    :value="value"
    @input="$emit('input', $event)"
    @show="onDialogShow"
    @hide="onDialogHide"
  >
    <q-card class="take-photo-card bg-grey-10 text-white">
      <q-btn
        icon="close"
        flat
        round
        dense
        class="take-photo-close"
        color="grey-5"
        @click="close"
      />

      <q-card-section class="q-pt-lg q-pb-sm">
        <div class="take-photo-stage q-mx-auto">
          <video
            v-show="step === 'camera'"
            ref="video"
            class="take-photo-video"
            playsinline
            muted
            autoplay
          />
          <div
            v-show="step === 'crop'"
            class="take-photo-crop-shell"
          >
            <canvas
              ref="canvas"
              class="take-photo-canvas"
            />
          </div>
        </div>

        <div
          v-if="step === 'camera'"
          class="row justify-center q-mt-md"
        >
          <q-btn
            unelevated
            no-caps
            color="light-blue-3"
            text-color="grey-10"
            icon="camera_alt"
            :label="$t('takePhoto.capture')"
            @click="capture"
          />
        </div>

        <div
          v-if="step === 'crop'"
          class="row justify-center q-mt-sm"
        >
          <q-btn
            flat
            no-caps
            color="light-blue-3"
            :label="$t('takePhoto.retake')"
            @click="retake"
          />
        </div>
      </q-card-section>

      <q-card-section
        v-if="step === 'crop'"
        class="q-pt-none"
      >
        <div class="row q-col-gutter-sm items-end take-photo-form-row">
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
              class="take-photo-input"
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
              class="take-photo-select"
              @new-value="onNewCategoryValue"
            >
              <template #selected-item="scope">
                <q-chip
                  :key="`takephoto-sel-${scope.index}-${categoryChipKey(scope.opt)}`"
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
                      :key="`takephoto-opt-${scope.index}-${categoryChipKey(scope.opt)}`"
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
              class="full-width take-photo-save"
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
/* eslint-disable max-lines */
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import ImageNameHintIcon from '~/components/dialogs/ImageNameHintIcon.vue'

export default {
  name: 'TakePhotoDialog',
  components: {
    ImageNameHintIcon
  },
  props: {
    value: {
      type: Boolean,
      default: false
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
      step: 'camera',
      imageName: '',
      selectedCategories: [],
      cropper: null,
      stream: null,
      saving: false
    }
  },
  watch: {
    value (open) {
      if (!open) {
        this.resetState()
      }
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },

    resetState () {
      this.step = 'camera'
      this.imageName = ''
      this.selectedCategories = []
      this.saving = false
      this.destroyCropper()
    },

    destroyCropper () {
      if (this.cropper) {
        this.cropper.destroy()
        this.cropper = null
      }
    },

    stopStream () {
      if (this.stream) {
        this.stream.getTracks().forEach((t) => t.stop())
        this.stream = null
      }
      if (this.$refs.video) {
        this.$refs.video.srcObject = null
      }
    },

    onDialogShow () {
      this.startCamera()
    },

    onDialogHide () {
      this.stopStream()
      this.destroyCropper()
    },

    startCamera () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.$q.notify({
          color: 'negative',
          message: this.$t('takePhoto.noCamera'),
          position: 'top-right'
        })

        return
      }
      const constraints = { video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } } }
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.stream = stream
          this.$refs.video.srcObject = stream
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          const msg = err && err.message ? err.message : String(err)
          this.$q.notify({
            color: 'negative',
            message: msg,
            position: 'top-right'
          })
        })
    },

    capture () {
      const { video, canvas } = this.$refs
      if (!video || !canvas || !video.videoWidth) {
        this.$q.notify({
          color: 'warning',
          message: this.$t('takePhoto.waitCamera'),
          position: 'top-right'
        })

        return
      }
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      this.stopStream()
      this.step = 'crop'
      this.$nextTick(() => {
        this.destroyCropper()
        this.cropper = new Cropper(canvas, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          guides: true,
          background: false,
          autoCropArea: 0.85,
          responsive: true,
          restore: false
        })
      })
    },

    retake () {
      this.destroyCropper()
      this.step = 'camera'
      this.startCamera()
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

    save () {
      if (!this.cropper || this.saving) {
        return
      }
      const name = (this.imageName || '').trim() || this.$t('takePhoto.defaultName')
      this.saving = true
      const out = this.cropper.getCroppedCanvas({ width: 512, height: 512, imageSmoothingQuality: 'high' })
      out.toBlob((blob) => {
        if (!blob) {
          this.saving = false

          return
        }
        const safe = name.replace(/[^\w\s\-àâäéèêëïîôùûüç]/gi, '').trim() || 'photo'
        const file = new File([blob], `${safe}.png`, { type: 'image/png' })
        this.$store.dispatch('assetsManager/uploadPersonalPhoto', {
          file,
          name,
          categories: this.selectedCategories
        })
          .then(() => {
            this.$emit('saved')
            this.close()
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err)
            const msg = err && err.message ? err.message : String(err)
            this.$q.notify({
              color: 'negative',
              message: msg,
              position: 'top-right'
            })
          })
          .finally(() => {
            this.saving = false
          })
      }, 'image/png', 0.92)
    }
  }
}
</script>

<style lang="stylus" scoped>
.take-photo-card
  position relative
  width 100%
  max-width 520px
  border-radius 12px

.take-photo-close
  position absolute
  top 8px
  right 8px
  z-index 2

.take-photo-stage
  max-width 360px

.take-photo-video
  display block
  width 100%
  aspect-ratio 1
  object-fit cover
  border 3px solid #42a5f5
  border-radius 4px
  background #1a1a1a

.take-photo-crop-shell
  width 100%
  max-height 320px
  border 3px solid #42a5f5
  border-radius 4px
  overflow hidden
  background #1a1a1a

.take-photo-canvas
  display block
  max-width 100%

.take-photo-form-row
  margin-top 4px

.take-photo-save
  min-height 40px
</style>

<style lang="stylus">
.take-photo-cat-popup
  min-width 260px
</style>
