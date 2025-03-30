import { createRouter, createWebHistory } from 'vue-router'
import LoginSignUp from '../components/LoginSignUp.vue'
import AppInterface from '../components/AppInterface.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginSignUp,
  },
  {
    path: '/app',
    name: 'App',
    component: AppInterface,
  },
]
