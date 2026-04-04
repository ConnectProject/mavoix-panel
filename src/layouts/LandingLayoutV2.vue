<!-- eslint-disable max-lines, vue/max-attributes-per-line, vue/singleline-html-element-content-newline -->
<template>
  <q-layout
    view="lHh lpr lff"
    class="landing-v2"
  >
    <!-- ─── Header ─────────────────────────────────────────────────────────── -->
    <q-header :class="['landing-header', { 'landing-header--scrolled': navScrolled }]">
      <q-toolbar class="landing-toolbar">
        <div class="landing-brand text-weight-bold">
          MaVoix
        </div>

        <q-space />

        <q-btn flat no-caps class="landing-nav-link" label="Who it's for" @click="scrollTo('who')" />
        <q-btn flat no-caps class="landing-nav-link" label="Features" @click="scrollTo('features')" />
        <q-btn flat no-caps class="landing-nav-link" label="How it works" @click="scrollTo('how-it-works')" />

        <q-btn
          no-caps
          unelevated
          class="landing-cta-nav"
          label="Get started"
          :to="{ name: 'home' }"
        />
      </q-toolbar>
    </q-header>

    <!-- ─── Page ──────────────────────────────────────────────────────────── -->
    <q-page-container>
      <q-page class="landing-page">
        <!-- Hero ─────────────────────────────────────────────────────────── -->
        <section class="hero-section">
          <div class="hero-copy">
            <div class="hero-pill">
              Free &amp; open source · Works with Connect
            </div>
            <h1 class="hero-title">
              Your child's voice, in pictures
            </h1>
            <p class="hero-subtitle">
              Picture boards that let your child point, tap, and be heard — right in your browser.
            </p>
            <div class="hero-ctas">
              <router-link :to="{ name: 'home' }" class="hero-cta hero-cta--parent">
                <q-icon name="person" size="20px" class="hero-cta__icon" />
                <div class="hero-cta__label">
                  <span class="hero-cta__role">For parents</span>
                  <span class="hero-cta__action">
                    Open the panel
                    <q-icon name="arrow_forward" size="13px" />
                  </span>
                </div>
              </router-link>
              <a
                href="https://mavoix.connect-project.io/app/"
                target="_blank"
                rel="noopener noreferrer"
                class="hero-cta hero-cta--child"
              >
                <q-icon name="child_care" size="20px" class="hero-cta__icon" />
                <div class="hero-cta__label">
                  <span class="hero-cta__role">For children</span>
                  <span class="hero-cta__action">
                    Open the app
                    <q-icon name="open_in_new" size="12px" />
                  </span>
                </div>
              </a>
            </div>
            <button class="hero-howto" @click="scrollTo('how-it-works')">
              See how it works ↓
            </button>
          </div>
          <div class="hero-visual">
            <img
              :src="heroBoardImageSrc"
              alt="MaVoix board screenshot"
              class="landing-placeholder landing-placeholder--hero"
              style="object-fit:cover;max-width:100%;height:auto;"
            >
          </div>

          <div class="hero-trio">
            <article class="hero-trio__card">
              <h3 class="hero-trio__title">
                MaVoix
              </h3>
              <p class="hero-trio__body">
                MaVoix is an open source application enabling non-verbal persons to communicate using images.
                Build boards for home, school, or therapy — and let taps speak aloud.
              </p>
            </article>
            <article class="hero-trio__card">
              <h3 class="hero-trio__title">
                Sharing is caring
              </h3>
              <p class="hero-trio__body">
                MaVoix is integrated with
                <a
                  href="https://github.com/ConnectProject"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hero-trio__link"
                >Connect</a>
                — an open database for sharing public, anonymous data among assistive applications.
                Signing in with Connect when you use the panel is optional and helps improve the tool through privacy-aware telemetry.
              </p>
            </article>
            <article class="hero-trio__card">
              <h3 class="hero-trio__title">
                Data for insight
              </h3>
              <p class="hero-trio__body">
                Anonymous, aggregated patterns help researchers and builders see how picture-based communication is used in the real world —
                so assistive tools can grow from evidence, not guesswork, while protecting individual privacy.
              </p>
            </article>
          </div>
        </section>

        <!-- Who it's for ────────────────────────────────────────────────── -->
        <section id="who" class="section-block">
          <div class="section-header">
            <div class="section-header__lead">
              <div class="section-header__icon section-header__icon--teal" aria-hidden="true">
                <q-icon name="groups" size="24px" />
              </div>
              <div class="section-header__text">
                <h2 class="section-title">
                  Who it's for
                </h2>
                <!-- <p class="section-subtitle">
                  Built for everyone who supports a child's communication
                </p> -->
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-card flat class="lv-card">
                <q-card-section class="lv-card__inner">
                  <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                    <q-icon name="favorite" size="20px" />
                  </div>
                  <div class="lv-card__title">
                    Parents
                  </div>
                  <div class="lv-card__body">
                    Give your child a way to tell you what they want, how they feel,
                    and what they need — even before words come.
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="lv-card">
                <q-card-section class="lv-card__inner">
                  <div class="lv-card__icon-bubble lv-card__icon-bubble--mint">
                    <q-icon name="support_agent" size="20px" />
                  </div>
                  <div class="lv-card__title">
                    Caregivers
                  </div>
                  <div class="lv-card__body">
                    Set up boards tailored to daily routines and familiar things,
                    ready whenever you need them.
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="lv-card">
                <q-card-section class="lv-card__inner">
                  <div class="lv-card__icon-bubble lv-card__icon-bubble--sky">
                    <q-icon name="school" size="20px" />
                  </div>
                  <div class="lv-card__title">
                    Educators &amp; therapists
                  </div>
                  <div class="lv-card__body">
                    A flexible tool that supports communication goals in the classroom
                    or therapy room, at whatever pace works best.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </section>

        <!-- Features ────────────────────────────────────────────────────── -->
        <section id="features" class="section-block section-features">
          <div class="section-header">
            <div class="section-header__lead">
              <div class="section-header__icon section-header__icon--mint" aria-hidden="true">
                <q-icon name="auto_awesome" size="24px" />
              </div>
              <div class="section-header__text">
                <h2 class="section-title">
                  What you can do
                </h2>
                <!-- <p class="section-subtitle">
                  Picture boards, symbols, and speech — in one simple flow
                </p> -->
              </div>
            </div>
          </div>
          <div class="features-grid">
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                  <q-icon name="dashboard" size="20px" />
                </div>
                <div class="lv-card__title">
                  Build boards for any moment
                </div>
                <div class="lv-card__body">
                  Create a board for home, school, feelings, or any routine.
                  Boards stay organised as your child's needs grow.
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--mint">
                  <q-icon name="add_photo_alternate" size="20px" />
                </div>
                <div class="lv-card__title">
                  Add pictures
                </div>
                <div class="lv-card__body">
                  Upload photos from your camera roll, search a symbol library,
                  or snap something new right in the app.
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--sky">
                  <q-icon name="record_voice_over" size="20px" />
                </div>
                <div class="lv-card__title">
                  Speaks for them
                </div>
                <div class="lv-card__body">
                  Tap a picture and the app reads the word aloud — giving
                  your child an instant, clear voice.
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                  <q-icon name="edit" size="20px" />
                </div>
                <div class="lv-card__title">
                  Stays organised as they grow
                </div>
                <div class="lv-card__body">
                  Rename, reorder, and reorganise boards at any time —
                  search, filters, and categories keep things clear.
                </div>
              </q-card-section>
            </q-card>
          </div>
        </section>

        <!-- How it works ─────────────────────────────────────────────────── -->
        <section id="how-it-works" class="section-block section-how">
          <div class="section-header">
            <div class="section-header__lead">
              <div class="section-header__icon section-header__icon--sky" aria-hidden="true">
                <q-icon name="route" size="24px" />
              </div>
              <div class="section-header__text">
                <h2 class="section-title">
                  How it works
                </h2>
                <!-- <p class="section-subtitle">
                  Three quick steps from a blank board to your child speaking with taps
                </p> -->
              </div>
            </div>
          </div>
          <div class="steps-row">
            <div class="step-item">
              <div class="step-number">
                1
              </div>
              <h3 class="step-heading">
                Make a board
              </h3>
              <p class="step-text">
                Name it anything — Morning Routine, School, Feelings.
                Takes about ten seconds.
              </p>
            </div>
            <div class="step-connector" aria-hidden="true" />
            <div class="step-item">
              <div class="step-number">
                2
              </div>
              <h3 class="step-heading">
                Add pictures
              </h3>
              <p class="step-text">
                Upload photos from your camera roll, search a symbol library,
                or snap something new right in the app.
              </p>
            </div>
            <div class="step-connector" aria-hidden="true" />
            <div class="step-item">
              <div class="step-number">
                3
              </div>
              <h3 class="step-heading">
                Let them speak
              </h3>
              <p class="step-text">
                Your child taps a picture and the app says the word out loud.
                Simple, immediate, and theirs.
              </p>
              <a
                href="https://mavoix.connect-project.io/app/"
                target="_blank"
                rel="noopener noreferrer"
                class="step-app-link"
              >
                <q-icon name="child_care" size="14px" />
                Open on your child's device
                <q-icon name="open_in_new" size="11px" />
              </a>
            </div>
          </div>
        </section>

        <!-- OSS band ─────────────────────────────────────────────────────── -->
        <section class="oss-band">
          <div class="oss-band__inner text-center">
            <h2 class="oss-title q-mb-md">
              Free and open source, always
            </h2>
            <p class="oss-lead q-mb-sm">
              MaVoix Panel is free to use and open source. We believe every child
              deserves a voice — no subscription, no barriers, no hidden costs.
            </p>
            <p class="oss-contribute q-mb-lg">
              Want to help? Code, translations, and feedback are always welcome.
            </p>
            <q-btn
              no-caps
              outline
              color="white"
              text-color="white"
              icon="fab fa-github"
              label="View on GitHub"
              type="a"
              href="https://github.com/ConnectProject"
              target="_blank"
              rel="noopener noreferrer"
              class="oss-btn"
            />

            <p class="oss-pecs-foot">
              Learn about picture exchange:
              <a
                href="https://en.wikipedia.org/wiki/Picture_Exchange_Communication_System"
                target="_blank"
                rel="noopener noreferrer"
                class="oss-pecs-foot__link"
              >PECS on Wikipedia</a>.
            </p>

            <div class="oss-band__closing">
              <span class="oss-closing__copy">© {{ year }} MaVoix Panel</span>
              <span class="oss-closing__sep" aria-hidden="true">·</span>
              <router-link :to="{ name: 'home' }" class="oss-closing__link">
                Open the panel
              </router-link>
              <span class="oss-closing__sep" aria-hidden="true">·</span>
              <a
                href="https://mavoix.connect-project.io/app/"
                target="_blank"
                rel="noopener noreferrer"
                class="oss-closing__link"
              >
                MaVoix app
                <q-icon name="open_in_new" size="12px" class="oss-closing__ext" />
              </a>
            </div>
          </div>
        </section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
