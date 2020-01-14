
const routes = [
  {
    path: '/auth',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      /* Auth homepage */
      { name: 'auth', path: '/', component: () => import('~/pages/auth/Home.vue') }
    ]
  },
  {
    name: 'base',
    path: '/:assets?',
    component: () => import('~/layouts/HomeLayout.vue'),
    children: [
      /* Homepage */
      { name: 'home', path: '/home', component: () => import('~/pages/Home.vue') },

      /* Tab editor */
      { name: 'tab', path: '/tabs/:slug', component: () => import('~/pages/TabEditor.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('~/pages/Error404.vue')
  })
}

export default routes
