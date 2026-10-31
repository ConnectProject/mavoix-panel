<template>
  <!--
    /home is only a transit point: HomeLayout redirects it to the landing tab once the tabs are loaded
    (and handles the ?code=... coming back from Connect). It paints the last tab colour and nothing else,
    so that there is no flash between the boot background and the tab.
  -->
  <q-page :style="{ background: lastTabColor }" />
</template>

<script>
import { getLastTabColor } from '~/utils/mavoixNavigation'

export default {
  name: 'PageHome',
  data () {
    return {
      lastTabColor: getLastTabColor()
    }
  }
}
</script>
