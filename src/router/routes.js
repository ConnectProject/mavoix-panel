
const routes = [
  /* Logged routes */
  {
    path: '/auth',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      { name: 'auth', path: '/', component: () => import('~/pages/Authenticate.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('~/layouts/HomeLayout.vue'),
    children: [
      { name: 'home', path: '/home', component: () => import('~/pages/Index.vue') },

      /* Tabs routes */
      { name: 'tab', path: '/tab/editor/:slug', component: () => import('~/pages/TabEditor.vue') },

      /* Devices routes */
      { name: 'device', path: '/devices/:slug', component: () => import('~/pages/Device.vue') }
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
