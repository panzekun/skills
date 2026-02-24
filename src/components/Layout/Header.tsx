import { Layout as AntLayout } from 'antd'
import { Link } from 'react-router-dom'

const { Header: AntHeader } = AntLayout

const Header = () => {
  return (
    <AntHeader style={{
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      padding: '0 50px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1890ff',
        textDecoration: 'none'
      }}>
        Claude Code 技能集
      </Link>
    </AntHeader>
  )
}

export default Header
