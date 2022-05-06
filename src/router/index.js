import { createRouter, createWebHistory } from "vue-router";
import LiveMode from '../components/LiveMode.vue'
import Experience from '../components/Experience.vue'
import PageNotFound from '../components/PageNotFound.vue'

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
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  base: 'https://storage.googleapis.com/horizon-simulator-bucket/',
  history: createWebHistory(),
  routes
})

export default router