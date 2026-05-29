package com.teamscope.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 团队成员实体
 * <p>
 * 对应数据库表 ts_member，存储团队成员基本信息，
 * 通过 role_code 关联 ts_role_config 获取角色详情
 */
@Data
@TableName("ts_member")
public class Member {

    /** 主键ID，自增 */
    @TableId(type = IdType.AUTO)
    private Long id;

    /** 成员姓名 */
    private String name;

    /** 邮箱 */
    private String email;

    /** 手机号 */
    private String phone;

    /**
     * 角色编码，关联 ts_role_config.role_code
     * 注意：角色被删除后此字段保留原始值，不会级联置空
     */
    private String roleCode;

    /** 头像URL */
    private String avatarUrl;

    /** 状态：1-在职 0-离职 */
    private Integer status;

    /** 备注信息 */
    private String remark;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}
