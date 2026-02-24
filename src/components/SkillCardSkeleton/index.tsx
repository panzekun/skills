import { Card, Skeleton } from 'antd'
import { memo } from 'react'

const SkillCardSkeleton = memo(() => {
  return (
    <Card style={{ height: '100%' }}>
      <Skeleton.Avatar size={48} active style={{ marginBottom: 16 }} />
      <Skeleton active paragraph={{ rows: 3 }} />
    </Card>
  )
})

SkillCardSkeleton.displayName = 'SkillCardSkeleton'

export default SkillCardSkeleton
