<template>
  <main>
    <TheNavbar />
    <HeroSection />
    <AboutSection />
    <RoomsSection />
    <AmenitiesSection />
    <FooterContact />
    <FloatingWidget />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Hotel Amy – Hotel Tân Phú giá rẻ',
  meta: [
    {
      name: 'description',
      content:
        'Hotel Amy – Boutique Hotel tại Tân Phú, TP. HCM. Phòng nghỉ ấm cúng, tiện nghi hiện đại, gần sân bay Tân Sơn Nhất. Liên hệ đặt phòng qua Zalo: 0908 068 466.',
    },
  ],
})
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background-color: $color-bg;
}
</style>
