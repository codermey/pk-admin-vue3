import type { App, Directive } from 'vue'

const modules = import.meta.glob<Directive>('./modules/*.ts', {
  eager: true,
  import: 'default',
})

const directives = {
  install: (app: App) => {
    Object.keys(modules).forEach((key) => {
      const directiveName = key
        .split('/')
        .pop()
        ?.replace(/\.\w+$/, '')

      if (directiveName) {
        app.directive(directiveName, modules[key])
      }
    })
  },
}

export function setupDirectives(app: App) {
  app.use(directives)
}