/* eslint-disable max-lines */
export default {
  name: 'LayoutLandingV2',
  data () {
    return {
      navScrolled: false
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    // Public files: use router base so `/file.png` is not requested from domain root on subpath deploys.
    heroBoardImageSrc () {
      const base = process.env.VUE_ROUTER_BASE || '/'
      const prefix = base.endsWith('/') ? base : `${base}/`

      return `${prefix}my_day_tab_kids.png`
    }
  },
  mounted () {
    this._onScroll = () => {
      this.navScrolled = window.scrollY > 10
    }
    window.addEventListener('scroll', this._onScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this._onScroll)
  },
  methods: {
    scrollTo (id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
/* ─── Design tokens ────────────────────────────────────────────────────────── */
.landing-v2 {
  --lv-teal:        #0d6b6e;
  --lv-teal-dark:   #095a5d;
  --lv-teal-deeper: #074748;
  --lv-teal-dim:    rgba(13, 107, 110, 0.09);

  --lv-mint:        #c8ebe0;
  --lv-mint-strong: #9dd9c8;
  --lv-mint-dim:    rgba(200, 235, 224, 0.38);

  --lv-sky:         #d4e8f2;
  --lv-sky-dim:     rgba(212, 232, 242, 0.55);

  --lv-surface:     #f7f9fb;
  --lv-text:        #2c3544;
  --lv-muted:       #5c6474;
  --lv-border:      #e4e9f0;
  --lv-border-soft: #edf1f7;

  background: var(--lv-surface);
}

/* ─── Header ───────────────────────────────────────────────────────────────── */
.landing-header {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.landing-header--scrolled {
  border-bottom-color: var(--lv-border);
  box-shadow: 0 2px 16px rgba(44, 53, 68, 0.07);
}

.landing-toolbar {
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  min-height: 64px;
  padding: 0 24px;
}

.landing-brand {
  font-size: 1.125rem;
  color: var(--lv-teal);
  letter-spacing: -0.03em;
  font-weight: 700;
}

.landing-nav-link {
  color: var(--lv-muted) !important;
  font-size: 0.875rem;
  padding: 6px 10px;
  transition: color 0.15s ease;
}

.landing-nav-link:hover {
  color: var(--lv-text) !important;
}

/* Nav CTA */
.landing-cta-nav {
  background: var(--lv-teal) !important;
  color: #fff !important;
  border-radius: 10px;
  padding: 7px 18px;
  margin-left: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.15s ease, transform 0.15s ease;
}

.landing-cta-nav:hover {
  background: var(--lv-teal-dark) !important;
  transform: translateY(-1px);
}

/* ─── Landing page container ───────────────────────────────────────────────── */
.landing-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 16px 56px;
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 72px 48px 80px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    140deg,
    var(--lv-teal-deeper) 0%,
    var(--lv-teal-dark)   45%,
    var(--lv-teal)        100%
  );
}

/* Decorative glow in top-right */
.hero-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -80px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 235, 224, 0.16) 0%, transparent 65%);
  pointer-events: none;
}

