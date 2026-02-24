import { createBrowserRouter, ScrollRestoration } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import Layout from '../components/Layout'

const HomePage = lazy(() => import('../pages/HomePage'))
const SkillDetailPage = lazy(() => import('../pages/SkillDetailPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  }}>
    <Spin size="large" />
  </div>
)

const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'skills/:skillId',
        element: withSuspense(SkillDetailPage),
      },
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
])
