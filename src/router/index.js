import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import BackstageHomeView from "../views/BackstageHomeView.vue"
import ForestageHomeView from "../views/ForestageHomeView.vue"
import EditTopicView from "../views/EditTopicView.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/BackstageHomeView',
      name: 'BackstageHomeView',
      component: BackstageHomeView,
      // children: [
      //   {
      //     path: '/EditTopicView',
      //     component: EditTopicView
      //   }
      // ]
    },
    {
      path: '/ForestageHomeView',
      name: 'ForestageHomeView',
      component: ForestageHomeView
    },
    {
      path: '/EditTopicView',
      name: 'EditTopicView',
      component: EditTopicView
    },
   

  ]
})

export default router