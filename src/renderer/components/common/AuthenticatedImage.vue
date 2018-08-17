<template>
  <img v-if="!hidden">
  </img>
</template>

<script>
import {_imageAuthGet} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
    hidden: false
  }),

  components: {
  },

  props: ['url'],

  created: function () {
    var component = this
    _imageAuthGet(this.$store, this.url)
      .then(function (response) {
        var reader = new window.FileReader()
        reader.readAsDataURL(response.data)
        reader.onload = function () {
          var imageDataUrl = reader.result
          let image = component.$el
          image.setAttribute('src', imageDataUrl)
          component.$data.hidden = false
        }
      }).catch(function (e) {
        component.$data.hidden = true
      })
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
