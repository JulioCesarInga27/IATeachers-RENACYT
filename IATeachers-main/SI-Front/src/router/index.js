import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/LoginView.vue')
  },
  {
    path: '/menu',
    name: 'MenuView',
    component: () => import(/* webpackChunkName: "about" */ '../views/Menu/MenuView.vue')
  },
  {
    path: '/menuSecciones',
    name: 'MenuSeccionesView',
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuSecciones/MenuSeccionesView.vue')
  },
  {
    path: '/ListaEstudiantes',
    name: 'ListaEstudiantesView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaEstudiantes/ListaEstudiantesView.vue')
  },
  {
    path: '/SubirArchivo',
    name: 'SubirArchivoView',
    component: () => import(/* webpackChunkName: "about" */ '../views/SubirArchivo/SubirArchivoView.vue')
  },
  {
    path: '/ExamenDigitalizadoNotas',
    name: 'ExamenDigitalizadoNotasView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ExamenDigitalizadoNotas/ExamenDigitalizadoNotasView.vue')
  },
  {
    path: '/RegistrarDocente',
    name: 'RegistrarDocenteView',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrarDocenteU/RegistrarDocenteView.vue')
  },
  {
    path: '/Restablecer',
    name: 'RegistrarContraseñaView',
    component: () => import(/* webpackChunkName: "about" */ '../views/RestablecerContraseña/Restablecer.vue')
  },
  {
    path: '/boletaNotas',
    name:'BoletaNotasView',
    component: () => import(/* webpackChunkName: "about" */ '../views/BoletaNotas/BoletaNotaView.vue')
  },
  {
    path: '/multiArchivos',
    name:'MultiArchivosView',
    component: () => import(/* webpackChunkName: "about" */ '../views/MultiArchivos/MultiArchivos.vue')
  },
  {
    path: '/adminLogin=admin',
    name:'LoginAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginAdmin/LoginAdminView.vue')
  },
  {
    path: '/administracionUsuarios',
    name:'Administracion',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdministracionUsuarios/administracionUsuariosView.vue')
  },
  {
    path: '/dashBoardAdmin',
    name:'DashAdmin',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardAdmin/dashboarAdminView.vue')
  },
  {
    path: '/remitirCodigo',
    name:'RemitirCodigo',
    component: () => import(/* webpackChunkName: "about" */ '../views/RemitirCodigo/remitirCodigoView.vue')
  },
  {
    path: '/validarCodigo',
    name:'ValidarCodigo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ValidarCodigo/validarCodigoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
