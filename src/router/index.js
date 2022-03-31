import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import LiveMode from '../components/LiveMode.vue'
import Experience from '@/components/Experience.vue'
import Embedded from '@/components/Embedded.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/live',
    name: 'liveMode',
    component: LiveMode
  },
  {
    path: '/experience',
    name: 'liveExperience',
    component: Experience,
  },
  {
    path: '/embed',
    name: 'embed',
    component: Embedded,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router