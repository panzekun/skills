import { Layout as AntLayout, Space, Divider } from 'antd'
import { GithubOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Footer: AntFooter } = AntLayout

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#fafafa', padding: '40px 20px' }}>
      <Space size="large" style={{ marginBottom: '16px' }}>
        <Link to="/" style={{ color: '#666' }}>
          <GithubOutlined style={{ fontSize: '20px' }} />
        </Link>
        <Link to="/" style={{ color: '#666' }}>
          <TwitterOutlined style={{ fontSize: '20px' }} />
        </Link>
        <Link to="/" style={{ color: '#666' }}>
          <MailOutlined style={{ fontSize: '20px' }} />
        </Link>
      </Space>

      <Divider style={{ margin: '16px 0' }} />

      <p style={{ marginBottom: '8px' }}>Claude Code 前端开发技能集 © 2026</p>
      <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
        最后更新时间: 2026-02-13
      </p>
      <p style={{ fontSize: '12px', color: '#999' }}>
        Powered by <Link to="/">Anthropic</Link>
      </p>
    </AntFooter>
  )
}

export default Footer
