import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/front1',
    component: () => import('../views/AdminView.vue'),
    children:[
      {
        path: '/front1',
        name: 'front1',
        component: () => import('../components/front1.vue'),
      },
      {
        path: '/front2',
        name: 'front2',
        component: () => import('../components/front2.vue'),
      },
      {
        path: '/front3',
        name: 'front3',
        component: () => import('../components/front3.vue'),
      },
      {
        path: '/front4',
        name: 'front4',
        component: () => import('../components/front4.vue'),
      },
      {
        path: '/front5',
        name: 'front5',
        component: () => import('../components/front5.vue'),
      },
      {
        path: '/front6',
        name: 'front6',
        component: () => import('../components/front6.vue'),
      }
    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    redirect: '/tea1',
    component: () => import('../views/TeacherView.vue'),
    children:[
      {
        path: '/tea1',
        name: 'tea1',
        component: () => import('../components/tea1.vue'),
      },
      {
        path: '/tea2',
        name: 'tea2',
        component: () => import('../components/tea2.vue'),
      },
      {
        path: '/tea3',
        name: 'tea3',
        component: () => import('../components/tea3.vue'),
      },
      {
        path: '/tea4',
        name: 'tea4',
        component: () => import('../components/tea4.vue'),
      },
      {
        path: '/tea5',
        name: 'tea5',
        component: () => import('../components/tea5.vue'),
      },
      {
        path: '/tea6',
        name: 'tea6',
        component: () => import('../components/tea6.vue'),
      },
      {
        path: '/tea7',
        name: 'tea7',
        component: () => import('../components/tea7.vue'),
      },
      {
        path: '/tea8',
        name: 'tea8',
        component: () => import('../components/tea8.vue'),
      },
      {
        path: '/tea9',
        name: 'tea9',
        component: () => import('../components/tea9.vue'),
      },
      {
        path: '/tea10',
        name: 'tea10',
        component: () => import('../components/tea10.vue'),
      },
      {
        path: '/tea11',
        name: 'tea11',
        component: () => import('../components/tea11.vue'),
      },
      {
        path: '/tea12',
        name: 'tea12',
        component: () => import('../components/tea12.vue'),
      },
      {
        path: '/tea13',
        name: 'tea13',
        component: () => import('../components/tea13.vue'),
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/u1',
    component: () => import('../views/UserView.vue'),
    children:[
      {
        path: '/u1',
        name: 'u1',
        component: () => import('../components/u1.vue'),
      },
      {
        path: '/u2',
        name: 'u2',
        component: () => import('../components/u2.vue'),
      },
      {
        path: '/u3',
        name: 'u3',
        component: () => import('../components/u3.vue'),
      },
      {
        path: '/u4',
        name: 'u4',
        component: () => import('../components/u4.vue'),
      },
      {
        path: '/u5',
        name: 'u5',
        component: () => import('../components/u5.vue'),
      },
      {
        path: '/u6',
        name: 'u6',
        component: () => import('../components/u6.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;