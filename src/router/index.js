import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import StoryMode from '../components/StoryMode.vue'
import LiveMode from '../components/LiveMode.vue'

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
    name: 'Live Mode',
    component: LiveMode
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router