/* Decorative ring bottom-left */
.hero-section::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 36px solid rgba(200, 235, 224, 0.07);
  pointer-events: none;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(200, 235, 224, 0.15);
  border: 1px solid rgba(200, 235, 224, 0.35);
  color: var(--lv-mint);
  font-size: 0.78125rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  border-radius: 999px;
  padding: 5px 14px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(2rem, 4.5vw, 2.875rem);
  line-height: 1.17;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0 0 18px;
}

.hero-subtitle {
  font-size: 1.0625rem;
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.78);
  max-width: 480px;
  margin: 0 0 28px;
}

/* Three themes — original landing structure, below hero grid */
.hero-trio {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 8px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  position: relative;
  z-index: 1;
}

.hero-trio__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.hero-trio__body {
  font-size: 0.8125rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
}

.hero-trio__link {
  color: rgba(255, 255, 255, 0.96);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  transition: color 0.14s ease, border-color 0.14s ease;
}

.hero-trio__link:hover {
  color: #fff;
  border-bottom-color: rgba(255, 255, 255, 0.65);
}

/* Hero audience CTAs */
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-radius: 14px;
  text-decoration: none;
  min-width: 190px;
  transition: transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease, border-color 0.16s ease;
}

/* Parent CTA — white solid, primary */
.hero-cta--parent {
  background: #ffffff;
  color: var(--lv-teal-dark);
}

