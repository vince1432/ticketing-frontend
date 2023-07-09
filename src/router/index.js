import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Home.vue'),
		meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./../views/About.vue'),
		meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login.vue'),
		meta: {
      hideForAuth: true
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// redirect when loggedin
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if(!localStorage.token) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  }
	else if (to.matched.some(record => record.meta.hideForAuth)) {
		if (localStorage.token) {
				next({ name: 'dashboard' });
		} else {
				next();
		}
	} else {
			next();
	}
});

export default router
