import { Card, List } from 'antd'
import { CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons'
import './styles.css'

interface CoreFeaturesProps {
  features: string[]
}

const CoreFeatures = ({ features }: CoreFeaturesProps) => {
  return (
    <Card className="detail-card" title={
      <span className="card-title">
        <ThunderboltOutlined className="card-title-icon" />
        核心功能
      </span>
    }>
      <List
        dataSource={features}
        renderItem={(item) => (
          <List.Item className="feature-item">
            <CheckCircleOutlined className="feature-icon" />
            <span className="feature-text">{item}</span>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default CoreFeatures
