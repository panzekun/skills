import { useState, useEffect } from 'react'
import { Card, Typography, Progress } from 'antd'
import {
  SearchOutlined,
  ReadOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import './styles.css'

const { Title, Paragraph } = Typography

const QuickGuide = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '选择技能',
      description: '浏览技能列表，找到适合当前任务的技能',
      icon: <SearchOutlined />
    },
    {
      title: '查看详情',
      description: '了解技能的使用场景、功能特性和示例',
      icon: <ReadOutlined />
    },
    {
      title: '开始使用',
      description: '按照使用指南，输入你的需求或问题',
      icon: <ThunderboltOutlined />
    },
    {
      title: '获得结果',
      description: '获取专业的分析、代码或解决方案',
      icon: <CheckCircleOutlined />
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [steps.length])

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="quick-guide-container">
      <div className="guide-header">
        <Title level={3} className="guide-title">
          快速开始
        </Title>
        <Paragraph className="guide-intro">
          只需 4 步，即可开始使用技能助手
        </Paragraph>
        <div className="progress-info">
          <span className="progress-text">{currentStep + 1}/4 完成</span>
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor={{
              '0%': '#667eea',
              '100%': '#764ba2',
            }}
            trailColor="rgba(0, 0, 0, 0.06)"
          />
        </div>
      </div>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`step-card ${
              index < currentStep ? 'completed' :
              index === currentStep ? 'active' :
              'waiting'
            }`}
          >
            <div className="step-icon-wrapper">
              <div className="step-icon">{step.icon}</div>
              {index < currentStep && (
                <div className="check-mark">
                  <CheckCircleOutlined />
                </div>
              )}
            </div>
            <div className="step-content">
              <h4 className="step-title">{step.title}</h4>
              <p className="step-description">{step.description}</p>
            </div>
            <div className="step-number">0{index + 1}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QuickGuide
