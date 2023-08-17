import {boot} from 'quasar/wrappers'
import axios from 'axios'
import {UserStore} from "stores/user-store";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// Obteniendo el host
let ip = location.host;
let mode = process.env.NODE_ENV;
let api = axios

//const api = axios.create({ baseURL: 'https://api.example.com' })

// Configurando el host en dependencia del mode de la app
if (mode === 'production') {
  // point to your API endpoint
  // api = axios.create({baseURL: "http://localhost:8000/api/v1.0/"})
  process.env.PORT=8000
  api = axios.create({baseURL: "http://" + ip + "/api/v1.0/"})
} else {
  api = axios.create({baseURL: "http://localhost:8000/api/v1.0/"})
}

// Exportando configuracion del boot
export default boot(({app, router}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const user = UserStore()

  // Request > Antes de enviar la peticion configura el token del userStore en la cabecera
  api.interceptors.request.use(
    function (config) {
      if (user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // api.defaults.headers.common.Authorization = `Bearer ${this.user.get_accesstoken}`;
  // Response > Despues de enviar la peticion configura las respuestas
  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // Guarda la peticion original por si hay que autenticarse porque ya expiro el token,
      // entonces poder seguir hacia esa ruta una vez que se pase el login para que
      // el usuario no sea enviado al dashboard
      const originalRequest = error.config;

      // Si hay errores de autenticacion
      if (router.currentRoute.name !== 'Login' && error.response.status === 401 && originalRequest.url.includes("api/token-refresh/")) {
        await user.logout()
      }
      else if (!originalRequest._retry) {
        await user.reloadToken()
        originalRequest._retry = true;
        return api(originalRequest);
      } else if (error.response.status === 401) {
        user.logout()
      }

      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export {api}
