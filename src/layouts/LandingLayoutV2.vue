<!-- eslint-disable max-lines, vue/max-attributes-per-line, vue/singleline-html-element-content-newline -->
<template>
  <q-layout
    view="lHh lpr lff"
    class="landing-v2"
  >
    <!-- ─── Header ─────────────────────────────────────────────────────────── -->
    <q-header :class="['landing-header', { 'landing-header--scrolled': navScrolled }]">
      <q-toolbar class="landing-toolbar">
        <div class="landing-brand">
          <span class="brand-ma">ma</span><span class="brand-voix">voix</span>
        </div>

        <q-space />

        <q-btn flat no-caps class="landing-nav-link" :label="t('nav.who')" @click="scrollTo('who')" />
        <q-btn flat no-caps class="landing-nav-link" :label="t('nav.features')" @click="scrollTo('features')" />
        <q-btn flat no-caps class="landing-nav-link" :label="t('nav.how')" @click="scrollTo('how-it-works')" />

        <q-btn-dropdown
          flat
          no-caps
          dense
          icon="language"
          class="landing-nav-link landing-lang"
          :label="currentLanguage[1]"
          :aria-label="t('langLabel')"
        >
          <q-list>
            <q-item
              v-for="lang in languages"
              :key="lang[0]"
              v-close-popup
              clickable
              :active="lang[0] === locale"
              @click="setLocale(lang[0])"
            >
              <q-item-section avatar class="landing-lang__code">
                {{ lang[1] }}
              </q-item-section>
              <q-item-section>{{ lang[2] }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          no-caps
          unelevated
          class="landing-cta-nav"
          :label="t('nav.start')"
          :to="{ name: 'home' }"
        />
        <account-menu class="landing-account" />
      </q-toolbar>
    </q-header>

    <!-- ─── Page ──────────────────────────────────────────────────────────── -->
    <q-page-container>
      <q-page class="landing-page">
        <!-- Hero ─────────────────────────────────────────────────────────── -->
        <section class="hero-section">
          <div class="hero-copy">
            <div class="hero-pill">
              {{ t('pill') }}
            </div>
            <h1 class="hero-title">
              {{ t('title') }}
            </h1>
            <p class="hero-subtitle">
              {{ t('subtitle') }}
            </p>
            <p class="hero-roles">
              {{ t('heroRoles') }}
            </p>
            <div class="hero-ctas">
              <router-link :to="{ name: 'home' }" class="hero-cta hero-cta--parent">
                <q-icon name="person" size="20px" class="hero-cta__icon" />
                <div class="hero-cta__label">
                  <span class="hero-cta__role">{{ t('forParents') }}</span>
                  <span class="hero-cta__action">
                    {{ t('openPanel') }}
                    <q-icon name="arrow_forward" size="13px" />
                  </span>
                </div>
              </router-link>
              <a
                :href="mavoixAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hero-cta hero-cta--child"
              >
                <q-icon name="child_care" size="20px" class="hero-cta__icon" />
                <div class="hero-cta__label">
                  <span class="hero-cta__role">{{ t('forChildren') }}</span>
                  <span class="hero-cta__action">
                    {{ t('openApp') }}
                    <q-icon name="open_in_new" size="12px" />
                  </span>
                </div>
              </a>
            </div>
            <button class="hero-howto" @click="scrollTo('how-it-works')">
              {{ t('seeHow') }}
            </button>
          </div>
          <div class="hero-visual">
            <div
              class="hero-carousel"
              @mouseenter="pauseSlides"
              @mouseleave="startSlides"
            >
              <img
                v-for="(src, index) in heroSlides"
                :key="src"
                :src="src"
                :alt="t('heroAlt')"
                class="landing-placeholder landing-placeholder--hero hero-carousel__slide"
                :class="{ 'hero-carousel__slide--active': index === slideIndex }"
              >
              <div class="hero-carousel__dots">
                <button
                  v-for="(src, index) in heroSlides"
                  :key="src"
                  type="button"
                  class="hero-carousel__dot"
                  :class="{ 'hero-carousel__dot--active': index === slideIndex }"
                  :aria-label="`${index + 1} / ${heroSlides.length}`"
                  @click="goToSlide(index)"
                />
              </div>
            </div>
          </div>

          <div class="hero-trio">
            <article class="hero-trio__card">
              <h3 class="hero-trio__title hero-trio__title--brand">
                <span class="brand-ma">ma</span><span class="brand-voix">voix</span>
              </h3>
              <p class="hero-trio__body">
                {{ t('aboutPre') }}<a
                  href="https://en.wikipedia.org/wiki/Picture_Exchange_Communication_System"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hero-trio__link"
                >{{ t('aboutLink') }}</a>{{ t('aboutPost') }}
              </p>
            </article>
            <article class="hero-trio__card">
              <h3 class="hero-trio__title">
                {{ t('sharingTitle') }}
              </h3>
              <p class="hero-trio__body">
                {{ t('sharingPre') }}
                <a
                  href="https://github.com/ConnectProject"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hero-trio__link"
                >Connect</a>
                {{ t('sharingPost') }}
              </p>
            </article>
            <article class="hero-trio__card">
              <h3 class="hero-trio__title">
                {{ t('dataTitle') }}
              </h3>
              <p class="hero-trio__body">
                {{ t('dataBody') }}
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
                  {{ t('who.title') }}
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
                    {{ t('who.parentsTitle') }}
                  </div>
                  <div class="lv-card__body">
                    {{ t('who.parentsBody') }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="lv-card">
                <q-card-section class="lv-card__inner">
                  <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                    <q-icon name="support_agent" size="20px" />
                  </div>
                  <div class="lv-card__title">
                    {{ t('who.caregiversTitle') }}
                  </div>
                  <div class="lv-card__body">
                    {{ t('who.caregiversBody') }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat class="lv-card">
                <q-card-section class="lv-card__inner">
                  <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                    <q-icon name="school" size="20px" />
                  </div>
                  <div class="lv-card__title">
                    {{ t('who.educatorsTitle') }}
                  </div>
                  <div class="lv-card__body">
                    {{ t('who.educatorsBody') }}
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
                  {{ t('features.title') }}
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
                  {{ t('features.boardsTitle') }}
                </div>
                <div class="lv-card__body">
                  {{ t('features.boardsBody') }}
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                  <q-icon name="add_photo_alternate" size="20px" />
                </div>
                <div class="lv-card__title">
                  {{ t('features.picturesTitle') }}
                </div>
                <div class="lv-card__body">
                  {{ t('features.picturesBody') }}
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                  <q-icon name="record_voice_over" size="20px" />
                </div>
                <div class="lv-card__title">
                  {{ t('features.speaksTitle') }}
                </div>
                <div class="lv-card__body">
                  {{ t('features.speaksBody') }}
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="lv-card">
              <q-card-section class="lv-card__inner">
                <div class="lv-card__icon-bubble lv-card__icon-bubble--teal">
                  <q-icon name="edit" size="20px" />
                </div>
                <div class="lv-card__title">
                  {{ t('features.organisedTitle') }}
                </div>
                <div class="lv-card__body">
                  {{ t('features.organisedBody') }}
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
                  {{ t('how.title') }}
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
                {{ t('how.step1Title') }}
              </h3>
              <p class="step-text">
                {{ t('how.step1Body') }}
              </p>
            </div>
            <div class="step-connector" aria-hidden="true" />
            <div class="step-item">
              <div class="step-number">
                2
              </div>
              <h3 class="step-heading">
                {{ t('how.step2Title') }}
              </h3>
              <p class="step-text">
                {{ t('how.step2Body') }}
              </p>
            </div>
            <div class="step-connector" aria-hidden="true" />
            <div class="step-item">
              <div class="step-number">
                3
              </div>
              <h3 class="step-heading">
                {{ t('how.step3Title') }}
              </h3>
              <p class="step-text">
                {{ t('how.step3Body') }}
              </p>
            </div>
            <div class="step-connector" aria-hidden="true" />
            <div class="step-item">
              <div class="step-number">
                4
              </div>
              <h3 class="step-heading">
                {{ t('how.step4Title') }}
              </h3>
              <p class="step-text">
                {{ t('how.step4Body') }}
              </p>
              <a
                :href="mavoixAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="step-app-link"
              >
                <q-icon name="child_care" size="14px" />
                {{ t('how.deviceLink') }}
                <q-icon name="open_in_new" size="11px" />
              </a>
            </div>
          </div>
        </section>

        <!-- OSS band ─────────────────────────────────────────────────────── -->
        <section class="oss-band">
          <div class="oss-band__inner text-center">
            <h2 class="oss-title q-mb-md">
              {{ t('oss.title') }}
            </h2>
            <p class="oss-lead q-mb-sm">
              {{ t('oss.lead') }}
            </p>
            <p class="oss-contribute q-mb-lg">
              {{ t('oss.contribute') }}
            </p>
            <q-btn
              no-caps
              outline
              color="white"
              text-color="white"
              icon="fab fa-github"
              :label="t('oss.github')"
              type="a"
              href="https://github.com/ConnectProject"
              target="_blank"
              rel="noopener noreferrer"
              class="oss-btn"
            />

            <div class="oss-band__closing">
              <span class="oss-closing__copy">© {{ year }} mavoix</span>
              <span class="oss-closing__sep" aria-hidden="true">·</span>
              <router-link :to="{ name: 'home' }" class="oss-closing__link">
                {{ t('openPanel') }}
              </router-link>
              <span class="oss-closing__sep" aria-hidden="true">·</span>
              <a
                :href="mavoixAppUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="oss-closing__link"
              >
                {{ t('oss.app') }}
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
import AccountMenu from '~/components/AccountMenu'
import { LANDING_LANGUAGES } from '~/i18n/landing'

const STORAGE_KEY = 'mavoix.landingLocale'

/**
 * Locale to show: saved choice, otherwise the browser/system language, otherwise English.
 * @returns {string} locale key
 */
const detectLocale = () => {
  const known = LANDING_LANGUAGES.map(([locale]) => locale)
  let saved = null

  try {
    saved = window.localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    saved = null
  }
  if (known.includes(saved)) {
    return saved
  }
  const candidates = navigator.languages || [navigator.language]
  for (const language of candidates) {
    const code = String(language).slice(0, 2)
      .toLowerCase()
    const match = known.find((locale) => locale.startsWith(`${code}-`))
    if (match) {
      return match
    }
  }

  return 'en-us'
}

export default {
  name: 'LayoutLandingV2',
  components: { AccountMenu },
  data () {
    return {
      navScrolled: false,
      slideIndex: 0,
      locale: detectLocale(),
      languages: LANDING_LANGUAGES
    }
  },
  computed: {
    currentLanguage () {
      return this.languages.find(([locale]) => locale === this.locale) || this.languages[0]
    },
    mavoixAppUrl () {
      return process.env.MAVOIX_APP_URL || 'https://mavoix.connect-project.io/app/'
    },
    year () {
      return new Date().getFullYear()
    },
    // Public files: use router base so `/file.png` is not requested from domain root on subpath deploys.
    heroSlides () {
      const base = process.env.VUE_ROUTER_BASE || '/'
      const prefix = base.endsWith('/') ? base : `${base}/`

      return ['mavoix-app', 'mavoix-panel-1', 'mavoix-panel-2', 'mavoix-panel-3']
        .map((name) => `${prefix}landing/${name}.png`)
    }
  },
  watch: {
    locale: {
      immediate: true,
      handler (locale) {
        document.documentElement.lang = locale.slice(0, 2)
      }
    }
  },
  mounted () {
    this._onScroll = () => {
      this.navScrolled = window.scrollY > 10
    }
    window.addEventListener('scroll', this._onScroll, { passive: true })
    this.startSlides()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this._onScroll)
    this.pauseSlides()
  },
  methods: {
    startSlides () {
      this.pauseSlides()
      this._slideTimer = setInterval(() => {
        this.slideIndex = (this.slideIndex + 1) % this.heroSlides.length
      }, 5000)
    },
    pauseSlides () {
      clearInterval(this._slideTimer)
    },
    goToSlide (index) {
      this.slideIndex = index
      this.startSlides()
    },
    t (key) {
      return this.$t(`landing.${key}`, this.locale)
    },
    setLocale (locale) {
      this.locale = locale
      try {
        window.localStorage.setItem(STORAGE_KEY, locale)
      } catch (error) {
        // storage unavailable: the choice just is not remembered
      }
    },
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
  font-family: 'Quicksand', 'Nunito', system-ui, sans-serif;
  --lv-gray:          #696969; /* dimgray, same as the panel header */
  --lv-gray-dark:     #555555;
  --lv-gray-deeper:   #3f3f3f;
  --lv-gray-dim:      rgba(105, 105, 105, 0.09);

  --lv-thistle:        #d8bfd8; /* "ma" in the logo */
  --lv-thistle-strong: #c4a2c4;
  --lv-thistle-dim:    rgba(216, 191, 216, 0.22);
  --lv-plum:           #6f4a7c; /* thistle dark enough for text on light backgrounds */

  --lv-sky:         #c3e7f8;
  --lv-sky-dim:     rgba(195, 231, 248, 0.6);

  --lv-surface:     #696969; /* same as the header: one continuous region */
  --lv-text:        #3a3a3a;
  --lv-muted:       #5f5f5f;
  --lv-border:      #e3e6ea;
  --lv-border-soft: #eceef1;

  background: var(--lv-surface);
}

/* ─── Header (same dimgray bar as the panel) ───────────────────────────────── */
.landing-header {
  background: var(--lv-gray);
  color: #fff;
  transition: box-shadow 0.2s ease;
}

.landing-header--scrolled {
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
}

.landing-toolbar {
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
  min-height: 66px;
  padding: 0 24px;
}

/* Wordmark: Quicksand 700, "ma" thistle + "voix" white, as in the panel */
.landing-brand,
.hero-trio__title--brand {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.landing-brand {
  font-size: 2rem;
  line-height: 1;
}

.brand-ma {
  color: var(--lv-thistle);
}

.brand-voix {
  color: #fff;
}

.landing-nav-link {
  color: rgba(255, 255, 255, 0.82) !important;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  transition: color 0.15s ease, background 0.15s ease;
}

.landing-nav-link:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.12);
}

.landing-lang :deep(.q-icon) {
  font-size: 1.15rem;
}

.landing-lang__code {
  font-weight: 700;
  min-width: 36px;
}

.landing-cta-nav {
  background: var(--lv-thistle) !important;
  color: var(--lv-gray-deeper) !important;
  border-radius: 999px;
  padding: 7px 20px;
  margin-left: 8px;
  font-size: 0.9375rem;
  font-weight: 700;
  transition: background 0.15s ease, transform 0.15s ease;
}

.landing-cta-nav:hover {
  background: #fff !important;
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
  padding: 64px 48px 56px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    140deg,
    var(--lv-gray-deeper) 0%,
    var(--lv-gray-dark)   45%,
    var(--lv-gray)        100%
  );
  color: #fff;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -110px;
  right: -90px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, transparent 65%);
  pointer-events: none;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(216, 191, 216, 0.14);
  border: 1px solid rgba(216, 191, 216, 0.4);
  color: var(--lv-thistle);
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(2.1rem, 4.6vw, 3.1rem);
  line-height: 1.12;
  color: #fff;
  font-weight: 700;
  margin: 0 0 18px;
  text-wrap: balance;
}

