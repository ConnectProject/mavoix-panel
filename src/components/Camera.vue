<template>
  <div class="holder">
    <div class="absolute">
      <!-- video element -->
      <video
        ref="video"
        width="640"
        height="480"
        autoplay
      />
      <!-- where the image taken will be displayed -->
      <img
        v-if="captures.length"
        class="absolute-top-left"
        :src="captures[captures.length - 1]"
        width="640"
        height="480"
      >
    </div>
    <div>
      <div class="snap">
        <!-- button to trigger snapshot -->
        <q-btn
          v-if="captures.length === 0"
          class="bg-blue"
          icon-right="camera_alt"
          :label="$t('camera.snapPic')"
          @click="capture()"
        />
        <!-- button to retake image -->
        <q-btn
          v-if="captures.length"
          class="bg-red"
          icon-right="redo"
          :label="$t('camera.retake')"
          @click="retake()"
        />
      </div>
      <!-- input for changing the name -->
      <q-input
        v-if="image !== null"
        ref="titleImage"
        v-model="title"
        standout="bg-white"
        class="absolute-top-left full-width"
        color="blue"
        filled
        :label="$t('camera.imageName')"
        @keyup.enter="saveImage"
      >
        <template v-slot:append>
          <q-btn
            color="blue"
            icon-right="save"
            label="save"
            @click="saveImage"
          />
        </template>
      </q-input>
    </div>
    <!-- canvas to draw the screenshots -->
    <canvas
      ref="canvas"
      width="640"
      height="480"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      video: {},
      canvas: {},
      captures: [],
      file: null,
      title: '',
      image: null
    }
  },
  mounted () {
    this.video = this.$refs.video
    const that = this
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        try {
          that.video.srcObject = stream
        } catch (error) {
          that.video.src = window.URL.createObjectURL(stream)
        }
        that.video.play()
      })
    }
  },
  beforeDestroy () {
    this.$refs.video.pause()
    this.$refs.video.src = ''
    this.$refs.video.srcObject.getTracks()[0].stop()
  },
  methods: {

    /**
     * Capture the image
     * @returns {void}
     */
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
      this.captures.push(this.canvas.toDataURL('image/png'))
      this.image = this.canvas.toDataURL('image/png')
      const that = this
      setTimeout(() => {
        that.$refs.titleImage.focus()
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
      this.file = this.dataToFile(this.image, this.title)
      this.$store.dispatch('assetsManager/uploadFile', this.file).then(() => {
        this.retake()
      })
    },

    /**
     * Reitinialize data to retake picture
     * @returns {void}
     */
    retake () {
      this.image = null
      this.captures = []
      this.file = null
      this.title = ''
    },

    /**
     * transform canvas data to JS File interface (preparing to send to API)
     * @param {string} dataurl data URI containing a representation of the image
     * @param {string} filename name entered by the user
     * @returns {File} file created
     */
    dataToFile (dataurl, filename) {
      var arr = dataurl.split(','),
        bstr = atob(arr[1]),
        [, mime] = arr[0].match(/:(.*?);/),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .holder{
    position relative
    height 480px
    width 640px
  }
  .snap{
    position absolute
    bottom 20px
    left 0
    right 0
    margin auto
  }
  li{
    display inline-block
  }
  ul{
    height 56px
  }
</style>
