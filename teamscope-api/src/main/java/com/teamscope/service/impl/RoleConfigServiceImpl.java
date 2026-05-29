package com.teamscope.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.teamscope.entity.RoleConfig;
import com.teamscope.mapper.RoleConfigMapper;
import com.teamscope.service.RoleConfigService;
import org.springframework.stereotype.Service;

/**
 * 角色配置 Service 实现
 * <p>
 * 继承 ServiceImpl 获得 MyBatis-Plus 内置的批量 CRUD 能力
 */
@Service
public class RoleConfigServiceImpl
        extends ServiceImpl<RoleConfigMapper, RoleConfig>
        implements RoleConfigService {
}