.hero-cta--parent:hover {
  background: var(--lv-mint);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}

/* Child CTA — glass/ghost, secondary */
.hero-cta--child {
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  color: rgba(255, 255, 255, 0.92);
}

.hero-cta--child:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.55);
  transform: translateY(-2px);
}

.hero-cta__icon {
  flex-shrink: 0;
  opacity: 0.8;
}

.hero-cta__label {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero-cta__role {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  opacity: 0.6;
  line-height: 1;
}

.hero-cta__action {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* "See how it works" text trigger */
.hero-howto {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 18px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.50);
  letter-spacing: 0.01em;
  transition: color 0.14s ease;
}

.hero-howto:hover {
  color: rgba(255, 255, 255, 0.80);
}

/* Hero visual / placeholders */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.landing-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 16px;
  color: rgba(200, 235, 224, 0.7);
}

.landing-placeholder__icon {
  opacity: 0.5;
  color: var(--lv-mint);
}

.landing-placeholder__label {
  font-size: 0.8125rem;
  line-height: 1.4;
  max-width: 220px;
  margin-top: 12px;
}

.landing-placeholder--hero {
  min-height: 300px;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  transform: rotate(-2deg);
  border: 2px dashed rgba(200, 235, 224, 0.30);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.22);
}

/* ─── Section foundations ──────────────────────────────────────────────────── */
.section-block {
  padding: 72px 8px;
  scroll-margin-top: 72px;
}

