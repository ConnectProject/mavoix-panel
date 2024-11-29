const routes = [
  {
    name: 'LandingPage',
    path: '/',
    component: () => import('~/pages/LandingPage.vue')
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
    path: '/',
    component: () => import('~/layouts/MainLayout.vue'),
    children: [
      {
        name: 'HomePage',
        path: 'home',
        component: () => import('~/pages/HomePage.vue')
      },
      {
        name: 'ImageGalleryPage',
        path: 'gallery',
        component: () => import('~/pages/ImageGalleryPage.vue')
      }
    ]
  }
  // {
  //   name: 'base',
  //   path: '/',
  //   component: () => import('~/layouts/HomeLayout.vue'),
  //   children: [

  //     /* Homepage */
  //     { name: 'HomePage', path: '/home', component: () => import('~/pages/Home.vue') },

  //     /* Tab editor */
  //     { name: 'tab', path: '/tabs/:slug', component: () => import('~/pages/TabEditor.vue') },

  //     /* Asset editor */
  //     { name: 'assets', path: '/assets', component: () => import('~/pages/AssetsManager.vue') }
  //   ]
  // }
]

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('~/pages/Error404.vue')
})

export default routes
