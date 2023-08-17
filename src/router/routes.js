// Define las rutas del proyecto y con cual layout se ejecutan
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    // * La siguiente linea es importante, indica que estas rutas requieren de authenticacion
    // * Esta definida en el index.js que veremos a continuacion
    meta: {requireAuth: true},

    children: [
      {path: '', name: "home", meta: {groups: ['Administrador', 'Moderador', 'Consultor']},component: () => import('pages/backend/general/IndexPage.vue')},

      // Gestion de Usuarios
      {path: '/users', name: "users", meta: {groups: ['Administrador']},component: () => import('pages/backend/user/UserPage.vue')},
      {path: '/add-user', name: "add-user", meta: {groups: ['Administrador']}, component: () => import('pages/backend/user/AddUserPage.vue')},
      {path: '/edit-user/:id', name: "edit-user", meta: {groups: ['Administrador']}, component: () => import('pages/backend/user/EditUserPage.vue')},


      {path: 'profile', name: "profile",meta: {groups: ['Administrador', 'Moderador', 'Consultor']}, component: () => import('pages/backend/user/ProfilePage.vue')},
      {path: 'prueba-ruta', name: "prueba-ruta", component: () => import('pages/backend/general/PruebaRuta.vue')},
    ]
  },
  {
    path: '/',
    login_component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: 'login', name: "login", component: () => import('pages/backend/auth/LoginPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/backend/general/ErrorNotFound.vue')
  }
]

// Se exportan las rutas
export default routes
