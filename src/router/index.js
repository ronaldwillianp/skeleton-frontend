import {route} from 'quasar/wrappers'
import {createRouter, createMemoryHistory, createWebHistory, createWebHashHistory, useRoute} from 'vue-router'
import routes from './routes'
import {UserStore} from "stores/user-store";
import {ConfiguracionAdministracionStore} from "stores/configuracion-administracion";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // * Importante, el siguiente codigo se ejecuta antes de cada peticion,
  // Valida que si la ruta requiere authenticacion y el usuario no esta authenticado,
  // lo envia directamente a la interfaz del login

  // Si el usuario ya esta authenticado, pero pregunta por la ruta del /login, este lo
  // envia al dashboard (en este caso /home) para evitar generar otro token.

  Router.beforeEach((to, from, next) => {
    const useUserStore = UserStore()
    useUserStore.initializeUser()

    const useConfiguracionAdministracion = ConfiguracionAdministracionStore()
    useConfiguracionAdministracion.initializeConfiguracionAdministracion()

    if (useUserStore.refreshToken) {
      let token_to_check = useUserStore.refreshToken
      if (useUserStore.isTokenExpired(token_to_check)) {
        useUserStore.logout()
      }
    }

    if (to.matched.some(record => record.meta.requireAuth) && !useUserStore.accessToken) {
      next({name: 'login', query: {next: to.fullPath}})
    } else if (to.meta.groups && !to.meta.groups.some(item => useUserStore.user.groups.includes(item))) {
      next(from)
    } else if (to.name === "login" && useUserStore.user) {
      next({name: "home"});
    } else {
      next()
    }
  })
  return Router

})
