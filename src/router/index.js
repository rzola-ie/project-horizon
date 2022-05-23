import { createRouter, createWebHistory } from "vue-router";
import LiveMode from '../components/LiveMode.vue'
import Experience from '../components/Experience.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [

  {
    path: '/experience',
    name: 'liveExperience',
    component: Experience,
  },
  {
    path: '/index.html',
    name: 'LiveMode',
    component: LiveMode
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  base: '/horizon-simulator',
  history: createWebHistory("/horizon-simulator/"),
  routes
})

export default router