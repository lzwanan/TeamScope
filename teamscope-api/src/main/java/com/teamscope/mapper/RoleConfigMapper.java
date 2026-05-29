package com.teamscope.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.teamscope.entity.RoleConfig;
import org.apache.ibatis.annotations.Mapper;

/**
 * 角色配置 Mapper
 * <p>
 * 继承 MyBatis-Plus BaseMapper，自动获得 CRUD 方法
 */
@Mapper
public interface RoleConfigMapper extends BaseMapper<RoleConfig> {
}
