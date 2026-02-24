import { useState, useEffect } from 'react'
import HeroSection from '../../components/HeroSection'
import SkillsGrid from '../../components/SkillsGrid'
import QuickGuide from '../../components/QuickGuide'
import { skills } from '../../data/skills'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import './styles.css'

const HomePage = () => {
  const [loading, setLoading] = useState(true)

  useDocumentTitle('Claude Code 前端开发技能集')

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="home-page">
      <HeroSection />
      <SkillsGrid skills={skills} loading={loading} />
      <QuickGuide />
    </div>
  )
}

export default HomePage
