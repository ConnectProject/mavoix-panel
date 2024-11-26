const routes = [
  {
    path: '/',
    component: () => import('~/layouts/LandingLayout.vue')
  },
  {
    path: '/auth',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      {
        name: 'LoginPage',
        path: 'login',
        component: () => import('~/pages/LoginPage.vue')
      },
      {
        name: 'RegisterPage',
        path: 'register',
        component: () => import('~/pages/RegisterPage.vue')
      }
    ]
  },
  {
    name: 'base',
    path: '/',
    component: () => import('~/layouts/HomeLayout.vue'),
    children: [

      /* Homepage */
      { name: 'home', path: '/home', component: () => import('~/pages/Home.vue') },

      /* Tab editor */
      { name: 'tab', path: '/tabs/:slug', component: () => import('~/pages/TabEditor.vue') },

      /* Asset editor */
      { name: 'assets', path: '/assets', component: () => import('~/pages/AssetsManager.vue') }
    ]
  }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('~/pages/Error404.vue')
})

export default routes
