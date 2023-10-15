// Define las rutas del proyecto y con cual layout se ejecutan
const routes = [
  // Landing Page
  {
    path: '/',
    component: () => import('layouts/LandingPageLayout.vue'),
    children: [
      {path: '', component: () => import('pages/frontend/IndexPage.vue')},
      {
        path: '/noticia/:nombre',
        name: "noticia",
        component: () => import('pages/backend/noticias/NoticiaItem.vue')
      },
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

      // Enlaces Categorias
      {
        path: '/enlaces-categorias',
        name: "enlaces-categorias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/categorias/EnlacesCategoriaPage.vue')
      },
      {
        path: '/add-enlaces-categorias',
        name: "add-enlaces-categorias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/categorias/AddEnlacesCategoriaPage.vue')
      },
      {
        path: '/edit-enlaces-categorias/:id',
        name: "edit-enlaces-categorias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/enlaces-interes/categorias/EditEnlacesCategoriaPage.vue')
      },

      //  Comentarios Estados
      {
        path: '/comentarios-estados',
        name: "comentarios-estados",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/estados/ComentariosEstadosPage.vue')
      },
      {
        path: '/add-comentario-estado',
        name: "add-comentarios-estados",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/estados/AddComentariosEstadosPage.vue')
      },
      {
        path: '/edit-comentario-estado/:id',
        name: "edit-comentarios-estados",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/estados/EditComentariosEstadosPage.vue')
      },

      //  Comentarios Noticias
      {
        path: '/comentarios-noticias',
        name: "comentarios-noticias",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/noticias/ComentariosNoticiasPage.vue')
      },
      {
        path: '/add-comentario-noticia',
        name: "add-comentarios-noticia",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/noticias/AddcomentariosNoticiasPage.vue')
      },
      {
        path: '/edit-comentario-noticia/:id',
        name: "edit-comentarios-noticia",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/comentarios/noticias/EditComentariosNoticiaPage.vue')
      },

      // Gestion Socio
      {
        path: '/socios',
        name: "Socios",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/socios/SociosPage.vue')
      },
      {
        path: '/add-socios',
        name: "add-socios",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/socios/AddSociosPage.vue')
      },
      {
        path: '/edit-socios/:id',
        name: "edit-socios",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/socios/EditSociosPage.vue')
      },

      // Gestion Servicios
      {
        path: '/servicios',
        name: "Servicos",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/servicios/ServiciosPage.vue')
      },
      {
        path: '/add-servicio',
        name: "add-servicos",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/servicios/AddServiciosPage.vue')
      },
      {
        path: '/edit-servicio/:id',
        name: "edit-servicos",
        meta: {groups: ['Administrador']},
        component: () => import('pages/backend/servicios/EditServiciosPage.vue')
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
