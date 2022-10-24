import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const View = { template: '<router-view></router-view>' }

const routes = [
  {
    path: '/',
    component: () => import('@pages/Layout/DashboardLayout.vue'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@pages/Dashboard.vue'),
        meta: { title: 'global.dashboard' }
      },
      {
        path: 'balances',
        name: 'balances',
        component: () => import('@pages/Balances.vue'),
        meta: { title: 'Balances' }
      },
      {
        path: 'eventos_calendario',
        name: 'eventos.calendario',
        component: () => import('@cruds/Eventos/Calendario.vue'),
        meta: { title: 'Eventos' }
      },
      {
        path: 'eventos/create',
        name: 'eventos.create',
        component: () => import('@cruds/Eventos/Create.vue'),
        meta: { title: 'Eventos' }
      },
      {
        path: 'eventos/index',
        name: 'eventos.index',
        component: () => import('@cruds/Eventos/Index.vue'),
        meta: { title: 'Eventos' }
      },
      {
        path: 'ingresos/index',
        name: 'ingresos.index',
        component: () => import('@cruds/Ingresos/Index.vue'),
        meta: { title: 'Ingresos' }
      },
      {
        path: 'ingresos/create',
        name: 'ingresos.create',
        component: () => import('@cruds/Ingresos/Create.vue'),
        meta: { title: 'Ingresos' }
      },
      {
        path: 'egresos/index',
        name: 'egresos.index',
        component: () => import('@cruds/Egresos/Index.vue'),
        meta: { title: 'Egreos' }
      },
      {
        path: 'egresos/create',
        name: 'egresos.create',
        component: () => import('@cruds/Egresos/Create.vue'),
        meta: { title: 'Egreos' }
      },
      {
        path: 'user-management',
        name: 'user_management',
        component: View,
        redirect: { name: 'permissions.index' },
        children: [
          {
            path: 'permissions',
            name: 'permissions.index',
            component: () => import('@cruds/Permissions/Index.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/create',
            name: 'permissions.create',
            component: () => import('@cruds/Permissions/Create.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id',
            name: 'permissions.show',
            component: () => import('@cruds/Permissions/Show.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id/edit',
            name: 'permissions.edit',
            component: () => import('@cruds/Permissions/Edit.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'roles',
            name: 'roles.index',
            component: () => import('@cruds/Roles/Index.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/create',
            name: 'roles.create',
            component: () => import('@cruds/Roles/Create.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id',
            name: 'roles.show',
            component: () => import('@cruds/Roles/Show.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id/edit',
            name: 'roles.edit',
            component: () => import('@cruds/Roles/Edit.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'users',
            name: 'users.index',
            component: () => import('@cruds/Users/Index.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/create',
            name: 'users.create',
            component: () => import('@cruds/Users/Create.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id',
            name: 'users.show',
            component: () => import('@cruds/Users/Show.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id/edit',
            name: 'users.edit',
            component: () => import('@cruds/Users/Edit.vue'),
            meta: { title: 'cruds.user.title' }
          }
        ]
      },
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes
})
