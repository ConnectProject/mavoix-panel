<template>
  <q-layout view="lHh lpr lFf">
    <!-- (Optional) The Header -->
    <q-header
      class="q-py-sm"
      style="background-color:white; color:grey"
    >
      <q-toolbar>
        <q-space />
        <q-tabs shrink>
          <q-route-tab
            class="q-mr-sm q-py-xs custom_tab"
            no-caps
            :to="{name: 'home'}"
            label="MaVoix Panel"
          />
          <a
            href="https://mavoix.connect-project.io/app/"
            style="color: inherit; text-decoration: none"
          >
            <q-tab
              class="q-mr-sm q-py-xs custom_tab"
              no-caps
              label="MaVoix App"
            />
          </a>
          <q-tab
            class="q-mr-sm q-py-xs custom_tab"
            no-caps
            onclick="alert('Go to doc')"
            label="Documentation"
          />
          <q-tab
            class="q-mr-sm q-py-xs custom_tab"
            no-caps
            onclick="alert('Go to about')"
            label="About Us"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <!-- Block 1 -->
        <div
          id="id_mavoix"
          class="row"
          style="height:640px"
        >
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card
              class="q-pa-sm flex flex-left text-left no-shadow"
              style="margin: 40px"
            >
              <q-card-section>
                <div
                  class="text-h2 text-weight-thin"
                  style="margin-top: 40px"
                >
                  MaVoix
                </div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-weight-thin"
                style="font-size:1.5rem"
              >
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
              <q-card-section>
                <q-btn
                  label="Get Started"
                  class="no-shadow text-weight-light"
                  no-caps
                  outline
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img
              src="mavoix.jpg"
              contain
              style="max-width:500px;height:90%"
            />
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
        </div>

        <!-- Block 2 -->
        <div
          id="id_connect"
          class="row"
          style="height:640px"
        >
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img
              src="connect.jpg"
              style="width:500px"
            />
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card
              class="q-pa-sm flex flex-left text-left no-shadow"
              style="margin: 40px"
            >
              <q-card-section>
                <div
                  class="text-h2 text-weight-thin"
                  style="margin-top: 40px"
                >
                  Sharing is caring
                </div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-weight-thin"
                style="font-size:1.5rem"
              >
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
        </div>

        <!-- Block 3 -->
        <div
          id="id_connect"
          class="row"
          style="height:640px"
        >
          <!-- Item 2.1 -->
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-card
              class="q-pa-sm flex flex-left text-left no-shadow"
              style="margin: 40px"
            >
              <q-card-section>
                <div
                  class="text-h2 text-weight-thin"
                  style="margin-top: 40px"
                >
                  Data for insight
                </div>
              </q-card-section>
              <q-card-section
                class="q-pt-none text-weight-thin"
                style="font-size:1.5rem"
              >
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                MaVoix is integrated with Connect – an open database for sharing public, anonymous data among
                assistive applications. Using MaVoix we work together to make image-based communication better.
              </q-card-section>
            </q-card>
          </div>

          <!-- Item 2.2 -->
          <div class="col-md-5 col-lg-3 col-xs-12 col-sm-12">
            <q-img
              src="data.svg"
              style="width:500px"
            />
          </div>
          <div class="col-md-1 col-lg-3 col-xs-12 col-sm-12" />
        </div>

        <div
          id="id_news"
          class="row"
          style="background-color: black;color: white;font-size:0.8rem;padding:2em"
        >
          <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <p class="text-center">
              Latest News
            </p>
            <p class="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <q-toolbar
          class="flex flex-center text-white"
          style="background-color: black"
          :style="'border-top: 2px solid'"
        >
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              round
              type="a"
              href="https://twitter.com/ConnectProject"
              :style="'color: white !important;'"
              icon="fab fa-twitter"
            />
            <q-btn
              round
              type="a"
              href="https://github.com/ConnectProject"
              :style="'color: white !important;'"
              icon="fab fa-github"
            />
            <q-btn
              round
              type="a"
              href="mailto:contact@connectproject.io"
              :style="'color: white !important;'"
              icon="email"
            />
          </div>
        </q-toolbar>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutLanding'
}
</script>

<style scoped>
.custom_tab {
  width: 120px;
  min-height: auto !important;
}
</style>
