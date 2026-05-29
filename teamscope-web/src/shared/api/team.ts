import request from './request';
import type { ApiResult, PageResult, Member, MemberSaveDTO, RoleConfig, RoleConfigSaveDTO } from '@/shared/types';

/** 角色配置 API */
export const roleApi = {
  /** 获取全部角色列表（按排序字段升序） */
  list: () => request.get<ApiResult<RoleConfig[]>>('/role-configs'),

  /** 新增角色 */
  add: (data: RoleConfigSaveDTO) => request.post<ApiResult<RoleConfig>>('/role-configs', data),

  /** 更新角色 */
  update: (id: number, data: RoleConfigSaveDTO) => request.put<ApiResult<RoleConfig>>(`/role-configs/${id}`, data),

  /** 删除角色 */
  delete: (id: number) => request.delete<ApiResult>(`/role-configs/${id}`),
};

/** 团队成员 API */
export const memberApi = {
  /** 分页查询成员 */
  page: (params: { page: number; size: number; roleCode?: string; keyword?: string }) =>
    request.get<ApiResult<PageResult<Member>>>('/members', { params }),

  /** 获取成员详情 */
  getById: (id: number) => request.get<ApiResult<Member>>(`/members/${id}`),

  /** 新增成员 */
  add: (data: MemberSaveDTO) => request.post<ApiResult<Member>>('/members', data),

  /** 更新成员 */
  update: (id: number, data: MemberSaveDTO) => request.put<ApiResult<Member>>(`/members/${id}`, data),

  /** 删除成员 */
  delete: (id: number) => request.delete<ApiResult>(`/members/${id}`),

  /** 导出 Excel */
  exportUrl: '/api/v1/members/export',

  /** 导入 Excel */
  import: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post<ApiResult<string>>('/members/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
