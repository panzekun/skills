---
name: api-integration-helper
description: 当用户提到接口联调、生成 types、axios/react-query hooks 时，自动生成请求层与数据 hooks
---

你是前后端接口集成助手，专注于快速生成类型安全的 API 请求层代码。

## 核心功能

### 1. 代码生成内容

#### 📝 TypeScript 类型定义
- 请求参数类型
- 响应数据类型
- 分页参数类型
- 通用响应类型

#### 🌐 API 请求函数
- 基于 axios 的请求函数
- 统一的错误处理
- 请求/响应拦截器
- 类型安全的参数和返回值

#### 🪝 React Query Hooks
- `useQuery` - 数据查询（列表、详情）
- `useMutation` - 数据变更（新增、编辑、删除）
- 自动集成 loading/error 状态
- 自动集成 UI 提示（message）

### 2. 技术栈

- **HTTP 客户端**：axios
- **状态管理**：@tanstack/react-query (React Query)
- **UI 提示**：Ant Design message
- **类型系统**：TypeScript

### 3. 目录结构

```
src/
├── api/                    # API 请求层
│   ├── request.ts          # axios 实例配置
│   └── user.ts             # 用户相关接口
├── hooks/                  # React Query hooks
│   └── useUserData.ts      # 用户数据 hooks
└── types/                  # 类型定义
    ├── common.ts           # 通用类型
    └── user.ts             # 用户类型
```

## 代码模板

### 1. 通用类型定义（types/common.ts）

```typescript
/**
 * 通用 API 响应结构
 */
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 2. Axios 实例配置（api/request.ts）

```typescript
import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { code, data, message: msg } = response.data;

    // 业务错误处理
    if (code !== 0) {
      message.error(msg || '请求失败');
      return Promise.reject(new Error(msg || '请求失败'));
    }

    return data;
  },
  (error) => {
    // HTTP 错误处理
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          message.error('未授权，请重新登录');
          // 跳转到登录页
          break;
        case 403:
          message.error('没有权限访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error(error.message || '请求失败');
      }
    } else {
      message.error('网络错误，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

export default request;
```

### 3. 业务类型定义（types/user.ts）

```typescript
/**
 * 用户信息
 */
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * 用户列表查询参数
 */
export interface UserListParams extends PaginationParams {
  keyword?: string;
  role?: string;
  status?: string;
}

/**
 * 创建用户参数
 */
export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

/**
 * 更新用户参数
 */
export interface UpdateUserParams {
  id: string;
  username?: string;
  email?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive';
}
```

### 4. API 请求函数（api/user.ts）

```typescript
import request from './request';
import type {
  User,
  UserListParams,
  CreateUserParams,
  UpdateUserParams,
} from '@/types/user';
import type { PaginationResponse } from '@/types/common';

/**
 * 获取用户列表
 */
export const getUserList = (params: UserListParams) => {
  return request.get<any, PaginationResponse<User>>('/users', { params });
};

/**
 * 获取用户详情
 */
export const getUserDetail = (id: string) => {
  return request.get<any, User>(`/users/${id}`);
};

/**
 * 创建用户
 */
export const createUser = (data: CreateUserParams) => {
  return request.post<any, User>('/users', data);
};

/**
 * 更新用户
 */
export const updateUser = (data: UpdateUserParams) => {
  return request.put<any, User>(`/users/${data.id}`, data);
};

/**
 * 删除用户
 */
export const deleteUser = (id: string) => {
  return request.delete<any, void>(`/users/${id}`);
};

/**
 * 批量删除用户
 */
export const batchDeleteUsers = (ids: string[]) => {
  return request.post<any, void>('/users/batch-delete', { ids });
};
```

### 5. React Query Hooks（hooks/useUserData.ts）

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
} from '@/api/user';
import type { UserListParams, CreateUserParams, UpdateUserParams } from '@/types/user';

// Query Keys
const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * 获取用户列表
 */
export const useUserList = (params: UserListParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUserList(params),
  });
};

/**
 * 获取用户详情
 */
export const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserDetail(id),
    enabled: !!id, // 只有 id 存在时才执行
  });
};

/**
 * 创建用户
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserParams) => createUser(data),
    onSuccess: () => {
      message.success('创建成功');
      // 刷新列表
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: Error) => {
      message.error(error.message || '创建失败');
    },
  });
};

/**
 * 更新用户
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserParams) => updateUser(data),
    onSuccess: (_, variables) => {
      message.success('更新成功');
      // 刷新列表和详情
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
    },
    onError: (error: Error) => {
      message.error(error.message || '更新失败');
    },
  });
};

/**
 * 删除用户
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      message.success('删除成功');
      // 刷新列表
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error: Error) => {
      message.error(error.message || '删除失败');
    },
  });
};
```

### 6. 使用示例

```typescript
import React from 'react';
import { useUserList, useDeleteUser } from '@/hooks/useUserData';

const UserManagePage: React.FC = () => {
  const [params, setParams] = useState({ page: 1, pageSize: 20 });

  // 查询列表
  const { data, isLoading, error } = useUserList(params);

  // 删除用户
  const deleteMutation = useDeleteUser();

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* 渲染用户列表 */}
    </div>
  );
};
```

## 输出格式

```markdown
## 生成文件清单

1. `src/types/user.ts` - 用户类型定义
2. `src/api/user.ts` - 用户 API 请求函数
3. `src/hooks/useUserData.ts` - 用户数据 hooks

## 依赖安装

\`\`\`bash
npm install axios @tanstack/react-query
npm install -D @types/node
\`\`\`

## 配置说明

### 1. React Query Provider

在 `App.tsx` 中配置：

\`\`\`typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 你的应用 */}
    </QueryClientProvider>
  );
}
\`\`\`

### 2. 环境变量

在 `.env` 中配置：

\`\`\`
REACT_APP_API_BASE_URL=https://api.example.com
\`\`\`

## 使用说明

1. 将生成的文件放到对应目录
2. 安装依赖并配置 React Query Provider
3. 在组件中导入并使用 hooks
4. 根据实际 API 调整接口路径和参数
```

## 注意事项

1. **类型安全**：所有接口都要有明确的 TypeScript 类型
2. **错误处理**：统一在拦截器中处理，避免重复代码
3. **缓存策略**：合理使用 React Query 的缓存和刷新机制
4. **Query Keys**：使用统一的 key 管理，便于缓存失效
5. **环境配置**：API 地址要通过环境变量配置，不要硬编码