<template>
  <section class="hero" id="hero">
    <!-- Background Image -->
    <div class="hero__bg">
      <video
        src="/videos/video1.mp4"
        class="hero__bg-img"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <div class="hero__overlay" />
    </div>

    <!-- Content -->
    <div class="container hero__content">
      <p class="hero__label animate-fade-up">✦ {{ $t('hero.label') }} · {{ $t('hero.saigon') }}</p>

      <h1 class="hero__title animate-fade-up animate-fade-up-delay-1">
        Hotel Amy —<br />
        <em>{{ $t('hero.title_peace') }}</em><br />
        {{ $t('hero.title_city') }}
      </h1>

      <p class="hero__subtitle animate-fade-up animate-fade-up-delay-2">
        {{ $t('hero.subtitle_1') }}<br class="hero__br" />
        {{ $t('hero.subtitle_2') }}
      </p>

      <div class="hero__cta animate-fade-up animate-fade-up-delay-3">
        <a href="#rooms" class="btn btn--primary hero__btn">
          <i class="fi fi-rr-bed"></i> {{ $t('hero.cta_rooms') }}
        </a>
        <a
          :href="contactInfo.zaloLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--outline hero__btn"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 4C13 4 4 12.1 4 22.1c0 5.6 2.9 10.7 7.5 14.1L10 42l6.4-3.3C18.7 39.5 21.3 40 24 40c11 0 20-8.1 20-17.9S35 4 24 4z"/>
          </svg>
          {{ $t('hero.cta_zalo') }}
        </a>
      </div>
    </div>

    <!-- Scroll indicator — outside container so absolute is relative to .hero -->
    <div class="hero__scroll" @click="scrollDown">
      <span>{{ $t('hero.scroll') }}</span>
      <div class="hero__scroll-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>

    <!-- Stats Bar — with counter animation -->
    <div class="hero__stats" ref="statsEl">
      <div class="container">
        <div class="hero__stats-inner">
          <div v-for="stat in stats" :key="stat.label" class="hero__stat">
            <span class="hero__stat-value">
              {{ stat.prefix }}{{ stat.counter.displayValue.value }}{{ stat.suffix }}
            </span>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/hotelData'

const { t } = useI18n()

// ── Counter setup ──────────────────────────────────────────
const rating   = useCountUp(4.9, { duration: 1800, decimals: 1 })
const guests   = useCountUp(1200, { duration: 2200, separator: '.' })
const support  = useCountUp(24,  { duration: 1200 })
const minutes  = useCountUp(2,   { duration: 800  })

const stats = computed(() => [
  { prefix: '', suffix: '★', label: t('hero.stats.rating'),  counter: rating   },
  { prefix: '', suffix: '+', label: t('hero.stats.guests'),  counter: guests   },
  { prefix: '', suffix: '/7', label: t('hero.stats.support'),   counter: support  },
  { prefix: '', suffix: ' phút', label: t('hero.stats.food'),  counter: minutes  },
])

// Trigger counters when stats bar enters viewport
const statsEl = ref<HTMLElement | null>(null)
onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    stats.value.forEach(s => s.counter.start())
    return
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        stats.value.forEach((s, i) => setTimeout(() => s.counter.start(), i * 150))
        observer.disconnect()
      }
    },
    { threshold: 0.5 },
  )
  if (statsEl.value) observer.observe(statsEl.value)
  onUnmounted(() => observer.disconnect())
})

function scrollDown() {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  // ── Background ────────────────────────
  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transform: scale(1.05);
      animation: heroZoom 12s ease-in-out infinite alternate;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(#1a0e08, 0.72) 0%,
      rgba(#2C1A10, 0.55) 50%,
      rgba(#1a0e08, 0.8) 100%
    );
  }

  // ── Content ───────────────────────────
  &__content {
    position: relative;
    z-index: 1;
    padding-top: calc($navbar-height + $spacing-4xl);
    padding-bottom: $spacing-5xl;
    color: $color-white;
    max-width: 760px;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: $color-primary-light;
    margin-bottom: $spacing-md;
    opacity: 0;
  }

  &__title {
    font-family: $font-heading;
    font-size: clamp(36px, 6vw, 68px);
    font-weight: $font-weight-bold;
    line-height: 1.1;
    color: $color-white;
    margin-bottom: $spacing-xl;
    opacity: 0;

    em {
      font-style: italic;
      color: $color-primary-light;
    }
  }

  &__subtitle {
    font-size: clamp($font-size-base, 2vw, $font-size-lg);
    color: rgba($color-white, 0.82);
    line-height: 1.75;
    margin-bottom: $spacing-2xl;
    max-width: 520px;
    opacity: 0;
  }

  &__br {
    display: none;
    @media (min-width: $bp-md) { display: block; }
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    opacity: 0;

    .btn {
      font-size: clamp($font-size-sm, 1.5vw, $font-size-base);
    }
  }

  &__btn {
    svg { flex-shrink: 0; }
  }

  // ── Scroll indicator ──────────────────
  &__scroll {
    display: none;
    position: absolute;
    bottom: $spacing-5xl;
    left: $container-pad;
    color: rgba($color-white, 0.7);
    cursor: pointer;
    font-size: $font-size-xs;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    align-items: center;
    gap: $spacing-sm;
    transition: $transition-base;

    @media (min-width: $bp-md) { display: flex; }

    &:hover {
      color: $color-primary-light;
    }
  }

  &__scroll-arrow {
    animation: float 2s ease-in-out infinite;
    display: flex;
    align-items: center;
  }

  // ── Stats Bar ─────────────────────────
  &__stats {
    position: relative;
    z-index: 2;
    background: transparent;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba($color-white, 0.08);
  }

  &__stats-inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba($color-white, 0.08);

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-lg $spacing-md;
    background: transparent;
    gap: 4px;
  }

  &__stat-value {
    font-family: $font-heading;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-white;
    font-variant-numeric: tabular-nums; // prevent layout shift
    min-width: 4ch;
    text-align: center;

    @media (min-width: $bp-md) {
      font-size: $font-size-2xl;
    }
  }

  &__stat-label {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.65);
    text-align: center;
    letter-spacing: 0.03em;
  }
}

@keyframes heroZoom {
  from { transform: scale(1.05); }
  to   { transform: scale(1.12); }
}
</style>