.hero-roles {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.55;
  color: var(--lv-thistle);
  max-width: 480px;
  margin: -12px 0 28px;
}

.hero-subtitle {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
  max-width: 480px;
  margin: 0 0 28px;
}

/* Three themes below the hero grid */
.hero-trio {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 8px;
  padding-top: 36px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  position: relative;
  z-index: 1;
}

.hero-trio__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
  line-height: 1.25;
}

.hero-trio__body {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.76);
  margin: 0;
}

.hero-trio__link {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
  transition: border-color 0.14s ease;
}

.hero-trio__link:hover {
  border-bottom-color: #fff;
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
  padding: 14px 24px;
  border-radius: 999px;
  text-decoration: none;
  min-width: 190px;
  transition: transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
}

/* Parent CTA: solid dimgray, like the panel header */
.hero-cta--parent {
  background: #fff;
  color: var(--lv-gray-dark);
}

.hero-cta--parent:hover {
  background: #eeeeee;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

/* Child CTA: white, secondary */
.hero-cta--child {
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.hero-cta--child:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px);
}

.hero-cta__icon {
  flex-shrink: 0;
}

.hero-cta__label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-cta__role {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  opacity: 0.75;
  line-height: 1;
}

.hero-cta__action {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hero-howto {
  display: inline-flex;
  align-items: center;
  margin-top: 18px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.14s ease;
}

.hero-howto:hover {
  color: #fff;
}

/* Hero image: straight, no tilt */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-carousel {
  position: relative;
  width: 100%;
  max-width: 440px;
  margin-left: auto;
  aspect-ratio: 2316 / 1914;
}

.landing-placeholder--hero {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.28);
}

