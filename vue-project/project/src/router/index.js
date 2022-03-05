import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
