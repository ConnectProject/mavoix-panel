
const routes = [
  /* Logged routes */
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

      /* Devices routes */
      { name: 'devices-all', path: '/devices', component: () => import('pages/devices/All.vue') },
      { name: 'devices-one', path: '/devices/:id', component: () => import('pages/devices/One.vue') },
      { name: 'devices-new', path: '/new-device', component: () => import('pages/devices/New.vue') },

      /* Tabs routes */
      { name: 'tabs-all', path: '/tabs', component: () => import('pages/tabs/All.vue') },
      { name: 'tabs-one', path: '/tabs/:id', component: () => import('pages/tabs/One.vue') },
      { name: 'tabs-new', path: '/new-tab', component: () => import('pages/tabs/New.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
