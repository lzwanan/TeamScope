package com.teamscope.controller;

import com.teamscope.common.Result;
import com.teamscope.dto.RoleConfigSaveDTO;
import com.teamscope.entity.RoleConfig;
import com.teamscope.service.RoleConfigService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 角色配置 REST 接口
 * <p>
 * 路径前缀: /api/v1/role-configs
 * 提供角色的 CRUD 及全量列表查询
 */
@RestController
@RequestMapping("/api/v1/role-configs")
@RequiredArgsConstructor
public class RoleConfigController {

    private final RoleConfigService roleConfigService;

    /**
     * 获取全部角色列表（按排序字段升序）
     * <p>
     * 前端下拉选择角色时调用此接口
     *
     * @return 角色列表
     */
    @GetMapping
    public Result<List<RoleConfig>> list() {
        List<RoleConfig> list = roleConfigService.lambdaQuery()
                .orderByAsc(RoleConfig::getSortOrder)
                .list();
        return Result.ok(list);
    }

    /**
     * 根据ID获取单个角色
     *
     * @param id 角色ID
     */
    @GetMapping("/{id}")
    public Result<RoleConfig> getById(@PathVariable Long id) {
        RoleConfig roleConfig = roleConfigService.getById(id);
        return Result.ok(roleConfig);
    }

    /**
     * 新增角色
     * <p>
     * @Valid 触发 Jakarta Validation，校验失败自动返回 400
     *
     * @param dto 角色信息
     */
    @PostMapping
    public Result<RoleConfig> add(@Valid @RequestBody RoleConfigSaveDTO dto) {
        RoleConfig roleConfig = new RoleConfig();
        org.springframework.beans.BeanUtils.copyProperties(dto, roleConfig);
        roleConfigService.save(roleConfig);
        return Result.ok(roleConfig);
    }

    /**
     * 更新角色
     *
     * @param id  角色ID
     * @param dto 要更新的角色信息
     */
    @PutMapping("/{id}")
    public Result<RoleConfig> update(@PathVariable Long id, @Valid @RequestBody RoleConfigSaveDTO dto) {
        RoleConfig roleConfig = roleConfigService.getById(id);
        if (roleConfig == null) {
            return Result.badRequest("角色不存在");
        }
        org.springframework.beans.BeanUtils.copyProperties(dto, roleConfig);
        roleConfig.setId(id);
        roleConfigService.updateById(roleConfig);
        return Result.ok(roleConfig);
    }

    /**
     * 删除角色
     * <p>
     * 注意：删除角色不会级联影响已有成员，成员的 role_code 字段保留原值
     *
     * @param id 角色ID
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        roleConfigService.removeById(id);
        return Result.ok();
    }
}