.hero-carousel__slide {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.hero-carousel__slide--active {
  opacity: 1;
}

.hero-carousel__dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -28px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.hero-carousel__dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.hero-carousel__dot--active {
  background: #fff;
  transform: scale(1.25);
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
  background: var(--lv-gray-dim);
  color: var(--lv-gray);
}

.section-header__icon--mint {
  background: rgba(105, 105, 105, 0.14);
  color: var(--lv-gray-dark);
}

.section-header__icon--sky {
  background: var(--lv-sky-dim);
  color: #3d6f8a;
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

/* "Who it's for" sits directly on the gray page */
#who .section-title,
#features .section-title {
  color: #fff;
}

#who .section-header__icon--teal,
#features .section-header__icon--mint {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

/* Icon and label on one line in the "Who it's for" and "What you can do" cards */
#who .lv-card__inner,
#features .lv-card__inner {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 14px;
  row-gap: 14px;
}

#who .lv-card__icon-bubble,
#features .lv-card__icon-bubble {
  margin-bottom: 0;
}

#who .lv-card__title,
#features .lv-card__title {
  margin-bottom: 0;
}

#who .lv-card__body,
#features .lv-card__body {
  grid-column: 1 / -1;
}

/* Features section — sits directly on the gray page, like "Who it's for" */
.section-features {
  margin: 0;
  padding-top: 0; /* the previous section's bottom padding already spaces it: half the old gap */
}

