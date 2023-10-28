import { boot } from 'quasar/wrappers'
import VueAnimateOnScroll from 'vue3-animate-onscroll'

export default boot(async ({ app } ) => {
  app.use(VueAnimateOnScroll)

  return {
    app
  }
})
