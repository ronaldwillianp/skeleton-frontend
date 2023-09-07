// Define las rutas del proyecto y con cual layout se ejecutan
const routes = [
  // Landing Page
  {
    path: '/',
    component: () => import('layouts/LandingPageLayout.vue'),
    children: [
      {path: '', component: () => import('pages/frontend/IndexPage.vue')}
    ]
  },
  {
    path: '/administracion',
    component: () => import('layouts/MainLayout.vue'),

    // * La siguiente linea es importante, indica que estas rutas requieren de authenticacion
    // * Esta definida en el index.js que veremos a continuacion
    meta: {requireAuth: true},

    children: [
      {
        path: '',
        name: "home",
        meta: {groups: ['Administrador', 'Moderador', 'Consultor']},
        component: () => import('pages/backend/general/IndexPage.vue')
      },

      // Gestion de Usuarios
      {
        path: '/users',
        name: "users",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/user/UserPage.vue')
      },
      {
        path: '/add-user',
        name: "add-user",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/user/AddUserPage.vue')
      },
      {
        path: '/edit-user/:id',
        name: "edit-user",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/user/EditUserPage.vue')
      },

      // Gestion de Empresa
      {
        path: '/empresas',
        name: "empresas",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/empresa/EmpresaPage.vue')
      },

      {
        path: 'profile',
        name: "profile",
        meta: {groups: ['Administrador', 'Moderador', 'Consultor']},
        component: () => import('pages/backend/user/ProfilePage.vue')
      },
      {path: 'prueba-ruta', name: "prueba-ruta", component: () => import('pages/backend/general/PruebaRuta.vue')},

      //  Getion Notcias
      {
        path: '/noticias',
        name: "noticias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/NoticiasPage.vue')
      },
      {
        path: '/add-noticia',
        name: "add-noticia",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/AddNoticiasPage.vue')
      },
      {
        path: '/edit-noticias/:id',
        name: "edit-noticias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/EditNoticiaPage.vue')
      },

      // Gestion Categorias
      {
        path: '/categorias',
        name: "categorias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/categorias/CategoriasPage.vue')
      },
      {
        path: '/add-categoria',
        name: "add-categoria",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/categorias/AddCategoriasPage.vue')
      },
      {
        path: '/edit-categoria/:id',
        name: "edit-categoria",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/categorias/EditCategoriasPage.vue')
      },

      // Gestion Estados
      {
        path: '/estados',
        name: "estados",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/estados/EstadosPage.vue')
      },
      {
        path: '/add-estado',
        name: "add-estado",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/estados/AddEstadosPage.vue')
      },
      {
        path: '/edit-estado/:id',
        name: "edit-estado",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/noticias/estados/EditEstadosPage.vue')
      },

      // Gestion FAQs
      {
        path: '/faqs',
        name: "faqs",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/faq/FAQsPage.vue')
      },
      {
        path: '/add-faq',
        name: "add-faq",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/faq/AddFAQsPage.vue')
      },
      {
        path: '/edit-faq/:id',
        name: "edit-faq",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/faq/EditFAQsPage.vue')
      },

      // Gestion Enlaces de Interes
      {
        path: '/enlaces-interes',
        name: "enlaces",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/EnlacesInteresPage.vue')
      },
      {
        path: '/add-enlaces-interes',
        name: "add-enlaces-interes",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/AddEnlacesInteresPage.vue')
      },
      {
        path: '/edit-enlaces-interes/:id',
        name: "edit-enlaces-interes",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/EditEnlacesInteresPage.vue')
      },
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
