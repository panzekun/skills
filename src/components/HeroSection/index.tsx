import './styles.css'

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Claude Code 前端开发技能集
        </h1>
        <p className="hero-subtitle">
          7 个专项技能，助力前端开发提效
        </p>
        <p className="hero-description">
          从需求拆解到代码提交，覆盖前端开发全流程
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">7+</div>
            <div className="stat-label">专项技能</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">覆盖率</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10x</div>
            <div className="stat-label">效率提升</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
