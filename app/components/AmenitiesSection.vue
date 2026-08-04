<template>
  <section class="amenities" id="amenities">
    <div class="container">

      <!-- Section Header -->
      <div
        ref="headerRef"
        class="section-center reveal-up"
        :class="{ 'reveal-up--visible': headerVisible }"
      >
        <span class="section-label">{{ $t('amenities.label') }}</span>
        <h2 class="section-title">{{ $t('amenities.title') }}</h2>
        <p class="section-subtitle">
          {{ $t('amenities.subtitle') }}
        </p>
      </div>

      <!-- Amenities Grid — stagger reveal -->
      <div ref="amenitiesGridRef" class="amenities__grid">
        <div
          v-for="(amenity, index) in amenities"
          :key="amenity.id"
          class="reveal-up"
          :class="{ 'reveal-up--visible': amenityVisible[index] }"
          :style="{ transitionDelay: `${index * 80}ms` }"
          :data-stagger-index="index"
        >
          <div class="amenities__item">
            <div class="amenities__icon-box">
              <i :class="['amenities__icon', amenity.icon]"></i>
            </div>
            <h3 class="amenities__title">{{ $t(`amenities.list.${index}.title`) }}</h3>
            <p class="amenities__desc">{{ $t(`amenities.list.${index}.description`) }}</p>
          </div>
        </div>
      </div>

      <!-- Nearby Places Section (Asymmetric Layout) -->
      <div class="nearby">
        <!-- Left Column: Sticky Header -->
        <div
          ref="nearbyHeaderRef"
          class="nearby__header reveal-up"
          :class="{ 'reveal-up--visible': nearbyHeaderVisible }"
        >
          <span class="section-label">{{ $t('nearby.label') }}</span>
          <h2 class="section-title">{{ $t('nearby.title') }}</h2>
          <p class="section-subtitle">
            {{ $t('nearby.subtitle') }}
          </p>
        </div>

        <!-- Right Column: List -->
        <div ref="nearbyGridRef" class="nearby__grid">
          <div
            v-for="(place, index) in nearbyPlaces"
            :key="place.id"
            class="reveal-up"
            :class="{ 'reveal-up--visible': placeVisible[index] }"
            :style="{ transitionDelay: `${index * 80}ms` }"
            :data-stagger-index="index"
          >
            <div class="nearby__place">
              <div class="nearby__place-icon-box">
                <i :class="['nearby__place-icon', place.icon]"></i>
              </div>
              <div class="nearby__place-info">
                <span class="nearby__place-name">{{ $t(`nearby.list.${index}.name`) }}</span>
                <span class="nearby__place-distance">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ $t(`nearby.list.${index}.distance`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { amenities, nearbyPlaces } from '~/data/hotelData'

// ── Scroll reveal ────────────────────────────────────
const { el: headerRef,  isVisible: headerVisible  } = useScrollReveal({ threshold: 0.2 })
const { el: nearbyHeaderRef, isVisible: nearbyHeaderVisible } = useScrollReveal({ threshold: 0.3 })

// Stagger for amenity cards
const amenitiesGridRef  = ref<HTMLElement | null>(null)
const amenityVisible    = ref<boolean[]>(amenities.map(() => false))

const nearbyGridRef     = ref<HTMLElement | null>(null)
const placeVisible      = ref<boolean[]>(nearbyPlaces.map(() => false))

function makeStaggerObserver(
  containerRef: Ref<HTMLElement | null>,
  visibleArr: Ref<boolean[]>,
  stagger = 80,
) {
  onMounted(() => {
    if (!containerRef.value || typeof IntersectionObserver === 'undefined') {
      visibleArr.value = visibleArr.value.map(() => true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.staggerIndex)
            if (!isNaN(i)) setTimeout(() => { visibleArr.value[i] = true }, i * stagger)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    )
    containerRef.value.querySelectorAll('[data-stagger-index]').forEach(el => observer.observe(el))
    onUnmounted(() => observer.disconnect())
  })
}

makeStaggerObserver(amenitiesGridRef, amenityVisible, 40)
makeStaggerObserver(nearbyGridRef, placeVisible, 50)
</script>

<style lang="scss" scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.amenities {
  padding: $spacing-5xl 0;
  background: $color-bg;

  // ── Amenities Grid ────────────────────
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-5xl;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: $spacing-2xl $spacing-lg;
    background: $color-surface;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-sm;
    transition: $transition-slow;
    gap: $spacing-md;
    height: 100%;

    &:hover {
      box-shadow: $shadow-lg;
      transform: translateY(-8px) !important;

      .amenities__icon-box {
        background: $color-primary;
        transform: scale(1.05);
      }

      .amenities__icon {
        color: $color-white;
      }
    }
  }

  &__icon-box {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba($color-primary, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $transition-base;
    margin-bottom: $spacing-xs;
  }

  &__icon {
    font-size: 32px;
    line-height: 1;
    color: $color-primary;
    transition: $transition-base;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: $color-text;
    line-height: 1.3;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-text-muted;
    line-height: 1.5;
  }
}

// ── Nearby Places Asymmetric Layout ────────
.nearby {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2xl;
  padding: $spacing-3xl;
  background: $color-bg-section;
  border-radius: $border-radius-lg;

  @media (min-width: $bp-lg) {
    grid-template-columns: 4fr 6fr;
    gap: $spacing-4xl;
    padding: $spacing-4xl;
  }

  &__header {
    text-align: left;
    
    @media (min-width: $bp-lg) {
      position: sticky;
      top: 100px;
      height: fit-content;
    }

    .section-label {
      margin-left: 0;
      margin-bottom: $spacing-sm;
    }

    .section-title {
      font-size: $font-size-3xl;
      margin-bottom: $spacing-md;
    }

    .section-subtitle {
      margin-left: 0;
      margin-right: 0;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__place {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-lg;
    background: $color-surface;
    border-radius: $border-radius;
    box-shadow: $shadow-sm;
    transition: $transition-base;
    height: 100%;

    &:hover {
      box-shadow: $shadow-md;
      transform: translateX(4px);
      border-color: transparent;

      .nearby__place-icon-box {
        background: $color-accent;
      }
      .nearby__place-icon {
        color: $color-white;
      }
    }
  }

  &__place-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba($color-accent, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: $transition-base;
  }

  &__place-icon {
    font-size: 24px;
    line-height: 1;
    color: $color-accent;
    transition: $transition-base;
  }

  &__place-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  &__place-name {
    font-weight: $font-weight-bold;
    font-size: $font-size-base;
    color: $color-text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__place-distance {
    font-size: $font-size-xs;
    color: $color-accent;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: $font-weight-semibold;

    svg { flex-shrink: 0; }
  }
}
</style>
