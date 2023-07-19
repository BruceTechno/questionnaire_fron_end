import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import BackstageHomeView from "../views/BackstageHomeView.vue"
import ForestageHomeView from "../views/ForestageHomeView.vue"
import EditTopicView from "../views/EditTopicView.vue"
import AddTopicView from "../views/AddTopicView.vue"
import AddQuestionView from "../views/AddQuestionView.vue"
import FeedBackPageView from "../views/FeedBackPageView.vue"
import FeedBackDetailView from "../views/FeedBackDetailView.vue"
import AnswerQuestionView from "../views/AnswerQuestionView.vue"
import EditQuestionView from "../views/EditQuestionView.vue"
import StatisticsView from "../views/StatisticsView.vue"




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
    {
      path: '/AddTopicView',
      name: 'AddTopicView',
      component: AddTopicView
    },
    {
      path: '/AddQuestionView',
      name: 'AddQuestionView',
      component: AddQuestionView
    },
    {
      path: '/FeedBackPageView',
      name: 'FeedBackPageView',
      component: FeedBackPageView
    },
    {
      path: '/FeedBackDetailView',
      name: 'FeedBackDetailView',
      component: FeedBackDetailView
    },
    {
      path: '/AnswerQuestionView',
      name: 'AnswerQuestionView',
      component: AnswerQuestionView
    },
    {
      path: '/EditQuestionView',
      name: 'EditQuestionView',
      component: EditQuestionView
    },
    {
      path: '/StatisticsView',
      name: 'StatisticsView',
      component: StatisticsView
    },
    

]
})

export default router
