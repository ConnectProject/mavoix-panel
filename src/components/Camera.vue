<template>
  <div class="holder">
    <div class="absolute">
      <!-- video element -->
      <video
        ref="video"
        width="640"
        height="480"
        autoplay
      >
      </video>
      <!-- where the image taken will be displayed -->
      <img
        class="absolute-top-left"
        v-if="captures.length"
        v-bind:src="captures[captures.length - 1]"
        width="640"
        height="480"
      />
    </div>
    <div>
      <div class="snap">
        <!-- button to trigger snapshot -->
        <q-btn
          v-if="captures.length === 0"
          class="bg-blue"
          @click="capture()"
          icon-right="camera_alt"
          :label="$t('camera.snapPic')"
        />
        <!-- button to retake image -->
        <q-btn
          v-if="captures.length"
          class="bg-red"
          @click="retake()"
          icon-right="redo"
          :label="$t('camera.retake')"
        />
      </div>
      <!-- input for changing the name -->
      <q-input
        ref="titleImage"
        standout="bg-white"
        v-if="image !== null"
        class="absolute-top-left full-width"
        color="blue"
        @keyup.enter="saveImage"
        filled
        :label="$t('camera.imageName')"
        v-model="title"
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
    >
    </canvas>
  </div>
</template>

<script>

export default {
  name: 'app',
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
    let that = this
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
     */
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
      this.captures.push(this.canvas.toDataURL('image/png'))
      this.image = this.canvas.toDataURL('image/png')
      let that = this
      setTimeout(() => {
        that.$refs.titleImage.focus()
      }, 20)
    },
    /**
     * Save it in the back
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
     */
    retake () {
      this.image = null
      this.captures = []
      this.file = null
      this.title = ''
    },
    /**
     * transform canvas data to JS File interface (preparing to send to API)
     */
    dataToFile (dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
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
