/**
 * Cloudflare Access faz o gate de autenticação no edge — sem rota /user/login,
 * sem `access` de roles (1 utilizador só). Ver src/access.ts.
 */
export default [
  {
    path: '/',
    redirect: '/brands',
  },
  {
    path: '/brands',
    name: 'brands',
    icon: 'tags',
    component: './brands',
  },
  {
    path: '/model-families',
    name: 'model-families',
    icon: 'appstore',
    component: './model-families',
  },
  {
    path: '/models',
    name: 'models',
    icon: 'mobile',
    component: './models',
  },
  {
    path: '/issue-types',
    name: 'issue-types',
    icon: 'tool',
    component: './issue-types',
  },
  {
    path: '/model-issue-types',
    name: 'model-issue-types',
    icon: 'euro',
    component: './model-issue-types',
  },
  {
    path: '/contacts',
    name: 'contacts',
    icon: 'mail',
    component: './contacts',
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'stop',
        path: '/exception/403',
        component: './exception/403',
      },
      {
        name: '404',
        icon: 'warning',
        path: '/exception/404',
        component: './exception/404',
      },
      {
        name: '500',
        icon: 'bug',
        path: '/exception/500',
        component: './exception/500',
      },
    ],
  },
  {
    component: './exception/404',
    path: '/*',
  },
];
