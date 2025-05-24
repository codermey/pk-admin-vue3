import type { Directive } from 'vue'

const water: Directive<HTMLElement> = {
  mounted: (el, binding) => {
    const text = binding.value.text
    const font = binding.value.font || '16px Microsoft JhengHei'
    const textColor = binding.value.textColor || 'rgba(180, 180, 180, 0.3)'

    const canvasEL = document.createElement('canvas')
    el.appendChild(canvasEL)
    canvasEL.width = 200
    canvasEL.height = 150
    canvasEL.style.display = 'none'

    const ctx = canvasEL.getContext('2d')
    if (!ctx) return

    ctx.rotate((-20 * Math.PI) / 180)
    ctx.font = font
    ctx.fillStyle = textColor
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvasEL.width / 10, canvasEL.height / 2)

    el.style.backgroundImage = 'url(' + canvasEL.toDataURL('image/png') + ')'
  },
}

export default water
