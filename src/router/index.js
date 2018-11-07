import HelloWorld from '@/components/HelloWorld'
export const appRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    meta: {
      isCheck: false,
      title: '首页'
    },
    component: HelloWorld
  }
]
export const routers = [
  ...appRouter
]
export default routers
