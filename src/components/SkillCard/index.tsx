import { Card, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { memo, useCallback } from 'react'
import type { Skill } from '../../types/skill'
import './styles.css'

interface SkillCardProps {
  skill: Skill
}

const SkillCard = memo(({ skill }: SkillCardProps) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/skills/${skill.id}`)
  }, [navigate, skill.id])

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="skill-card"
      styles={{
        body: { padding: '24px' }
      }}
    >
      <div className="skill-card-icon">
        {skill.icon}
      </div>
      <h3 className="skill-card-title">
        {skill.name}
      </h3>
      <p className="skill-card-description">
        {skill.description}
      </p>
      <div>
        <Tag color="blue">{skill.category}</Tag>
      </div>
    </Card>
  )
})

SkillCard.displayName = 'SkillCard'

export default SkillCard
