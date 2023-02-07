import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
// import Home from "@/views/Home"
// import About from "@/views/About"

// 懒加载模式需要使用suspense 包裹
const Home = lazy(() => import('@/views/Home'))
const Page1 = lazy(() => import('@/views/Page1'))
const Page2 = lazy(() => import('@/views/Page2'))
const Page31 = lazy(() => import('@/views/Page3'))

const loadingComponent = (component: JSX.Element) => (
  <Suspense fallback={<div>loading...</div>}>
    {component}
  </Suspense>
)

const routes = [
  // 嵌套路由开始
  {
    path: '/',
    element: <Navigate to='/page1' />
  },
  {
    element: <Home />,
    children: [
      {
        path: '/page1',
        element: loadingComponent(<Page1 />)
      },
      {
        path: '/page2',
        element: loadingComponent(<Page2 />)
      },
      {
        path: '/page3-1',
        element: loadingComponent(<Page31 />)
      }
    ]
  },
  // 嵌套路由结束
]

export default routes