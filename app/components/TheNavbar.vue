<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container navbar__inner">
      <!-- Logo -->
      <a href="#" class="navbar__logo" @click.prevent="scrollToTop">
        <img
          src="/images/logo.png"
          alt="Hotel Amy Logo"
          class="navbar__logo-img"
          width="120"
          height="60"
        />
      </a>

      <!-- Desktop Nav -->
      <nav class="navbar__nav" :class="{ 'navbar__nav--open': menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="navbar__link"
          @click="closeMenu"
        >
          {{ $t(`nav.${link.key}`) }}
        </a>
        <a
          :href="contactInfo.zaloLink"
          target="_blank"
          rel="noopener"
          class="btn btn--primary btn--sm navbar__cta"
          @click="closeMenu"
        >
          📞 {{ $t('nav.contact') }}
        </a>

        <!-- Controls (Theme & Lang) -->
        <div class="navbar__controls">

          <button class="navbar__control-btn" @click="toggleLang" aria-label="Toggle Language">
            {{ locale === 'vi' ? 'EN' : 'VI' }}
          </button>
        </div>
      </nav>

      <!-- Mobile Hamburger -->
      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--open': menuOpen }"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile overlay -->
    <div v-if="menuOpen" class="navbar__overlay" @click="closeMenu" />
  </header>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/hotelData'

const { locale, setLocale } = useI18n()

const menuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { href: '#about',     key: 'about' },
  { href: '#rooms',     key: 'rooms' },
  { href: '#amenities', key: 'amenities' },
  { href: '#contact',   key: 'contact' },
]


function toggleLang() {
  setLocale(locale.value === 'vi' ? 'en' : 'vi')
}

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu()  { menuOpen.value = false }
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 60
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-navbar;
  height: $navbar-height;
  transition: background 0.4s ease, box-shadow 0.4s ease;
  background: transparent;

  // Scrolled state
  &--scrolled {
    background: rgba($color-white, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: $shadow-sm;

    .navbar__logo-text { color: $color-text; }
    .navbar__link { color: $color-text; }
    .navbar__hamburger span { background: $color-text; }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    z-index: $z-navbar + 1;

    &-img {
      height: 52px;
      width: auto;
      object-fit: contain;
      // Invert to white on transparent dark hero background
      filter: brightness(0) invert(1);
      transition: $transition-base;
    }
  }

  &--scrolled &__logo-img {
    // Restore original dark maroon color when navbar is solid
    filter: none;
  }

  // ── Navigation ────────────────────────
  &__nav {
    display: none;
    align-items: center;
    gap: $spacing-xl;

    @media (min-width: $bp-lg) {
      display: flex;
    }
  }

  &__link {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: rgba($color-white, 0.9);
    text-decoration: none;
    letter-spacing: 0.03em;
    position: relative;
    transition: $transition-base;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: $color-primary;
      transform: scaleX(0);
      transition: transform 0.25s ease;
      border-radius: $border-radius-full;
    }

    &:hover {
      color: $color-primary-light;
      &::after { transform: scaleX(1); }
    }
  }

  &__cta {
    margin-left: $spacing-sm;
    font-size: $font-size-sm !important;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-left: $spacing-md;
  }

  &__control-btn {
    background: transparent;
    border: 1px solid rgba($color-white, 0.4);
    color: rgba($color-white, 0.9);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;

    &:hover {
      background: rgba($color-white, 0.1);
      color: $color-primary-light;
      border-color: $color-primary-light;
    }
  }

  &--scrolled &__control-btn {
    border-color: $color-border;
    color: $color-text;

    &:hover {
      color: $color-primary;
      border-color: $color-primary;
    }
  }

  // ── Hamburger ─────────────────────────
  &__hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 32px;
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: $z-navbar + 1;

    @media (min-width: $bp-lg) { display: none; }

    span {
      display: block;
      height: 2px;
      width: 100%;
      background: $color-white;
      border-radius: $border-radius-full;
      transition: $transition-base;
    }

    &--open {
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
  }

  // ── Mobile Nav ────────────────────────
  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: $z-navbar - 1;
  }

  @media (max-width: #{$bp-lg - 1px}) {
    &__nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(300px, 80vw);
      background: $color-surface;
      padding: calc($navbar-height + $spacing-xl) $spacing-xl $spacing-xl;
      box-shadow: $shadow-xl;
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.35s ease, opacity 0.35s ease;
      z-index: $z-navbar;

      &--open {
        transform: translateX(0);
        opacity: 1;
      }
    }

    &__link {
      color: $color-text;
      font-size: $font-size-lg;
      width: 100%;
      padding: $spacing-md 0;
      border-bottom: 1px solid $color-border;

      &:hover { color: $color-primary; }
    }

    &__cta {
      margin: $spacing-xl 0 0;
      width: 100%;
    }

    &__controls {
      margin-left: 0;
      margin-top: $spacing-lg;
      width: 100%;
      justify-content: center;
    }

    &__control-btn {
      border-color: $color-border;
      color: $color-text;

      &:hover {
        color: $color-primary;
        border-color: $color-primary;
      }
    }
  }
}
</style>
