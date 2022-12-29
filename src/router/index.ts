import { createRouter, createWebHistory } from 'vue-router';
import DayView from '@/views/DayView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Day',
      component: DayView,
    },
    /*
    {
      path: '/week',
      name: 'Week',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/WeekView.vue'),
    },
    */
  ],
});

export default router;
