import { createRouter, createWebHistory } from "vue-router";
import LiveMode from '../components/LiveMode.vue'
import Experience from '@/components/Experience.vue'

const routes = [
  {
    path: '/index.html',
    name: 'LiveMode',
    component: LiveMode
  },
  {
    path: '/experience',
    name: 'liveExperience',
    component: Experience,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router