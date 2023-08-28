// Importando librerias
import {defineStore} from 'pinia';
import axios from "axios";

export const ConfiguracionAdministracionStore = defineStore('configuracion-administracion', {
  state: () => ({
    configuracionAdministracion: localStorage.getItem('configuracionAdministracion'),
  }),
  actions: {

    initializeConfiguracionAdministracion() {
        this.getConfiguracionAdmistracion()
    },
    async getConfiguracionAdmistracion() {
      try {
        await axios.get('http://127.0.0.1:8000/api/v1.0/configuracion/configuracion_administracion/').then(response => {
          this.configuracionAdministracion = response.data[0]
          localStorage.setItem('configuracionAdministracion', this.configuracionAdministracion);
        })
      } catch (error) {
        console.log(error)
      }
    },

      deleteConfiguracionAdministracion() {
      localStorage.removeItem('configuracionAdministracion');
    },

  },
});
