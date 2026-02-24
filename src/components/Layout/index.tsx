import { Outlet, ScrollRestoration } from 'react-router-dom'
import { FloatButton } from 'antd'
import Header from './Header'
import Footer from './Footer'
import './styles.css'

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollRestoration
        getKey={(location) => location.pathname}
      />
      <Header />
      <main style={{ flex: 1 }} className="page-transition">
        <Outlet />
      </main>
      <Footer />
      <FloatButton.BackTop />
    </div>
  )
}

export default Layout
