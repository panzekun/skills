import { Tag } from 'antd'
import type { Skill } from '../../types/skill'
import './styles.css'

interface SkillHeaderProps {
  skill: Skill
}

const categoryNames: Record<string, string> = {
  planning: '规划',
  development: '开发',
  optimization: '优化',
  debugging: '调试',
  integration: '集成',
  documentation: '文档'
}

const SkillHeader = ({ skill }: SkillHeaderProps) => {
  return (
    <div className="skill-header">
      <div className="skill-icon-large">
        {skill.icon}
      </div>
      <h1 className="skill-title">
        {skill.name}
      </h1>
      <p className="skill-name-en">
        {skill.nameEn}
      </p>
      <p className="skill-description">
        {skill.description}
      </p>
      <Tag className="skill-category-tag" color="blue">
        {categoryNames[skill.category] || skill.category}
      </Tag>
    </div>
  )
}

export default SkillHeader
