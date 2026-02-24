import { useParams, useNavigate } from 'react-router-dom'
import { Result, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { getSkillById } from '../../utils/skillHelper'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import SkillHeader from '../../components/SkillDetail/SkillHeader'
import UsageScenario from '../../components/SkillDetail/UsageScenario'
import CoreFeatures from '../../components/SkillDetail/CoreFeatures'
import CodeExample from '../../components/SkillDetail/CodeExample'
import './styles.css'

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>()
  const navigate = useNavigate()
  const skill = skillId ? getSkillById(skillId) : undefined

  useDocumentTitle(skill ? `${skill.name} - Claude Code 技能集` : '技能不存在')

  if (!skill) {
    return (
      <div className="skill-detail-error">
        <Result
          status="404"
          title="技能不存在"
          subTitle="抱歉，您访问的技能不存在"
        />
      </div>
    )
  }

  return (
    <div className="skill-detail-page">
      <div className="skill-detail-container">
        <Breadcrumb
          className="skill-breadcrumb"
          items={[
            {
              href: '/',
              title: (
                <>
                  <HomeOutlined />
                  <span>首页</span>
                </>
              ),
            },
            {
              title: skill.name,
            },
          ]}
        />

        <SkillHeader skill={skill} />
        <UsageScenario scenarios={skill.scenarios} />
        <CoreFeatures features={skill.features} />
        <CodeExample examples={skill.examples} />

        <div className="usage-guide-section">
          <h3 className="usage-guide-title">使用指南</h3>
          <p className="usage-guide-content">{skill.usageGuide}</p>
        </div>
      </div>
    </div>
  )
}

export default SkillDetailPage
