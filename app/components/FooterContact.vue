<template>
  <footer class="footer" id="contact">
    <!-- Top CTA Bar -->
    <div
      ref="ctaBarEl"
      class="footer__cta-bar reveal-up"
      :class="{ 'reveal-up--visible': ctaBarVisible }"
    >
      <div class="container footer__cta-inner">
        <div class="footer__cta-text">
          <h2 class="footer__cta-title">{{ $t('contact.title') }}</h2>
          <p class="footer__cta-sub">{{ $t('contact.subtitle') }}</p>
        </div>
        <div class="footer__cta-actions">
          <a :href="`tel:${contactInfo.hotline.replace(/\s/g, '')}`" class="btn btn--primary">
            {{ $t('contact.btn_call') }}: {{ contactInfo.hotline }}
          </a>
          <a
            :href="contactInfo.zaloLink"
            target="_blank"
            rel="noopener"
            class="btn btn--outline"
          >
            {{ $t('contact.btn_zalo') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer__main">
      <div class="container footer__main-inner">

        <!-- Brand Column -->
        <div class="footer__col footer__col--brand">
          <div class="footer__logo">
            <img
              src="/images/logo.png"
              alt="Hotel Amy Logo"
              class="footer__logo-img"
            />
          </div>
          <p class="footer__tagline">
            {{ $t('hero.subtitle_1') }}
          </p>
          <div class="footer__social">
            <a
              :href="contactInfo.facebookLink"
              target="_blank"
              rel="noopener"
              class="footer__social-link"
              aria-label="Facebook Hotel Amy"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              :href="contactInfo.zaloLink"
              target="_blank"
              rel="noopener"
              class="footer__social-link"
              aria-label="Zalo Hotel Amy"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor">
                <path d="M24 4C13 4 4 12.1 4 22.1c0 5.6 2.9 10.7 7.5 14.1L10 42l6.4-3.3C18.7 39.5 21.3 40 24 40c11 0 20-8.1 20-17.9S35 4 24 4z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Column -->
        <div class="footer__col">
          <h3 class="footer__col-title">{{ $t('nav.contact') }}</h3>
          <ul class="footer__list">
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-rr-marker"></i>
              <span>{{ contactInfo.address }}</span>
            </li>
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-rr-phone-call"></i>
              <a :href="`tel:${contactInfo.hotline.replace(/\s/g, '')}`">
                {{ contactInfo.hotline }}
              </a>
            </li>
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-rr-comment-alt"></i>
              <a :href="contactInfo.zaloLink" target="_blank" rel="noopener">
                Zalo: {{ contactInfo.zaloNumber }}
              </a>
            </li>
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-brands-facebook"></i>
              <a :href="contactInfo.facebookLink" target="_blank" rel="noopener">
                {{ contactInfo.facebookName }}
              </a>
            </li>
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-rr-envelope"></i>
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </li>
            <li class="footer__list-item">
              <i class="footer__list-icon fi fi-rr-clock"></i>
              <span>{{ contactInfo.openHours }}</span>
            </li>
          </ul>
        </div>

        <!-- Quick Links Column -->
        <div class="footer__col">
          <h3 class="footer__col-title">{{ $t('nearby.label') }}</h3>
          <ul class="footer__list">
            <li><a href="#about" class="footer__nav-link">{{ $t('nav.about') }}</a></li>
            <li><a href="#rooms" class="footer__nav-link">{{ $t('nav.rooms') }}</a></li>
            <li><a href="#amenities" class="footer__nav-link">{{ $t('nav.amenities') }}</a></li>
            <li><a href="#contact" class="footer__nav-link">{{ $t('nav.contact') }}</a></li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Map Section -->
    <div class="footer__map">
      <iframe
        :src="contactInfo.mapEmbedSrc"
        width="100%"
        height="320"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Vị trí Hotel Amy trên Google Maps"
      />
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <div class="container">
        <p class="footer__copyright">
          © {{ currentYear }} {{ $t('contact.copyright') }} | Thiết kế bởi AZHTUS
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/hotelData'

const currentYear = new Date().getFullYear()

// Scroll reveal for CTA bar
const { el: ctaBarEl, isVisible: ctaBarVisible } = useScrollReveal({ threshold: 0.2 })
</script>

<style lang="scss" scoped>
// ── Reveal animation (scoped to footer) ──────────────────
.reveal-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s ease, transform 0.65s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer {
  background: $color-bg-dark;
  color: rgba($color-white, 0.8);

  // ── CTA Bar ───────────────────────────
  &__cta-bar {
    background: linear-gradient(135deg, $color-primary, $color-primary-dark);
    padding: $spacing-2xl 0;
  }

  &__cta-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-xl;
    text-align: center;

    @media (min-width: $bp-md) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  &__cta-title {
    font-family: $font-heading;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-white;
    margin-bottom: $spacing-xs;
  }

  &__cta-sub {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.85);
  }

  &__cta-actions {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
    justify-content: center;
    flex-shrink: 0;

    .btn--primary {
      background: $color-white;
      color: $color-primary;
      border-color: $color-white;

      &:hover {
        background: rgba($color-white, 0.9);
      }
    }

    .btn--outline {
      border-color: rgba($color-white, 0.6);
      color: $color-white;

      &:hover {
        background: rgba($color-white, 0.15);
      }
    }
  }

  // ── Main Footer ───────────────────────
  &__main {
    padding: $spacing-4xl 0 $spacing-3xl;
  }

  &__main-inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-2xl;

    @media (min-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $bp-lg) {
      grid-template-columns: 2fr 1.5fr 1fr;
      gap: $spacing-3xl;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    &--brand {
      gap: $spacing-md;
    }
  }

  // ── Logo ────────────────────
  &__logo {
    display: flex;
    align-items: center;

    &-img {
      height: 64px;
      width: auto;
      object-fit: contain;
      // Logo has dark maroon color — invert to white on dark footer
      filter: brightness(0) invert(1);
      opacity: 0.92;
    }
  }

  &__tagline {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.6);
    line-height: 1.75;
    max-width: 300px;
  }

  &__social {
    display: flex;
    gap: $spacing-sm;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: $border-radius-full;
    background: rgba($color-white, 0.08);
    color: rgba($color-white, 0.7);
    transition: $transition-base;
    border: 1px solid rgba($color-white, 0.12);

    &:hover {
      background: $color-primary;
      color: $color-white;
      border-color: $color-primary;
    }
  }

  // ── Column titles ─────────────────────
  &__col-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-white;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid rgba($color-white, 0.1);
  }

  // ── Lists ─────────────────────────────
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__list-item {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    color: rgba($color-white, 0.65);
    line-height: 1.5;

    a {
      color: inherit;
      transition: $transition-fast;

      &:hover {
        color: $color-primary-light;
      }
    }
  }

  &__list-icon {
    flex-shrink: 0;
    font-size: 15px;
    margin-top: 1px;
  }

  &__nav-link {
    font-size: $font-size-sm;
    color: rgba($color-white, 0.65);
    transition: $transition-fast;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    &::before {
      content: '→';
      color: $color-primary;
      font-size: $font-size-xs;
    }

    &:hover {
      color: $color-primary-light;
      padding-left: 4px;
    }
  }

  // ── Map ───────────────────────────────
  &__map {
    width: 100%;
    overflow: hidden;
    border-top: 1px solid rgba($color-white, 0.08);

    iframe {
      display: block;
      filter: grayscale(20%) contrast(1.05);
    }
  }

  // ── Bottom Bar ────────────────────────
  &__bottom {
    padding: $spacing-lg 0;
    border-top: 1px solid rgba($color-white, 0.08);
  }

  &__copyright {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.4);
    text-align: center;
  }
}
</style>
