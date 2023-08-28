// Importando librerias
import {defineStore} from 'pinia';
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {Notify} from "quasar";
import {ConfiguracionAdministracionStore} from "stores/configuracion-administracion";

export const UserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }),
  actions: {
    decodeToken(accessToken) {
      const {id,username, email, first_name, last_name, groups} = jwtDecode(accessToken);
      const grupos = []
      groups.forEach(group => {
          grupos.push(group.name)
      })
      if (username && email) {
        return {id,username, email, first_name, last_name, groups: grupos}
      }

      return null;
    },
    initializeUser() {
      if (this.accessToken && !this.user){
        this.user = this.decodeToken(this.accessToken);
      }
    },
    async logIn(payload) {
      const loginUrl = "http://localhost:8000/api/token/";
      try {
        await axios.post(loginUrl, payload).then(response => {
          this.accessToken = response.data.access
          this.refreshToken = response.data.refresh
          this.initializeUser();
          this.SetTokenStorage(this.accessToken, this.refreshToken);
          Notify.create({
            type: 'positive',
            message: 'Bienvenido al sistema: ' + this.user.first_name + ' ' +this.user.last_name,
            position: 'top-right',
            progress: true,
          })
          this.router.push({path: '/'})
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Ha ocurrido un error. Contacte con el administrador. Código de estado: ' + error.request.status,
          position: 'top-right',
          progress: true,
        })
      }
    },
    logout() {
      const useConfiguracionAdministracion = ConfiguracionAdministracionStore()
      this.DeleteTokenStorage()
      this.$reset()
      useConfiguracionAdministracion.deleteConfiguracionAdministracion()
      this.router.push({path: '/login'})
    },

    async reloadToken() {
      if (!this.refreshToken) {
        this.logout()
      }

      const refreshUrl = "http://localhost:8000/api/token-refresh/";
      try {
        await axios.post(refreshUrl, {refresh: this.refreshToken})
          .then(response => {
            if (response.status === 200) {
              this.accessToken = response.data.access;
              this.initializeUser()
              localStorage.setItem('accessToken', response.data.access);
            }
          });
      } catch (e) {
        this.logout()
        return Promise.reject(e)
      }
    },

    // Working on this
    isTokenExpired(token) {
      const {exp} = jwtDecode(token)
      if (Date.now() >= exp * 1000) {
        return true
      } else {
        return false
      }
    },


    SetTokenStorage(accessToken, refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },

    DeleteTokenStorage() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

  },
});
