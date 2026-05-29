package com.teamscope.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 角色新增/编辑请求 DTO
 */
@Data
public class RoleConfigSaveDTO {

    /** 角色名称 */
    @NotBlank(message = "角色名称不能为空")
    @Size(max = 64, message = "角色名称最长64个字符")
    private String roleName;

    /** 角色编码，系统内唯一 */
    @NotBlank(message = "角色编码不能为空")
    @Size(max = 32, message = "角色编码最长32个字符")
    private String roleCode;

    /** 核心职责描述 */
    @Size(max = 512, message = "职责描述最长512个字符")
    private String coreDuty;

    /** 排序序号 */
    @NotNull(message = "排序序号不能为空")
    private Integer sortOrder;
}
