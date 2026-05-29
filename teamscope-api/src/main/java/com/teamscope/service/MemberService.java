package com.teamscope.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.teamscope.common.PageResult;
import com.teamscope.dto.MemberDTO;
import com.teamscope.dto.MemberSaveDTO;
import com.teamscope.entity.Member;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * 团队成员 Service 接口
 * <p>
 * 定义团队成员的业务方法，包括分页查询、批量导入导出
 */
public interface MemberService extends IService<Member> {

    /**
     * 分页查询成员列表，支持按角色和关键词筛选
     *
     * @param page     当前页码（1-based）
     * @param size     每页条数
     * @param roleCode 角色编码筛选，为 null 时查全部
     * @param keyword  姓名/邮箱模糊搜索，为 null 时忽略
     * @return 分页结果，每条记录含角色名称
     */
    PageResult<MemberDTO> pageMembers(int page, int size, String roleCode, String keyword);

    /**
     * 新增成员
     *
     * @param dto 成员信息
     * @return 新增后的成员（含生成的ID）
     */
    MemberDTO addMember(MemberSaveDTO dto);

    /**
     * 更新成员
     *
     * @param id  成员ID
     * @param dto 要更新的成员信息
     * @return 更新后的成员
     */
    MemberDTO updateMember(Long id, MemberSaveDTO dto);

    /**
     * 根据ID获取单个成员详情（含角色名称）
     *
     * @param id 成员ID
     * @return 成员DTO
     */
    MemberDTO getMemberById(Long id);

    /**
     * 导出全部成员为 Excel 数据列表
     *
     * @return 成员列表
     */
    List<MemberDTO> exportAllMembers();

    /**
     * 批量导入成员
     *
     * @param list 从 Excel 解析出的成员数据列表
     * @return 成功导入的条数
     */
    int importMembers(List<MemberSaveDTO> list);
}
