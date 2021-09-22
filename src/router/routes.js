import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import store from '@/state/store';

const routes = [
  {
    name: 'home',
    path: '/', // my-site.com/
    component: Home,
  },
  {
    name: 'about',
    path: '/about', // my-site.com/about
    component: About,
  },
  {
    name: 'manage',
    alias: '/manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage route guard');
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/manage',
  //   redirect: { name: 'manage' },
  // },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  // console.log('Global route');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  }
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
