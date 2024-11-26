
const routes = [
  {
    path: '/',
    component: () => import('~/layouts/LandingLayout.vue')
  },
  {
    path: '/auth',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [

      /* Login page */
      { name: 'auth', path: '', component: () => import('~/pages/LoginPage.vue') },

      /* Register Page */
      { name: 'RegisterPage', path: '', component: () => import('~/pages/LoginPage.vue') }
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
