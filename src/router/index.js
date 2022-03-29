import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import StoryMode from '../components/StoryMode.vue'
import LiveMode from '../components/LiveMode.vue'
import Experience from '@/components/Experience.vue'
import Debug from '@/components/Debug.vue'
import Frame from '@/components/Frame.vue'
import Embedded from '@/components/Embedded.vue'

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
    path: '/debug',
    name: 'debugExperience',
    component: Debug,
  },
  {
    path: '/frame',
    name: 'iframeExperience',
    component: Frame,
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