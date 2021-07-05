<template>
  <q-dialog
    v-model="showCam"
    @show="onShow"
    @before-hide="onBeforeHide"
  >
    <q-card class="no-margin transparent">
      <div class="absolute">
        <!-- video element -->
        <video
          ref="video"
          width="480"
          height="480"
          autoplay
        />
        <!-- where the image taken will be displayed -->
        <img
          v-if="image"
          class="absolute-top-left"
          :src="image"
          width="480"
          height="480"
        >
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
      <!-- canvas to draw the screenshots -->
      <canvas
        ref="canvas"
        width="480"
        height="480"
      />
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'Camera',
  data () {
    return {
      title: '',
      image: null,
      showCam: false
    }
  },
  methods: {

    /**
     * Capture the image
     * @returns {void}
     */
    capture () {
      this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, 480, 480)
      this.image = this.$refs.canvas.toDataURL('image/png')
      setTimeout(() => {
        this.$refs.titleImage.focus()
      }, 20)
    },

    /**
     * Save it in the back
     * @returns {void}
     */
    saveImage () {
      if (this.title === '') {
        this.title = 'sans nom'
      }
      const file = this.dataToFile(this.image, this.title)
      this.$store.dispatch('assetsManager/uploadFiles', [file]).then(() => {
        this.retake()
      })
    },

    /**
     * Reitinialize data to retake picture
     * @returns {void}
     */
    retake () {
      this.image = null
      this.file = null
      this.title = ''
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
        navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 480 } }).then(stream => {
          try {
            this.$refs.video.srcObject = stream
          } catch (error) {
            // if srcObject is not supported by the browser, use the old way
            this.$refs.video.src = window.URL.createObjectURL(stream)
          }
        })
      }
    },

    onBeforeHide () {
      this.$refs.video.pause()
      this.$refs.video.src = ''
      this.$refs.video.srcObject.getTracks()[0].stop()
    },
  }
}

</script>

<style lang="stylus" scoped>
.footer
  height 100%
  width 100%
  position absolute

.actions
  margin 10px

li
  display inline-block

ul
  height 56px
</style>
