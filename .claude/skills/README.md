# Claude Code 前端开发技能集

本文档汇总了所有可用的前端开发专项技能，帮助快速定位并使用合适的技能处理不同场景。

---

## 📋 技能列表总览

| 技能名称 | 触发场景 | 主要功能 |
|---------|---------|---------|
| [task-breakdown](#1-task-breakdown) | 需求拆解、开发计划 | 输出清晰的前端任务清单和风险点 |
| [ui-component-generator](#2-ui-component-generator) | 生成组件 | 生成生产级 React + TS 组件代码 |
| [performance-auditor](#3-performance-auditor) | 性能优化 | 前端性能排查与优化方案 |
| [page-scaffold](#4-page-scaffold) | 新建页面 | 生成标准后台页面结构和基础代码 |
| [debug-fixer](#5-debug-fixer) | 错误修复 | 定位根因并给出最小修复方案 |
| [api-integration-helper](#6-api-integration-helper) | 接口联调 | 生成请求层与数据 hooks |
| [pr-writer](#7-pr-writer) | 提交代码 | 生成清晰的 PR 变更说明 |

---

## 1. task-breakdown

**需求拆解与任务规划**

### 使用场景
- 接到新需求或 PRD 文档
- 需要评估开发工作量
- 制定前端开发计划

### 核心功能
1. ✅ 用一句话总结需求目标
2. ✅ 拆分前端任务清单：
   - 页面与路由
   - UI 模块（Table/Form/Modal）
   - 状态管理与交互逻辑
   - API 对接点
3. ⚠️ 标注风险点：
   - 权限控制
   - 大表格性能
   - 表单校验复杂度
4. 📝 输出推荐开发顺序（Checklist）

### 使用方式
```
请帮我拆解这个用户管理需求
```

---

## 2. ui-component-generator

**前端组件生成器**

### 使用场景
- 需要快速生成表单、表格、弹窗等常用组件
- 开发 CRUD 功能模块
- 生成可复用的业务组件

### 核心功能
1. ✅ 使用成熟 UI 组件库（默认 Ant Design）
2. ✅ 自动补全 TypeScript 类型定义
3. ✅ Props 清晰，可复用
4. ✅ Form 包含校验规则
5. ✅ Table 默认包含 rowKey
6. ✅ 输出完整组件代码（可直接复制使用）

### 常见场景
- 用户管理表格
- 新增/编辑弹窗表单
- 搜索过滤栏
- Drawer 详情面板

### 使用方式
```
帮我生成一个用户管理表格组件
生成一个编辑用户信息的弹窗表单
```

---

## 3. performance-auditor

**前端性能优化专家**

### 使用场景
- 首屏加载慢
- 页面交互卡顿
- Bundle 体积过大
- React 渲染频繁

### 核心功能
1. 🔍 判断问题类型：
   - 首屏加载慢
   - JS bundle 过大
   - React 渲染频繁
   - Table/List 卡顿
2. 📋 输出排查 checklist：
   - Lighthouse 指标
   - React Profiler
   - Bundle Analyzer
3. 💡 给出可落地优化建议：
   - 路由懒加载
   - 组件 memo/useMemo/useCallback
   - 虚拟列表
   - 按需加载 Ant Design
   - 图片与资源优化
4. 💻 输出推荐修改示例代码

### 使用方式
```
我的页面首屏加载很慢，帮我分析一下
这个表格滚动很卡，如何优化
```

---

## 4. page-scaffold

**后台页面脚手架生成器**

### 使用场景
- 新建后台管理页面
- 创建 CRUD 模块
- 搭建标准管理系统页面

### 核心功能
生成完整的页面结构：
- ✅ 页面 layout（Card + Space）
- ✅ 标题区 + 操作按钮区
- ✅ Table 区域占位
- ✅ Modal/Form 占位
- ✅ loading/error 状态

### 技术要求
- React + TypeScript
- 默认使用 Ant Design 组件
- 文件结构清晰，可直接运行
- 输出完整文件代码

### 使用方式
```
帮我生成一个用户管理页面
新建一个订单管理的后台页面
```

---

## 5. debug-fixer

**前端 Debug 专家**

### 使用场景
- TypeScript 类型报错
- React 渲染错误
- 构建失败
- 表单问题

### 处理流程
1. 🔍 解释错误根因
2. 📍 定位相关文件/组件
3. 🔧 给出最小 patch 修复
4. ⚠️ 避免破坏现有逻辑
5. ✅ 修复后给出验证建议

### 重点关注
- Form initialValues 不生效
- Table rowKey 缺失
- TS 类型不匹配
- useEffect 死循环
- React key 警告
- 构建依赖冲突

### 使用方式
```
这里有个 TypeScript 报错，帮我看看
表单的 initialValues 不生效，怎么办
```

---

## 6. api-integration-helper

**前后端接口集成助手**

### 使用场景
- 接口联调
- 生成 TypeScript types
- 创建 axios/react-query hooks

### 核心功能
1. ✅ 根据接口描述生成 TypeScript types
2. ✅ 生成 axios API 请求函数（api 层）
3. ✅ 生成 React Query hooks：
   - useQuery 列表查询
   - useMutation 新增/编辑/删除
4. ✅ 自动集成 UI 提示：
   - 成功 message.success
   - 失败 message.error
5. ✅ 输出完整可用代码，并建议目录结构

### 推荐目录结构
```
src/
├── api/         # 请求函数
├── hooks/       # React Query hooks
└── types/       # TypeScript 类型定义
```

### 使用方式
```
帮我生成用户列表接口的 types 和 hooks
根据这个接口文档生成请求层代码
```

---

## 7. pr-writer

**PR 文档助手**

### 使用场景
- 准备提交代码
- 编写 PR 描述
- 总结代码改动

### 输出内容
- ✅ **Summary**（改动摘要）
- ✅ **Features**（新增功能）
- ✅ **Fixes**（修复问题）
- ✅ **Testing**（测试情况）
- ✅ **Notes**（Reviewer 注意事项）

### 输出格式
符合 GitHub PR 模板：

```markdown
## Summary
简要说明本次 PR 的目的和改动范围

## Changes
- [Added] 新增的功能
- [Fixed] 修复的问题
- [Changed] 修改的内容

## Testing
- [ ] 单元测试
- [ ] 集成测试
- [ ] 手动测试

## Notes
提醒 Reviewer 需要关注的重点
```

### 使用方式
```
帮我写一个 PR 描述
总结一下这次的代码改动
```

---

## 🎯 快速选择指南

### 按开发阶段选择

| 开发阶段 | 推荐技能 |
|---------|---------|
| **需求分析** | task-breakdown |
| **搭建页面** | page-scaffold |
| **编写组件** | ui-component-generator |
| **接口联调** | api-integration-helper |
| **遇到 Bug** | debug-fixer |
| **性能问题** | performance-auditor |
| **提交代码** | pr-writer |

### 按问题类型选择

| 问题类型 | 推荐技能 |
|---------|---------|
| 不知道如何开始 | task-breakdown |
| 需要快速生成代码 | ui-component-generator, page-scaffold |
| 代码报错 | debug-fixer |
| 性能慢 | performance-auditor |
| 接口对接 | api-integration-helper |
| 代码提交 | pr-writer |

---

## 💡 使用建议

1. **组合使用**：可以在一个开发流程中组合使用多个技能
   - 先用 `task-breakdown` 拆解任务
   - 再用 `page-scaffold` 搭建页面
   - 然后用 `ui-component-generator` 生成组件
   - 用 `api-integration-helper` 对接接口
   - 最后用 `pr-writer` 输出 PR 描述

2. **明确场景**：在使用时明确说明你的场景和需求，技能会自动适配

3. **迭代优化**：生成的代码可以要求进一步优化和调整

---

## 📚 相关文档

- 每个技能的详细说明：参见各技能目录下的 `SKILL.md` 文件
- 技能配置：`/Users/zekun/.claude/skills/`

---

**最后更新时间：** 2026-02-13