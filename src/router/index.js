import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import StoryMode from '../components/StoryMode.vue'
import LiveMode from '../components/LiveMode.vue'
import Experience from '@/components/Experience.vue'
import Face from '@/components/Face.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/story',
    name: 'Story Mode',
    component: StoryMode
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
    path: '/face',
    name: 'faceExperience',
    component: Face,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router