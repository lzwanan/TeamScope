package com.teamscope.dto;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 成员列表查询响应 DTO
 * <p>
 * 相比实体类额外包含角色名称，避免前端二次查询。
 * @ExcelProperty 注解定义 Excel 导出时的列头和列宽
 */
@Data
public class MemberDTO {

    /** 成员ID，Excel 导出时忽略 */
    @ExcelIgnore
    private Long id;

    /** 成员姓名 */
    @ExcelProperty(value = "姓名", index = 0)
    @ColumnWidth(12)
    private String name;

    /** 邮箱 */
    @ExcelProperty(value = "邮箱", index = 1)
    @ColumnWidth(25)
    private String email;

    /** 手机号 */
    @ExcelProperty(value = "手机号", index = 2)
    @ColumnWidth(15)
    private String phone;

    /** 角色编码，Excel 导出时忽略（有角色名称即可） */
    @ExcelIgnore
    private String roleCode;

    /** 角色名称 */
    @ExcelProperty(value = "角色", index = 3)
    @ColumnWidth(14)
    private String roleName;

    /** 头像URL */
    @ExcelIgnore
    private String avatarUrl;

    /** 状态文字：在职/离职 */
    @ExcelProperty(value = "状态", index = 4)
    @ColumnWidth(8)
    private String statusText;

    /** 状态值，Excel 忽略（用 statusText 展示） */
    @ExcelIgnore
    private Integer status;

    /** 备注 */
    @ExcelProperty(value = "备注", index = 5)
    @ColumnWidth(30)
    private String remark;

    /** 创建时间 */
    @ExcelIgnore
    private LocalDateTime createdAt;

    /** 更新时间 */
    @ExcelIgnore
    private LocalDateTime updatedAt;

    /**
     * 获取状态文字描述
     * <p>
     * EasyExcel 导出时通过 getter 方法自动写入 statusText 列
     */
    public String getStatusText() {
        if (status == null) return "未知";
        return status == 1 ? "在职" : "离职";
    }
}
