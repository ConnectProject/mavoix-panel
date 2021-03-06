<template>
  <q-dialog
    v-model="showCam"
    @show="onShow"
    @before-hide="onBeforeHide"
  >
    <q-card class="card no-margin bg-grey-3">
      <div class="absolute">
        <!-- video element -->
        <video
          v-show="!image"
          ref="video"
          :width="width"
          :height="height"
          autoplay
        />
        <!-- where the image taken will be displayed -->
        <!-- <img
          v-show="image"
          ref="image"
          class="absolute-top-left"
          src="image"
          :width="width"
          :height="height"
        > -->
      </div>
      <!-- canvas to draw the screenshots -->
      <div>
        <canvas
          ref="canvas"
          :width="width"
          :height="height"
        />
      </div>
      <div class="footer column justify-end">
        <div class="snap">
          <q-card-actions
            class="actions"
            align="evenly"
          >
            <!-- button to trigger snapshot -->
            <q-btn
              v-show="!image"
              class="bg-blue"
              icon-right="camera_alt"
              :label="$t('camera.snapPic')"
              @click="capture()"
            />
            <!-- button to retake image -->
            <q-btn
              v-show="!!image"
              class="bg-red"
              icon-right="redo"
              :label="$t('camera.retake')"
              @click="retake()"
            />
          </q-card-actions>
        </div>
        <!-- input for changing the name -->
        <q-input
          v-if="image !== null"
          ref="titleImage"
          v-model="title"
          standout="bg-white"
          class="full-width"
          color="blue"
          filled
          :label="$t('camera.imageName')"
          @keyup.enter="saveImage"
        >
          <template #append>
            <q-btn
              color="blue"
              icon-right="save"
              label="save"
              @click="saveImage"
            />
          </template>
        </q-input>

        <q-icon
          name="close"
          class="q-pa-md cursor-pointer absolute-top-right"
          style="font-size: 3em"
          @click="showCam = false"
        />
      </div>

    </q-card>
  </q-dialog>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
  name: 'Camera',
  data () {
    return {
      title: '',
      image: null,
      showCam: false,
      width: 480,
      height: 480,
      cropper: null
    }
  },
  methods: {

    /**
     * Capture the image
     * @returns {void}
     */
    capture () {
      this.$refs.canvas.getContext('2d')
        .drawImage(this.$refs.video, 0, 0, this.width, this.height)
      // this.image = this.$refs.canvas.toDataURL('image/png')
      this.image = true
      this.$nextTick(() => {
        this.$refs.titleImage.focus()
        this.cropper = new Cropper(this.$refs.canvas, {});
      })
    },

    /**
     * Save it in the back
     * @returns {void}
     */
    saveImage () {
      if (this.title === '') {
        this.title = 'sans nom'
      }
      const image = this.cropper.getCroppedCanvas().toDataURL('image/png')
      const file = this.dataToFile(image, this.title)
      this.$store.dispatch('assetsManager/uploadFiles', { files: [file], posNotif: 'center' }).then(() => {
        this.retake()
      })
    },

    /**
     * Reitinialize data to retake picture
     * @returns {void}
     */
    retake () {
      this.image = null
      this.title = ''
      this.cropper?.destroy()
    },

    /**
     * transform canvas data to JS File interface (preparing to send to API)
     * @param {string} dataurl data URI containing a representation of the image
     * @param {string} name name entered by the user
     * @returns {File} file created
     */
    dataToFile (dataurl, name) {
      var arr = dataurl.split(','),
        bstr = atob(arr[1]),
        [, mime] = arr[0].match(/:(.*?);/),
        ext = mime.match(/\/(.*?)/),
        filename = `${name}.${ext}`,
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },

    onShow () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const contraints = {
          video: {
            width: 480,
            height: 480
          }
        }
        navigator.mediaDevices.getUserMedia(contraints).then(stream => {
          const settings = stream.getTracks()[0].getSettings()
          this.width = settings.width
          this.height = settings.height
          try {
            this.$refs.video.srcObject = stream
          } catch (error) {
            // if srcObject is not supported by the browser, use the old way
            // but mavoix is unlikely to work with old browsers
            this.$refs.video.src = window.URL.createObjectURL(stream)
          }
        })
      }
    },

    onBeforeHide () {
      this.image = null
      this.$refs.video.pause()
      this.$refs.video.src = ''
      this.$refs.video.srcObject.getTracks()[0].stop()
    },
  }
}

</script>

<style lang="stylus" scoped>
.card
  max-width unset

.footer
  height 100%
  width 100%
  // position absolute

.actions
  margin 10px

/* Ensure the size of the image fit the container perfectly */
canvas
  display block
  /* This rule is very important, please don't ignore this */
  max-width 100%
</style>
