import { Card, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { Skill } from '../../types/skill'

interface RelatedSkillsProps {
  skills: Skill[]
}

const RelatedSkills = ({ skills }: RelatedSkillsProps) => {
  const navigate = useNavigate()

  if (skills.length === 0) {
    return null
  }

  return (
    <Card title="相关技能推荐" style={{ marginBottom: '24px' }}>
      <Row gutter={[16, 16]}>
        {skills.map((skill) => (
          <Col key={skill.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => navigate(`/skills/${skill.id}`)}
              style={{ height: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{skill.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{skill.name}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#999' }}>{skill.nameEn}</p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{skill.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default RelatedSkills
