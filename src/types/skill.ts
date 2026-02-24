export interface Skill {
  id: string
  name: string
  nameEn: string
  description: string
  icon: string
  category: string
  scenarios: string[]
  features: string[]
  examples: string[]
  usageGuide: string
}

export type SkillCategory =
  | 'planning'
  | 'development'
  | 'optimization'
  | 'debugging'
  | 'integration'
  | 'documentation'