.section-header {
  margin-bottom: 40px;
}

.section-header__lead {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.section-header__icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-header__icon--teal {
  background: var(--lv-teal-dim);
  color: var(--lv-teal);
}

.section-header__icon--mint {
  background: rgba(200, 235, 224, 0.55);
  color: var(--lv-teal-dark);
}

.section-header__icon--sky {
  background: var(--lv-sky-dim);
  color: #1a6e8a;
}

.section-header__text {
  min-width: 0;
  padding-top: 2px;
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--lv-text);
  letter-spacing: -0.018em;
  margin: 0;
}

.section-subtitle {
  margin: 10px 0 0;
  font-size: 1rem;
  line-height: 1.58;
  color: var(--lv-muted);
  max-width: 36rem;
}

/* Features section — white background to contrast with surrounding surface */
.section-features {
  background: #fff;
  border-radius: 20px;
  padding-left: 40px;
  padding-right: 40px;
  margin: 8px 0;
}

/* How it works — mint wash */
.section-how {
  background: var(--lv-mint-dim);
  border-radius: 20px;
  padding-left: 40px;
  padding-right: 40px;
  margin: 8px 0;
}

/* ─── Card system ──────────────────────────────────────────────────────────── */
.lv-card {
  background: #fff;
  border: 1px solid var(--lv-border-soft);
  border-radius: 16px;
  height: 100%;
  transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.lv-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(13, 107, 110, 0.1),
              0 2px 8px  rgba(13, 107, 110, 0.05);
}

.lv-card__inner {
  padding: 28px;
}

.lv-card__icon-bubble {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.lv-card__icon-bubble--teal {
  background: var(--lv-teal-dim);
  color: var(--lv-teal);
}

.lv-card__icon-bubble--mint {
  background: rgba(200, 235, 224, 0.55);
  color: var(--lv-teal-dark);
}

.lv-card__icon-bubble--sky {
  background: var(--lv-sky-dim);
  color: #1a6e8a;
}

.lv-card__title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--lv-text);
  margin-bottom: 8px;
  line-height: 1.3;
}

.lv-card__body {
  font-size: 0.9375rem;
  line-height: 1.62;
  color: var(--lv-muted);
  max-width: 38ch;
}

/* ─── Features 2×2 grid ────────────────────────────────────────────────────── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

/* ─── Steps ────────────────────────────────────────────────────────────────── */
.steps-row {
  display: grid;
  grid-template-columns: 1fr 48px 1fr 48px 1fr;
  align-items: start;
}

.step-item {
  text-align: center;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--lv-teal);
  color: var(--lv-teal);
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  box-shadow: 0 2px 10px rgba(13, 107, 110, 0.13);
}

.step-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--lv-text);
  margin: 0 0 8px;
}

.step-text {
  font-size: 0.9375rem;
  line-height: 1.58;
  color: var(--lv-muted);
  margin: 0 auto;
  max-width: 26ch;
}

.step-connector {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 22px; /* aligns with center of the 48px step circle */
}

