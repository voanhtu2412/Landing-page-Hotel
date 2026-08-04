<template>
  <section class="rooms" id="rooms">
    <div class="container">

      <!-- Section header — fade up -->
      <div
        ref="headerRef"
        class="section-center reveal-up"
        :class="{ 'reveal-up--visible': headerVisible }"
      >
        <span class="section-label">{{ $t('rooms.label') }}</span>
        <h2 class="section-title">{{ $t('rooms.title') }}</h2>
        <p class="section-subtitle">
          {{ $t('rooms.subtitle') }}
        </p>
      </div>

      <!-- Room cards — stagger reveal -->
      <div ref="gridRef" class="rooms__grid">
        <div
          v-for="(room, index) in rooms"
          :key="room.id"
          class="rooms__card-wrap reveal-up"
          :class="{ 'reveal-up--visible': cardVisible[index] }"
          :style="{ transitionDelay: `${index * 130}ms` }"
          :data-stagger-index="index"
        >
          <RoomCard :room="room" :index="index" />
        </div>
      </div>

      <!-- Bottom CTA — fade up -->
      <div
        ref="ctaRef"
        class="rooms__bottom-cta reveal-up"
        :class="{ 'reveal-up--visible': ctaVisible }"
      >
        <p class="rooms__note">
          {{ $t('rooms.cta_note') }}
        </p>
        <a
          :href="contactInfo.zaloLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--primary"
        >
          {{ $t('rooms.cta_btn') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo, rooms } from '~/data/hotelData'

// ── Scroll reveal ────────────────────────────────────
const { el: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })
const { el: ctaRef,    isVisible: ctaVisible    } = useScrollReveal({ threshold: 0.3 })

// Stagger for cards
const gridRef   = ref<HTMLElement | null>(null)
// Note: rooms list is fetched from hotelData.ts, length is static 3
const cardVisible = ref<boolean[]>(rooms.map(() => false))

onMounted(() => {
  if (!gridRef.value || typeof IntersectionObserver === 'undefined') {
    cardVisible.value = [true, true, true]
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const i = Number((entry.target as HTMLElement).dataset.staggerIndex)
          if (!isNaN(i)) {
            setTimeout(() => { cardVisible.value[i] = true }, i * 60)
          }
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  gridRef.value.querySelectorAll('[data-stagger-index]').forEach(el => observer.observe(el))
  onUnmounted(() => observer.disconnect())
})
</script>

<style lang="scss" scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.4s ease, transform 0.4s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.rooms {
  padding: $spacing-5xl 0;
  background: $color-bg-section;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $bp-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card-wrap {
    display: flex;
    flex-direction: column;
    height: 100%; // Fill grid cell so all cards are equal height
  }

  &__bottom-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-lg;
    margin-top: $spacing-3xl;
    padding: $spacing-2xl;
    background: $color-surface;
    border-radius: $border-radius-lg;
    border: 1px dashed $color-primary-light;
  }

  &__note {
    font-size: $font-size-base;
    color: $color-text-light;
    text-align: center;
  }
}
</style>
