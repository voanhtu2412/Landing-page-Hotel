<template>
  <div class="floating">
    <!-- Zalo Button -->
    <a
      id="floating-zalo-btn"
      :href="contactInfo.zaloLink"
      target="_blank"
      rel="noopener noreferrer"
      class="floating__btn floating__btn--zalo"
      :aria-label="$t('widget.zalo_aria')"
      :title="$t('widget.zalo_tooltip')"
    >
      <svg width="28" height="28" viewBox="0 0 48 48" fill="white">
        <path d="M24 4C13 4 4 12.1 4 22.1c0 5.6 2.9 10.7 7.5 14.1L10 42l6.4-3.3C18.7 39.5 21.3 40 24 40c11 0 20-8.1 20-17.9S35 4 24 4z"/>
        <text x="11" y="27" font-size="13" font-weight="bold" fill="white" font-family="Arial">zalo</text>
      </svg>
      <span class="floating__tooltip">{{ $t('widget.zalo_tooltip') }}</span>
    </a>

    <!-- Phone Button -->
    <a
      id="floating-phone-btn"
      :href="`tel:${contactInfo.hotline.replace(/\s/g, '')}`"
      class="floating__btn floating__btn--phone"
      :aria-label="$t('widget.phone_aria')"
      :title="$t('widget.phone_tooltip')"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
      <span class="floating__tooltip">{{ contactInfo.hotline }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/hotelData'
</script>

<style lang="scss" scoped>
.floating {
  position: fixed;
  bottom: $spacing-xl;
  right: $spacing-xl;
  z-index: $z-floating;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: $spacing-md;

  &__btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: $border-radius-full;
    text-decoration: none;
    transition: $transition-base;
    box-shadow: $shadow-lg;

    // ── Zalo Button ───────────────────
    &--zalo {
      width: 62px;
      height: 62px;
      background: linear-gradient(135deg, #0068FF, #00A8FF);
      animation: pulse-ring 2.5s ease-in-out infinite;

      &:hover {
        transform: scale(1.12);
        box-shadow: $shadow-xl;
        animation-play-state: paused;
      }
    }

    // ── Phone Button ──────────────────
    &--phone {
      background: linear-gradient(135deg, $color-accent, $color-accent-light);

      &:hover {
        transform: scale(1.1);
        box-shadow: $shadow-xl;
      }

      // Pulsing ring for phone too
      &::before {
        content: '';
        position: absolute;
        inset: -6px;
        border-radius: $border-radius-full;
        border: 2px solid rgba($color-accent, 0.4);
        animation: phonePulse 2s ease-in-out 1s infinite;
      }
    }
  }

  // ── Tooltip ───────────────────────────
  &__tooltip {
    position: absolute;
    right: calc(100% + $spacing-sm);
    top: 50%;
    transform: translateY(-50%);
    background: rgba($color-bg-dark, 0.92);
    color: $color-white;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    padding: 6px 12px;
    border-radius: $border-radius-sm;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(8px);

    // Arrow
    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: rgba($color-bg-dark, 0.92);
    }
  }

  &__btn:hover &__tooltip {
    opacity: 1;
  }
}

@keyframes phonePulse {
  0%   { transform: scale(1); opacity: 0.8; }
  50%  { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}
</style>