.step-connector::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    rgba(13, 107, 110, 0.30) 0,
    rgba(13, 107, 110, 0.30) 5px,
    transparent 5px,
    transparent 10px
  );
}

/* Child app link inside step 3 */
.step-app-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--lv-teal);
  text-decoration: none;
  border-bottom: 1px solid rgba(13, 107, 110, 0.28);
  padding-bottom: 1px;
  transition: color 0.14s ease, border-color 0.14s ease;
}

.step-app-link:hover {
  color: var(--lv-teal-dark);
  border-bottom-color: var(--lv-teal);
}

/* ─── OSS band ─────────────────────────────────────────────────────────────── */
.oss-band {
  background: linear-gradient(135deg, var(--lv-teal-deeper) 0%, var(--lv-teal-dark) 50%, #0a7f83 100%);
  color: #fff;
  border-radius: 20px;
  margin: 16px 0 0;
  padding: 72px 48px 48px;
  position: relative;
  overflow: hidden;
}

/* Decorative rings */
.oss-band::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -60px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 40px solid rgba(200, 235, 224, 0.08);
  pointer-events: none;
}

.oss-band::after {
  content: '';
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 28px solid rgba(200, 235, 224, 0.06);
  pointer-events: none;
}

.oss-band__inner {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.oss-title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.oss-lead {
  font-size: 1rem;
  line-height: 1.68;
  opacity: 0.9;
}

.oss-contribute {
  font-size: 0.9rem;
  opacity: 0.65;
  line-height: 1.5;
}

.oss-btn {
  border-width: 1.5px !important;
  font-weight: 500;
  padding: 10px 22px;
  border-radius: 10px;
  transition: background 0.15s ease, transform 0.15s ease;
}

.oss-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-1px);
}

.oss-pecs-foot {
  margin: 24px 0 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.52);
}

.oss-pecs-foot__link {
  color: rgba(255, 255, 255, 0.88);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  padding-bottom: 1px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.oss-pecs-foot__link:hover {
  color: #fff;
  border-bottom-color: rgba(255, 255, 255, 0.55);
}

/* Closing strip: copyright + nav links (replaces separate footer — GitHub stays above) */
.oss-band__closing {
  margin-top: 20px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 14px;
  font-size: 0.8125rem;
  line-height: 1.5;
}

.oss-closing__copy {
  color: rgba(255, 255, 255, 0.5);
}

.oss-closing__sep {
  color: rgba(255, 255, 255, 0.22);
  user-select: none;
}

.oss-closing__link {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  padding-bottom: 1px;
  transition: color 0.15s ease, border-color 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.oss-closing__link:hover {
  color: #fff;
  border-bottom-color: rgba(255, 255, 255, 0.65);
}

.oss-closing__ext {
  opacity: 0.75;
}

/* ─── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-trio {
    grid-template-columns: 1fr;
    gap: 26px;
    padding-top: 32px;
  }
}

@media (max-width: 960px) {
  .steps-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .step-connector {
    display: none;
  }

  .step-text {
    max-width: none;
  }
}

@media (max-width: 720px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .landing-page {
    padding: 8px 8px 48px;
  }

  .hero-section {
    grid-template-columns: 1fr;
    padding: 48px 28px 56px;
    border-radius: 16px;
  }

  .hero-subtitle {
    max-width: none;
  }

  .landing-placeholder--hero {
    transform: none;
    margin: 0 auto;
  }

  .section-block {
    padding: 56px 4px;
  }

  .section-features,
  .section-how {
    padding-left: 20px;
    padding-right: 20px;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .hero-cta {
    min-width: 0;
    width: 100%;
  }

  .oss-band {
    padding: 56px 28px 40px;
    border-radius: 16px;
  }

  .section-header__lead {
    gap: 16px;
  }

  .section-header__icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .oss-band__closing {
    flex-direction: column;
    gap: 12px;
  }

  .oss-closing__sep {
    display: none;
  }
}

@media (max-width: 480px) {
  .landing-toolbar {
    padding: 0 12px;
  }

  .landing-nav-link {
    display: none;
  }
}
</style>
