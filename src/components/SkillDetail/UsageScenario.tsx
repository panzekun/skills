import { Card, List } from 'antd'
import { RocketOutlined } from '@ant-design/icons'
import './styles.css'

interface UsageScenarioProps {
  scenarios: string[]
}

const UsageScenario = ({ scenarios }: UsageScenarioProps) => {
  return (
    <Card className="detail-card" title={
      <span className="card-title">
        <RocketOutlined className="card-title-icon" />
        使用场景
      </span>
    }>
      <List
        dataSource={scenarios}
        renderItem={(item, index) => (
          <List.Item className="scenario-item">
            <span className="scenario-number">{index + 1}</span>
            <span className="scenario-text">{item}</span>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default UsageScenario
