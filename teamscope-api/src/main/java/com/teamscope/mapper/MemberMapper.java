package com.teamscope.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.teamscope.dto.MemberDTO;
import com.teamscope.entity.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 团队成员 Mapper
 * <p>
 * 自定义 SQL 方法：分页查询成员时关联角色表获取角色名称
 */
@Mapper
public interface MemberMapper extends BaseMapper<Member> {

    /**
     * 分页查询成员列表，LEFT JOIN 角色表获取角色名称
     *
     * @param page     分页对象（MyBatis-Plus Page）
     * @param roleCode 角色编码筛选条件，为 null 时查询全部
     * @param keyword  姓名/邮箱关键词模糊搜索，为 null 时忽略
     * @return 分页结果，每条记录为 MemberDTO（含 roleName）
     */
    @Select("<script>" +
            "SELECT m.*, r.role_name " +
            "FROM ts_member m " +
            "LEFT JOIN ts_role_config r ON m.role_code = r.role_code " +
            "<where>" +
            "  <if test='roleCode != null and roleCode != \"\"'>" +
            "    AND m.role_code = #{roleCode}" +
            "  </if>" +
            "  <if test='keyword != null and keyword != \"\"'>" +
            "    AND (m.name LIKE CONCAT('%', #{keyword}, '%') OR m.email LIKE CONCAT('%', #{keyword}, '%'))" +
            "  </if>" +
            "</where>" +
            "ORDER BY m.created_at DESC" +
            "</script>")
    Page<MemberDTO> selectMemberPage(Page<MemberDTO> page,
                                     @Param("roleCode") String roleCode,
                                     @Param("keyword") String keyword);
}
