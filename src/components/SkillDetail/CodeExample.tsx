import { Card, Spin } from 'antd'
import { useState, useEffect, lazy, Suspense } from 'react'
import { CodeOutlined } from '@ant-design/icons'
import './styles.css'

const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then(module => ({
    default: module.Prism
  }))
)

interface CodeExampleProps {
  examples: string[]
  language?: string
}

const CodeExample = ({ examples, language = 'typescript' }: CodeExampleProps) => {
  const [style, setStyle] = useState<any>(null)

  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then(module => {
      setStyle(module.vscDarkPlus)
    })
  }, [])

  if (!style) {
    return (
      <Card className="detail-card" title={
        <span className="card-title">
          <CodeOutlined className="card-title-icon" />
          使用示例
        </span>
      }>
        <Spin />
      </Card>
    )
  }

  return (
    <Card className="detail-card" title={
      <span className="card-title">
        <CodeOutlined className="card-title-icon" />
        使用示例
      </span>
    }>
      {examples.map((example, index) => (
        <div key={index} className="code-example-wrapper">
          <Suspense fallback={<Spin />}>
            <SyntaxHighlighter
              language={language}
              style={style}
              customStyle={{
                borderRadius: '12px',
                fontSize: '14px',
                margin: 0,
                padding: '20px',
              }}
            >
              {example}
            </SyntaxHighlighter>
          </Suspense>
        </div>
      ))}
    </Card>
  )
}

export default CodeExample
