// ============================================================
// useCountUp — Animate a number from 0 to target value
// Sử dụng requestAnimationFrame cho smooth animation
// ============================================================

interface CountUpOptions {
  duration?: number    // Thời gian animation (ms), default 2000
  decimals?: number    // Số chữ số thập phân, default 0
  easing?: 'easeOut' | 'linear' | 'easeInOut'
  separator?: string   // Phân cách hàng nghìn, VD: '.' để ra "1.200"
}

function applyEasing(t: number, easing: string): number {
  switch (easing) {
    case 'linear':    return t
    case 'easeInOut': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    case 'easeOut':
    default:          return 1 - Math.pow(1 - t, 3) // Cubic ease-out
  }
}

export function useCountUp(
  targetValue: number,
  options: CountUpOptions = {},
) {
  const {
    duration = 2000,
    decimals = 0,
    easing = 'easeOut',
    separator = '',
  } = options

  const displayValue = ref('0')
  const hasStarted = ref(false)

  function start() {
    if (hasStarted.value) return
    hasStarted.value = true

    const startTime = performance.now()
    const multiplier = Math.pow(10, decimals)

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = applyEasing(progress, easing)

      const current = Math.round(eased * targetValue * multiplier) / multiplier
      let formatted = current.toFixed(decimals)

      // Apply thousand separator
      if (separator) {
        const parts = formatted.split('.')
        parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, separator) ?? ''
        formatted = parts.join('.')
      }

      displayValue.value = formatted

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        // Ensure final value is exact
        let final = targetValue.toFixed(decimals)
        if (separator) {
          const parts = final.split('.')
          parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, separator) ?? ''
          final = parts.join('.')
        }
        displayValue.value = final
      }
    }

    requestAnimationFrame(tick)
  }

  function reset() {
    hasStarted.value = false
    displayValue.value = '0'
  }

  return { displayValue, start, reset, hasStarted }
}
