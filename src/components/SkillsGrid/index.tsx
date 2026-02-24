import { Row, Col, Typography, Input, Select } from 'antd'
import { useState, useMemo, useCallback } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import SkillCard from '../SkillCard'
import SkillCardSkeleton from '../SkillCardSkeleton'
import type { Skill } from '../../types/skill'
import './styles.css'

const { Title } = Typography
const { Option } = Select

interface SkillsGridProps {
  skills: Skill[]
  loading?: boolean
}

const categoryNames: Record<string, string> = {
  all: '全部',
  planning: '规划',
  development: '开发',
  optimization: '优化',
  debugging: '调试',
  integration: '集成',
  documentation: '文档'
}

const SkillsGrid = ({ skills, loading = false }: SkillsGridProps) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = useCallback((value: string) => {
    setSearchText(value)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value)
  }, [])

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchText.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchText.toLowerCase()) ||
        skill.scenarios.some(s => s.toLowerCase().includes(searchText.toLowerCase()))

      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [skills, searchText, selectedCategory])

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category))
    return ['all', ...Array.from(cats)]
  }, [skills])

  return (
    <div className="skills-grid-container">
      <div className="skills-header">
        <Title level={2}>技能列表</Title>
        
        <div className="skills-filters">
          <Input
            placeholder="搜索技能、场景..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            allowClear
          />

          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                {categoryNames[cat]}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} lg={8}>
              <SkillCardSkeleton />
            </Col>
          ))
        ) : (
          filteredSkills.map(skill => (
            <Col key={skill.id} xs={24} sm={12} lg={8}>
              <SkillCard skill={skill} />
            </Col>
          ))
        )}
      </Row>

      {!loading && filteredSkills.length === 0 && (
        <div className="no-results">
          <p>未找到匹配的技能</p>
        </div>
      )}
    </div>
  )
}

export default SkillsGrid
