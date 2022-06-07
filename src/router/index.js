import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'EGAR Technology - Главная',
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: {
      title: 'EGAR Technology - Проекты',
    }
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('@/views/DocumentsView.vue'),
    meta: {
      title: 'EGAR Technology - Документы',
    }
  },
  {
    path: '/departments',
    name: 'departments',
    component: () => import('@/views/DepartmentsView.vue'),
    meta: {
      title: 'EGAR Technology - Отделы',
    }
  },
  {
    path: '/workers',
    name: 'workers',
    component: () => import('@/views/WorkersView.vue'),
    meta: {
      title: 'EGAR Technology - Сотрудники',
    }
  },
  {
    path: '/workers/add',
    name: 'worker-add',
    component: () => import('@/views/WorkerAddView.vue'),
    meta: {
      title: 'EGAR Technology - Сотрудник - Добавить',
    }
  },
  {
    path: '/workers/:id',
    name: 'worker-profile',
    component: () => import('@/views/WorkerProfile.vue'),
    meta: {
      title: 'EGAR Technology - Сотрудник - Профиль',
    }
  },
  {
    path: '/workers/:id/edit',
    name: 'worker-edit',
    component: () => import('@/views/WorkerEditView.vue'),
    meta: {
      title: 'EGAR Technology - Сотрудник - Редактировать',
    }
  },
  {
    path: '/workers/:id/delete',
    name: 'worker-delete',
    component: () => import('@/views/WorkerDeleteView.vue'),
    meta: {
      title: 'EGAR Technology - Сотрудник - Удалить',
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
