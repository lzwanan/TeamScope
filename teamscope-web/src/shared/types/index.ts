// 全局共享类型定义

/** API 统一响应结构（与后端 Result<T> 对应） */
export interface ApiResult<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 分页响应结构 */
export interface PageResult<T> {
  total: number;
  records: T[];
  page: number;
  size: number;
}

/** 角色配置 */
export interface RoleConfig {
  id: number;
  roleName: string;
  roleCode: string;
  coreDuty: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** 团队成员（含角色名称） */
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleCode: string;
  roleName: string;
  avatarUrl: string;
  status: number;
  statusText: string;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

/** 成员新增/编辑请求体 */
export interface MemberSaveDTO {
  name: string;
  email: string;
  phone: string;
  roleCode: string;
  avatarUrl?: string;
  status: number;
  remark: string;
}

/** 角色新增/编辑请求体 */
export interface RoleConfigSaveDTO {
  roleName: string;
  roleCode: string;
  coreDuty: string;
  sortOrder: number;
}
