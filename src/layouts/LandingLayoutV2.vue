<!-- eslint-disable max-lines, vue/max-attributes-per-line, vue/singleline-html-element-content-newline -->
<template>
  <q-layout
    view="lHh lpr lFf"
    class="landing-v2"
  >
    <!-- ─── Header ─────────────────────────────────────────────────────────── -->
    <q-header :class="['landing-header', { 'landing-header--scrolled': navScrolled }]">
      <q-toolbar class="landing-toolbar">
        <div class="landing-brand text-weight-bold">
          MaVoix Panel
        </div>

        <q-space />

        <q-btn flat no-caps class="landing-nav-link" label="Who it's for" @click="scrollTo('who')" />
        <q-btn flat no-caps class="landing-nav-link" label="Features" @click="scrollTo('features')" />
        <q-btn flat no-caps class="landing-nav-link" label="How it works" @click="scrollTo('how-it-works')" />

        <!-- App switcher -->
        <div class="app-switcher" role="group" aria-label="Choose app">
          <router-link :to="{ name: 'home' }" class="app-switcher__btn app-switcher__btn--active">
            MaVoix Panel
          </router-link>
          <a
            href="https://mavoix.connect-project.io/app/"
            target="_blank"
            rel="noopener noreferrer"
            class="app-switcher__btn"
          >
            MaVoix App
            <q-icon name="open_in_new" size="11px" class="app-switcher__ext-icon" />
          </a>
        </div>
      </q-toolbar>
    </q-header>

    <!-- ─── Page ──────────────────────────────────────────────────────────── -->
    <q-page-container>
      <q-page class="landing-page">
        <!-- Hero ─────────────────────────────────────────────────────────── -->
        <section class="hero-section">
          <div class="hero-copy">
            <div class="hero-pill">
              Free &amp; open source · No account needed
            </div>
            <h1 class="hero-title">
              Your child's voice, in pictures
            </h1>
            <p class="hero-subtitle">
              Picture boards that let your child point, tap, and be heard —
              works right in your browser, no experience needed.
            </p>
            <div class="row items-center q-gutter-sm">
              <q-btn
                no-caps
                unelevated
                class="landing-btn-primary"
                label="Open the app"
                :to="{ name: 'home' }"
              />
              <q-btn
                no-caps
                class="landing-btn-secondary"
                label="See how it works"
                @click="scrollTo('how-it-works')"
              />
            </div>
            <p class="hero-trust">
              Works in any browser · Free · No sign-up
            </p>
          </div>
          <div class="hero-visual">
            <img
              src="/my_day_tab.png"
              alt="MaVoix board screenshot"
              class="landing-placeholder landing-placeholder--hero"
              style="object-fit:cover;max-width:100%;height:auto;"
            >
          </div>
        </section>

        <!-- Who it's for ────────────────────────────────────────────────── -->
        <section id="who" class="section-block">
          <div class="section-header">
            <h2 class="section-title">
              Who it's for
            </h2>
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
            <h2 class="section-title">
              What you can do
            </h2>
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
            <h2 class="section-title">
              How it works
            </h2>
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
          </div>
        </section>
      </q-page>
    </q-page-container>

    <!-- ─── Footer ───────────────────────────────────────────────────────── -->
    <q-footer class="landing-footer">
      <div class="footer-inner row items-center justify-between q-py-md">
        <div class="footer-left">
          <div class="text-weight-bold footer-brand">
            MaVoix Panel
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">
            © {{ year }} MaVoix Panel
          </div>
        </div>
        <div class="footer-links row items-center q-gutter-md">
          <a
            href="https://github.com/ConnectProject"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            GitHub
          </a>
          <span class="footer-dot">·</span>
          <a
            href="https://mavoix.connect-project.io/app/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            MaVoix App
          </a>
        </div>
      </div>
    </q-footer>
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

/* App switcher */
.app-switcher {
  display: inline-flex;
  align-items: center;
  background: var(--lv-surface);
  border: 1px solid var(--lv-border);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
  margin: 0 12px;
}

.app-switcher__btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--lv-muted);
  background: transparent;
  border: none;
  border-radius: 7px;
  padding: 5px 12px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  line-height: 1;
  transition: background 0.14s ease, color 0.14s ease;
}

.app-switcher__btn:hover {
  background: #fff;
  color: var(--lv-text);
}

.app-switcher__btn--active {
  background: #fff;
  color: var(--lv-teal);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.app-switcher__ext-icon {
  opacity: 0.5;
  position: relative;
  top: -1px;
}

/* ─── Landing page container ───────────────────────────────────────────────── */
.landing-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 16px 0;
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

.hero-trust {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.48);
  margin: 14px 0 0;
  letter-spacing: 0.02em;
}

/* Hero buttons — styled for dark background */
.landing-btn-primary {
  background: #ffffff !important;
  color: var(--lv-teal-dark) !important;
  border-radius: 10px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.landing-btn-primary:hover {
  background: var(--lv-mint) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.landing-btn-secondary {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.38) !important;
  color: rgba(255, 255, 255, 0.88) !important;
  border-radius: 10px;
  padding: 10px 24px;
  font-size: 0.9375rem;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.landing-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.14) !important;
  border-color: rgba(255, 255, 255, 0.65) !important;
  transform: translateY(-1px);
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
  margin-bottom: 36px;
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--lv-text);
  letter-spacing: -0.018em;
  margin: 0;
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

/* ─── OSS band ─────────────────────────────────────────────────────────────── */
.oss-band {
  background: linear-gradient(135deg, var(--lv-teal-deeper) 0%, var(--lv-teal-dark) 50%, #0a7f83 100%);
  color: #fff;
  border-radius: 20px;
  margin: 8px 0 0;
  padding: 72px 48px;
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

/* ─── Footer ───────────────────────────────────────────────────────────────── */
.landing-footer {
  background: #fff;
  border-top: 1px solid var(--lv-border);
  color: var(--lv-text);
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-brand {
  font-size: 0.9375rem;
  color: var(--lv-text);
}

.footer-link {
  color: var(--lv-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.14s ease;
}

.footer-link:hover {
  color: var(--lv-teal);
}

.footer-dot {
  color: var(--lv-border);
}

/* ─── Responsive ───────────────────────────────────────────────────────────── */
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
    padding: 8px 8px 0;
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

  .oss-band {
    padding: 56px 28px;
    border-radius: 16px;
  }

  .app-switcher {
    display: none;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
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
