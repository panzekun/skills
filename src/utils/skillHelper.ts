import type { Skill } from '../types/skill'
import { skills } from '../data/skills'

/**
 * 获取所有技能
 */
export const getAllSkills = (): Skill[] => {
  return skills
}

/**
 * 根据 ID 获取技能
 */
export const getSkillById = (id: string): Skill | undefined => {
  return skills.find((skill) => skill.id === id)
}

/**
 * 按分类获取技能
 */
export const getSkillsByCategory = (category: string): Skill[] => {
  return skills.filter((skill) => skill.category === category)
}

/**
 * 搜索技能（根据名称或描述）
 */
export const searchSkills = (keyword: string): Skill[] => {
  const lowerKeyword = keyword.toLowerCase()
  return skills.filter(
    skill =>
      skill.name.toLowerCase().includes(lowerKeyword) ||
      skill.description.toLowerCase().includes(lowerKeyword) ||
      skill.scenarios.some(s => s.toLowerCase().includes(lowerKeyword))
  )
}

/**
 * 获取所有分类
 */
export const getAllCategories = (): string[] => {
  const categories = new Set(skills.map(skill => skill.category))
  return Array.from(categories)
}

/**
 * 获取分类统计
 */
export const getCategoryStats = (): Record<string, number> => {
  const stats: Record<string, number> = {}
  skills.forEach(skill => {
    stats[skill.category] = (stats[skill.category] || 0) + 1
  })
  return stats
}