/* How it works — mint wash */
.section-how {
  margin: 0;
  padding-top: 0;
}

/* Section sits on the gray page; each step is a white card like the feature cards */
.section-how .section-title {
  color: #fff;
}

.section-how .section-header__icon--sky {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.section-how .step-connector::after {
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.4) 0,
    rgba(255, 255, 255, 0.4) 5px,
    transparent 5px,
    transparent 10px
  );
}

/* ─── Card system ──────────────────────────────────────────────────────────── */
.lv-card {
  background: #fff;
  border: 1px solid var(--lv-border-soft);
  border-radius: 22px;
  height: 100%;
  transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.lv-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(105, 105, 105, 0.1),
              0 2px 8px  rgba(105, 105, 105, 0.05);
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
  background: var(--lv-gray-dim);
  color: var(--lv-gray);
}

.lv-card__icon-bubble--mint {
  background: rgba(105, 105, 105, 0.14);
  color: var(--lv-gray-dark);
}

.lv-card__icon-bubble--sky {
  background: var(--lv-sky-dim);
  color: #3d6f8a;
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
  grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
  align-items: stretch;
}

.step-item {
  text-align: center;
  background: #fff;
  border: 1px solid var(--lv-border-soft);
  border-radius: 22px;
  padding: 28px 24px;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--lv-gray);
  color: var(--lv-gray);
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  box-shadow: 0 2px 10px rgba(105, 105, 105, 0.13);
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
  max-width: 30ch;
}

.step-connector {
  display: flex;
  align-items: center; /* dashed line centered between the cards' top and bottom */
  justify-content: center;
}

.step-connector::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    rgba(105, 105, 105, 0.30) 0,
    rgba(105, 105, 105, 0.30) 5px,
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
  color: var(--lv-gray);
  text-decoration: none;
  border-bottom: 1px solid rgba(105, 105, 105, 0.28);
  padding-bottom: 1px;
  transition: color 0.14s ease, border-color 0.14s ease;
}

.step-app-link:hover {
  color: var(--lv-gray-dark);
  border-bottom-color: var(--lv-gray);
}

/* ─── OSS band ─────────────────────────────────────────────────────────────── */
.oss-band {
  background: linear-gradient(135deg, var(--lv-gray-deeper) 0%, var(--lv-gray-dark) 50%, #7a7a7a 100%);
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
  border: 40px solid rgba(216, 191, 216, 0.08);
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
  border: 28px solid rgba(216, 191, 216, 0.06);
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
    margin: 0 auto;
  }

  .section-block {
    padding: 56px 4px;
  }

  .section-features,
  .section-how {
    padding-top: 0;
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
    gap: 26px;
    padding-top: 32px;
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
