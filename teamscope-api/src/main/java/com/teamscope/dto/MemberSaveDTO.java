package com.teamscope.dto;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 成员新增/编辑请求 DTO
 * <p>
 * 同时作为 EasyExcel 导入时的行数据模型，
 * index 从 0 开始对应 Excel 列顺序
 */
@Data
public class MemberSaveDTO {

    /** 成员姓名 */
    @ExcelProperty(value = "姓名", index = 0)
    @ColumnWidth(12)
    @NotBlank(message = "成员姓名不能为空")
    @Size(max = 32, message = "成员姓名最长32个字符")
    private String name;

    /** 邮箱 */
    @ExcelProperty(value = "邮箱", index = 1)
    @ColumnWidth(25)
    @Size(max = 128, message = "邮箱最长128个字符")
    private String email;

    /** 手机号 */
    @ExcelProperty(value = "手机号", index = 2)
    @ColumnWidth(15)
    @Size(max = 32, message = "手机号最长32个字符")
    private String phone;

    /** 角色编码，导入时必须为系统中已存在的角色编码 */
    @ExcelProperty(value = "角色编码", index = 3)
    @ColumnWidth(14)
    @NotBlank(message = "角色编码不能为空")
    private String roleCode;

    /** 状态：1-在职 0-离职 */
    @ExcelProperty(value = "状态(1在职/0离职)", index = 4)
    @ColumnWidth(18)
    @NotNull(message = "状态不能为空")
    private Integer status;

    /** 备注 */
    @ExcelProperty(value = "备注", index = 5)
    @ColumnWidth(30)
    @Size(max = 256, message = "备注最长256个字符")
    private String remark;

    // avatarUrl 不参与 Excel 导入导出，保存时默认留空
    @Size(max = 256, message = "头像URL最长256个字符")
    private String avatarUrl;
}
