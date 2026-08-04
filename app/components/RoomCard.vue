<template>
  <article class="room-card" :class="{ 'room-card--highlight': room.highlight }">
    <!-- Badge -->
    <div v-if="room.highlight" class="room-card__badge">
      ✨ {{ $t(`rooms.list.${index}.highlight`) }}
    </div>

    <!-- Image -->
    <div class="room-card__image-wrap">
      <img
        :src="room.image"
        :alt="room.name"
        class="room-card__img"
        loading="lazy"
      />
      <div class="room-card__image-overlay" />
    </div>

    <!-- Body -->
    <div class="room-card__body">
      <h3 class="room-card__name">{{ $t(`rooms.list.${index}.name`) }}</h3>
      <p class="room-card__desc">{{ $t(`rooms.list.${index}.description`) }}</p>

      <!-- Amenities -->
      <ul class="room-card__amenities">
        <li
          v-for="(amenity, aIndex) in room.amenities"
          :key="amenity.label"
          class="room-card__amenity"
        >
          <i :class="['room-card__amenity-icon', amenity.icon]"></i>
          <span class="room-card__amenity-label">{{ $t(`rooms.list.${index}.amenities.${aIndex}.label`) }}</span>
        </li>
      </ul>

      <!-- Divider -->
      <div class="room-card__divider" />

      <!-- Price & CTA -->
      <div class="room-card__footer">
        <div class="room-card__price">
          <span class="room-card__price-from">{{ $t('room_card.price_from') }}</span>
          <div class="room-card__price-main">
            <span class="room-card__price-value">{{ room.priceFrom }}</span>
            <span class="room-card__price-unit">{{ $t('room_card.price_unit') }}</span>
          </div>
        </div>
        <a
          :href="room.zaloLink"
          target="_blank"
          rel="noopener noreferrer"
          class="room-card__cta btn btn--accent btn--sm"
        >
          <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 4C13 4 4 12.1 4 22.1c0 5.6 2.9 10.7 7.5 14.1L10 42l6.4-3.3C18.7 39.5 21.3 40 24 40c11 0 20-8.1 20-17.9S35 4 24 4z"/>
          </svg>
          {{ $t('room_card.book_now') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Room } from '~/data/hotelData'

defineProps<{ room: Room, index: number }>()
</script>

<style lang="scss" scoped>
.room-card {
  background: $color-surface;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border;
  transition: $transition-base;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%; // Equal height within grid

  &:hover {
    transform: translateY(-8px);
    box-shadow: $shadow-xl;
    border-color: $color-primary-light;
  }

  // Highlighted (popular) card
  &--highlight {
    border-color: $color-primary;
    box-shadow: $shadow-md, 0 0 0 2px rgba($color-primary, 0.15);

    &:hover {
      box-shadow: $shadow-xl, 0 0 0 3px rgba($color-primary, 0.25);
    }
  }

  // ── Badge ─────────────────────────────
  &__badge {
    position: absolute;
    top: $spacing-md;
    left: $spacing-md;
    z-index: 10;
    background: $color-primary;
    color: $color-white;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    padding: 5px 12px;
    border-radius: $border-radius-full;
    letter-spacing: 0.04em;
    box-shadow: $shadow-sm;
  }

  // ── Image ─────────────────────────────
  &__image-wrap {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover &__img {
    transform: scale(1.06);
  }

  &__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.25), transparent 50%);
  }

  // ── Body ──────────────────────────────
  &__body {
    padding: $spacing-xl;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__name {
    font-family: $font-heading;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin-bottom: $spacing-sm;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-text-light;
    line-height: 1.7;
    margin-bottom: $spacing-lg;
    // Clamp to 3 lines so all cards have same description height
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // ── Amenities ─────────────────────────
  &__amenities {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
  }

  &__amenity {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: $font-size-sm;
    color: $color-text-light;
  }

  &__amenity-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  &__amenity-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // ── Divider ───────────────────────────
  &__divider {
    height: 1px;
    background: $color-border;
    margin-bottom: $spacing-lg;
    margin-top: auto;
  }

  // ── Price & CTA ───────────────────────
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-sm;
  }

  &__price {
    display: flex;
    flex-direction: column;

    &-from {
      font-size: $font-size-xs;
      color: $color-text-muted;
    }

    &-main {
      display: flex;
      align-items: baseline;
      gap: 2px;
      margin: 4px 0;
      white-space: nowrap;
    }

    &-value {
      font-family: $font-heading;
      font-weight: $font-weight-bold;
      font-size: $font-size-2xl;
      color: $color-primary-dark;
      line-height: 1;
    }

    &-unit {
      font-size: $font-size-base;
      font-weight: $font-weight-semibold;
      color: $color-primary-dark;
    }
  }
  
  &__cta {
    svg { flex-shrink: 0; }
    white-space: nowrap;
  }
}
</style>
