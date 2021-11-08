import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
  },
  {
    path: '/cobro/:total',
    name: 'Cobro',
    component: () => import('../views/Cobro.vue'),
  },
  {
    path: '/installWizard',
    name: 'InstallWizard',
    component: () => import('../views/InstallWizard.vue'),
  },
  {
    path: '/abrirCaja',
    name: 'Abrir Caja',
    component: () => import('../views/AbrirCaja.vue'),
  },
  {
    path: '/menuTecnico',
    name: 'Menu Técnico',
    component: () => import('../views/MenuTecnico.vue'),
  },
  {
    path: '/cerrarCaja',
    name: 'Cerrar Caja',
    component: () => import('../views/CerrarCaja.vue'),
  },
  {
    path: '/menu/',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    children: [
      {
        path: 'caja',
        name:'cajaMenu',
        component: () => import('../components/Caja.vue'),
      },
      {
        path: 'fichajes',
        component: () => import('../components/Fichajes.vue'),
      },
      {
        path: 'pedidos/:codiBotiga',
        component: () => import('../components/Pedidos.vue'),
      },
      {
        path: 'devoluciones',
        component: () => import('../components/Devoluciones.vue'),
      },
      {
        path: 'entregas',
        component: () => import('../components/Entregas.vue'),
      },
    ],
  },
  {
    path: '/mesas',
    name: 'Mesas',
    component: () => import('../views/Mesas.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
