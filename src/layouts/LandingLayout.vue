<template>
  <q-layout view="lHh lpr lFf">

    <!-- (Optional) The Header -->
    <q-header class="q-py-sm" style="background-color:white; color:grey">
      <q-toolbar>
        <q-space ></q-space>
        <q-tabs v-model="selected_tab" shrink>
          <q-tab class="q-mr-sm q-py-xs custom_tab" no-caps @click="scrollToElement('id_mavoix');" style="width:120px;min-height:auto !important" label="MaVoix" />
          <q-tab class="q-mr-sm q-py-xs custom_tab" no-caps @click="scrollToElement('id_about');" style="width:120px;min-height:auto !important" label="About Us" />
          <q-tab class="q-mr-sm q-py-xs custom_tab" no-caps @click="scrollToElement('id_doc');" style="width:120px;min-height:auto !important" label="Documentation" />
          <q-tab class="q-mr-sm q-py-xs custom_tab" no-caps @click="scrollToElement('id_login');" style="width:120px;min-height:auto !important" label="Sign In" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>

        <!-- Block 1 -->
        <div class="row" id="id_mavoix" style="height:640px">
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card class="q-pa-sm flex flex-left text-left no-shadow" style="margin: 40px">
              <q-card-section>
                <div class="text-h2 text-weight-thin" style="margin-top: 40px">MaVoix</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-weight-thin" style="font-size:1.5rem">
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
              <q-card-section>
                <q-btn label="Get Started" class="no-shadow text-weight-light" no-caps outline></q-btn>
              </q-card-section>
            </q-card>
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img src="./assets/mavoix.jpg" contain style="max-width:500px;height:90%"/>
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
        </div>

        <!-- Block 2 -->
        <div class="row" id="id_connect" style="height:640px">
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img src="./assets/connect.jpg" style="width:500px"/>
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card class="q-pa-sm flex flex-left text-left no-shadow" style="margin: 40px">
              <q-card-section>
                <div class="text-h2 text-weight-thin" style="margin-top: 40px">Sharing is caring</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-weight-thin" style="font-size:1.5rem">
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
        </div>

        <!-- Block 3 -->
        <div class="row" id="id_connect" style="height:640px">
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card class="q-pa-sm flex flex-left text-left no-shadow" style="margin: 40px">
              <q-card-section>
                <div class="text-h2 text-weight-thin" style="margin-top: 40px">Data for insight</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-weight-thin" style="font-size:1.5rem">
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
            </q-card>
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img src="./assets/data.svg" style="width:500px"/>
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12"></div>
        </div>

        <div class="row" id="id_news" style="background-color: black;color: white;font-size:0.8rem;padding:2em">
          <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <p class="text-center">Latest News</p>
            <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>

        <q-toolbar class="flex flex-center text-white" style="background-color: black" :style="'border-top: 2px solid '+ theme_color">
          <div class="q-pa-sm q-gutter-sm">
            <q-btn round type="a" href="https://twitter.com/ConnectProject"
                          :style="'background:'+ theme_color +'; color: white !important;'" icon="fab fa-twitter" />
            <q-btn round type="a" href="https://github.com/ConnectProject"
                          :style="'background:'+ theme_color +'; color: white !important;'" icon="fab fa-github" />
            <q-btn round type="a" href="mailto:contact@connectproject.io"
                          :style="'background:'+ theme_color +'; color: white !important;'" icon="email" />
          </div>
        </q-toolbar>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  // name: 'LayoutName',

  data () {
    return {
    }
  },
  methods: {
    scrollToElement (id) {
      let el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 900
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>
