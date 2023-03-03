import {Router} from '@slimr/router'

export const router = new Router({
  index: {
    loader: () => import('./pages/index'),
    path: '/',
  },
  stack1: {
    isStack: true,
    loader: () => import('./pages/stack-test'),
    path: '/stack1',
  },
  stack1Inner: {
    exact: false,
    loader: () => import('./pages/stack-test'),
    path: '/stack1',
  },
  notFound: {
    exact: false,
    loader: () => import('./pages/not-found'),
    path: '/',
  },
})
