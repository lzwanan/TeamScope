package com.teamscope.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.teamscope.common.PageResult;
import com.teamscope.dto.MemberDTO;
import com.teamscope.dto.MemberSaveDTO;
import com.teamscope.entity.Member;
import com.teamscope.entity.RoleConfig;
import com.teamscope.mapper.MemberMapper;
import com.teamscope.mapper.RoleConfigMapper;
import com.teamscope.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 团队成员 Service 实现
 * <p>
 * 核心业务逻辑：
 * - 分页查询：LEFT JOIN 角色表，一次查询返回角色名称
 * - 导入：批量插入前校验角色是否存在
 * - 导出：将数据库查询结果转换为 Excel 行数据
 */
@Service
@RequiredArgsConstructor
public class MemberServiceImpl
        extends ServiceImpl<MemberMapper, Member>
        implements MemberService {

    private final MemberMapper memberMapper;
    private final RoleConfigMapper roleConfigMapper;

    /**
     * 分页查询成员列表
     * <p>
     * 使用 MyBatis-Plus 分页插件 + 自定义 SQL（LEFT JOIN ts_role_config），
     * 直接返回含角色名称的 DTO 列表，前端无需二次查询
     */
    @Override
    public PageResult<MemberDTO> pageMembers(int page, int size, String roleCode, String keyword) {
        Page<MemberDTO> mpPage = new Page<>(page, size);
        Page<MemberDTO> result = memberMapper.selectMemberPage(mpPage, roleCode, keyword);
        return new PageResult<>(result.getTotal(), result.getRecords(), result.getCurrent(), result.getSize());
    }

    /**
     * 新增成员
     * <p>
     * 1. 将 DTO 属性拷贝到实体
     * 2. 插入数据库
     * 3. 回查带角色名称的完整信息返回
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public MemberDTO addMember(MemberSaveDTO dto) {
        Member member = new Member();
        BeanUtils.copyProperties(dto, member);
        save(member);
        return getMemberById(member.getId());
    }

    /**
     * 更新成员
     * <p>
     * 执行全量更新，DTO 中的每个字段都会覆盖数据库中的对应字段
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public MemberDTO updateMember(Long id, MemberSaveDTO dto) {
        Member member = getById(id);
        if (member == null) {
            throw new RuntimeException("成员不存在: id=" + id);
        }
        BeanUtils.copyProperties(dto, member);
        member.setId(id); // 确保ID不被覆盖
        updateById(member);
        return getMemberById(id);
    }

    /**
     * 获取成员详情（含角色名称）
     * <p>
     * 先查成员基础信息，再查角色表填充 roleName
     */
    @Override
    public MemberDTO getMemberById(Long id) {
        Member member = getById(id);
        if (member == null) {
            return null;
        }
        MemberDTO dto = new MemberDTO();
        BeanUtils.copyProperties(member, dto);
        // 填充角色名称
        RoleConfig roleConfig = roleConfigMapper.selectOne(
                new LambdaQueryWrapper<RoleConfig>()
                        .eq(RoleConfig::getRoleCode, member.getRoleCode())
        );
        if (roleConfig != null) {
            dto.setRoleName(roleConfig.getRoleName());
        }
        return dto;
    }

    /**
     * 导出全部成员数据（含角色名称）
     * <p>
     * 用于生成 Excel 文件，返回完整列表不做分页
     */
    @Override
    public List<MemberDTO> exportAllMembers() {
        // 复用分页查询方法，传入足够大的 page 获取全量数据
        PageResult<MemberDTO> pageResult = pageMembers(1, 10000, null, null);
        return pageResult.getRecords();
    }

    /**
     * 批量导入成员
     * <p>
     * 流程：
     * 1. 查询全部角色编码做校验基准
     * 2. 过滤掉角色不存在的行
     * 3. 批量插入
     *
     * @param list Excel 解析出的成员数据
     * @return 实际导入的条数
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int importMembers(List<MemberSaveDTO> list) {
        if (list == null || list.isEmpty()) {
            return 0;
        }

        // 获取全部有效角色编码做校验
        List<RoleConfig> roles = roleConfigMapper.selectList(null);
        Map<String, String> validRoleCodes = roles.stream()
                .collect(Collectors.toMap(RoleConfig::getRoleCode, RoleConfig::getRoleName));

        List<Member> members = new ArrayList<>();
        for (MemberSaveDTO dto : list) {
            // 只导入角色编码在系统中存在的行
            if (dto.getRoleCode() == null || !validRoleCodes.containsKey(dto.getRoleCode())) {
                continue;
            }
            Member member = new Member();
            BeanUtils.copyProperties(dto, member);
            members.add(member);
        }

        if (!members.isEmpty()) {
            saveBatch(members);
        }
        return members.size();
    }
}
