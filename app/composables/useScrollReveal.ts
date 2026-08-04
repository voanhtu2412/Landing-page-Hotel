// ============================================================
// useScrollReveal — Trigger animations when element enters viewport
// Sử dụng IntersectionObserver API (native, không cần thư viện)
// ============================================================

interface ScrollRevealOptions {
  threshold?: number   // % element visible before triggering (0–1)
  rootMargin?: string  // Offset before triggering
  once?: boolean       // Only trigger once (default: true)
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
  } = options

  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true // fallback cho SSR
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          if (once) observer.disconnect()
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el.value)

    onUnmounted(() => observer.disconnect())
  })

  return { el, isVisible }
}

// ── Multi-element stagger reveal ───────────────────────────────
// Dùng cho danh sách items (cards, grid items...)
export function useStaggerReveal(count: number, options: ScrollRevealOptions = {}) {
  const { threshold = 0.05, rootMargin = '0px 0px -40px 0px' } = options

  const containerEl = ref<HTMLElement | null>(null)
  const visibleItems = ref<boolean[]>(Array(count).fill(false))

  onMounted(() => {
    if (!containerEl.value || typeof IntersectionObserver === 'undefined') {
      visibleItems.value = Array(count).fill(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.staggerIndex)
            if (!isNaN(index)) {
              setTimeout(() => {
                visibleItems.value[index] = true
              }, index * 120) // 120ms stagger between each item
            }
          }
        })
      },
      { threshold, rootMargin },
    )

    // Observe each child with data-stagger-index
    const children = containerEl.value.querySelectorAll('[data-stagger-index]')
    children.forEach(child => observer.observe(child))

    onUnmounted(() => observer.disconnect())
  })

  return { containerEl, visibleItems }
}
