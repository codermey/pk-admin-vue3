import type { Directive } from 'vue'

const draggable: Directive<HTMLElement> = {
  mounted: (el) => {
    el.addEventListener('mousedown', (e) => {
      el.style.cursor = 'move'
      el.style.position = 'absolute'

      const startX = e.pageX - el.offsetLeft
      const startY = e.pageY - el.offsetTop

      const move = (e: MouseEvent) => {
        let x = e.pageX - startX
        let y = e.pageY - startY

        const MAX_X = Math.floor(document.documentElement.clientWidth - el.clientWidth)
        const MAX_Y = Math.floor(document.documentElement.clientHeight - el.clientHeight)

        if (x < 0) {
          x = 0
        }

        if (x > MAX_X) {
          x = MAX_X
        }

        if (y < 0) {
          y = 0
        }

        if (y > MAX_Y) {
          y = MAX_Y
        }

        el.style.left = `${x}px`
        el.style.top = `${y}px`
      }

      const up = () => {
        console.log('up')
        el.style.cursor = 'default'

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
  },
}

export default draggable
