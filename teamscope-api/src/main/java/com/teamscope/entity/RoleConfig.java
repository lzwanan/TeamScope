package com.teamscope.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 角色配置实体
 * <p>
 * 对应数据库表 ts_role_config，存储团队中所有角色定义
 */
@Data
@TableName("ts_role_config")
public class RoleConfig {

    /** 主键ID，自增 */
    @TableId(type = IdType.AUTO)
    private Long id;

    /** 角色名称，如 项目经理/产品经理/架构师 */
    private String roleName;

    /** 角色编码，系统内唯一标识，如 pm/pd/architect */
    private String roleCode;

    /** 核心职责描述 */
    private String coreDuty;

    /** 排序序号，数值越小越靠前 */
    private Integer sortOrder;

    /** 创建时间，插入时自动填充 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    /** 更新时间，插入和更新时自动填充 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
}
