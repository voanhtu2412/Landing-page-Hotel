<template>
  <section class="about" id="about">
    <div class="container about__inner">
      <!-- Image Column — slide in from left -->
      <div
        ref="imageRef"
        class="about__image-col reveal-left"
        :class="{ 'reveal-left--visible': imageVisible }"
      >
        <div class="about__image-wrap">
          <img
            src="/images/about-hotel.jpg"
            alt="Không gian chill tại Hotel Amy"
            class="about__img"
            loading="lazy"
          />
          <!-- Floating badge -->
          <div class="about__badge">
            <span class="about__badge-year">{{ $t('about.badge_year') }}</span>
            <span class="about__badge-text">{{ $t('about.badge_text') }}</span>
          </div>
        </div>
        <div class="about__deco" />
      </div>

      <!-- Text Column — slide in from right -->
      <div
        ref="textRef"
        class="about__text-col reveal-right"
        :class="{ 'reveal-right--visible': textVisible }"
      >
        <span class="section-label">{{ $t('about.label') }}</span>
        <h2 class="section-title about__title">{{ $t('about.title') }}</h2>

        <p class="about__para">
          {{ $t('about.para_1') }}
        </p>
        <p class="about__para">
          {{ $t('about.para_2') }}
        </p>

        <!-- Highlights — counter animation -->
        <div
          ref="highlightsRef"
          class="about__highlights"
        >
          <div
            v-for="(item, index) in highlightCounters"
            :key="item.label"
            class="about__highlight reveal-up"
            :class="{ 'reveal-up--visible': highlightsVisible }"
            :style="{ transitionDelay: `${index * 120}ms` }"
          >
            <i :class="['about__highlight-icon', item.icon]"></i>
            <span class="about__highlight-value">
              {{ item.counter.displayValue.value }}{{ item.suffix }}
            </span>
            <span class="about__highlight-label">{{ item.label }}</span>
          </div>
        </div>

        <a
          href="#rooms"
          class="btn btn--primary about__btn reveal-up"
          :class="{ 'reveal-up--visible': highlightsVisible }"
          style="transition-delay: 360ms"
        >
          <i class="fi fi-rr-bed"></i> {{ $t('about.cta_rooms') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// ── Scroll reveal ────────────────────────────────────
const { el: imageRef, isVisible: imageVisible }       = useScrollReveal({ threshold: 0.2 })
const { el: textRef,  isVisible: textVisible }        = useScrollReveal({ threshold: 0.2 })
const { el: highlightsRef, isVisible: highlightsVisible } = useScrollReveal({ threshold: 0.3 })

// ── Counter animations ───────────────────────────────
const ratingCounter  = useCountUp(4.9,  { duration: 1800, decimals: 1 })
const guestsCounter  = useCountUp(1200, { duration: 2200, separator: '.' })
const returnCounter  = useCountUp(98,   { duration: 1600 })

const highlightCounters = computed(() => [
  { icon: 'fi fi-rr-star', suffix: '/5',  label: t('about.highlights[0].label'), counter: ratingCounter  },
  { icon: 'fi fi-rr-building', suffix: '+',   label: t('about.highlights[1].label'),     counter: guestsCounter  },
  { icon: 'fi fi-rr-heart', suffix: '%',   label: t('about.highlights[2].label'), counter: returnCounter  },
])

// Start counters when highlights section is visible
watch(highlightsVisible, (visible) => {
  if (visible) {
    highlightCounters.value.forEach((item, i) => {
      setTimeout(() => item.counter.start(), i * 200)
    })
  }
})
</script>

<style lang="scss" scoped>
// ── Reveal animations (Scoped) ─────────────────────────
.reveal-left {
  opacity: 0;
  transform: translateX(-48px);
  transition: opacity 0.4s ease, transform 0.4s ease;

  &--visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal-right {
  opacity: 0;
  transform: translateX(48px);
  transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;

  &--visible {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// ── Section ───────────────────────────────────────────
.about {
  padding: $spacing-5xl 0;
  background: $color-bg;

  &__inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-3xl;
    align-items: center;

    @media (min-width: $bp-lg) {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-4xl;
    }
  }

  // ── Image Column ──────────────────────
  &__image-col {
    position: relative;
  }

  &__image-wrap {
    position: relative;
    border-radius: $border-radius-lg;
    overflow: hidden;
    aspect-ratio: 4 / 5;
    box-shadow: $shadow-xl;

    @media (min-width: $bp-lg) {
      aspect-ratio: 3 / 4;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;

    &:hover {
      transform: scale(1.04);
    }
  }

  &__badge {
    position: absolute;
    bottom: $spacing-xl;
    left: -$spacing-lg;
    background: $color-primary;
    color: $color-white;
    padding: $spacing-md $spacing-lg;
    border-radius: $border-radius;
    box-shadow: $shadow-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    @media (max-width: #{$bp-lg - 1px}) {
      left: $spacing-md;
    }
  }

  &__badge-year {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: 1;
  }

  &__badge-text {
    font-size: $font-size-xs;
    opacity: 0.85;
    letter-spacing: 0.08em;
  }

  &__deco {
    position: absolute;
    bottom: -$spacing-xl;
    right: -$spacing-xl;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, $color-primary-light, $color-accent-light);
    border-radius: $border-radius-lg;
    opacity: 0.18;
    z-index: -1;

    @media (max-width: #{$bp-lg - 1px}) { display: none; }
  }

  // ── Text Column ───────────────────────
  &__text-col {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__title {
    margin-bottom: $spacing-xl;
  }

  &__para {
    color: $color-text-light;
    line-height: 1.8;
    margin-bottom: $spacing-md;
    font-size: $font-size-base;

    @media (min-width: $bp-md) {
      font-size: $font-size-lg;
    }
  }

  // ── Highlights ────────────────────────
  &__highlights {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-md;
    margin: $spacing-2xl 0;
    padding: $spacing-xl;
    background: $color-bg-section;
    border-radius: $border-radius;
    border: 1px solid $color-border;
  }

  &__highlight {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 4px;
  }

  &__highlight-icon {
    font-size: 22px;
    line-height: 1;
  }

  &__highlight-value {
    font-family: $font-heading;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
    min-width: 3ch;
  }

  &__highlight-label {
    font-size: $font-size-xs;
    color: $color-text-light;
    line-height: 1.3;
  }

  &__btn {
    align-self: flex-start;
  }
}
</style>
