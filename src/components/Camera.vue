<template>
  <div style="position:relative;height640px;width: 640px">
    <div style="position:absolute"  width="640" height="480"><video  ref="video" id="video" width="640" height="480" autoplay></video></div>
    <div><q-btn class="bg-blue" style="position:absolute; bottom: 40px; left:0; right:0; margin: auto" v-on:click="capture()">Snap Photo</q-btn></div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    <ul>
      <li v-for="c in captures" :key="c">
        <img v-bind:src="c"  height="50" />
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      video: {},
      canvas: {},
      captures: []
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
  methods: {
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
      this.captures.push(this.canvas.toDataURL('image/png'))
    }
  }
}
</script>

<style lang="stylus" scoped>
  li{
    display: inline-block
  }
</style>
