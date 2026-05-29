package com.teamscope;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TeamScope 应用启动入口
 * <p>
 * MapperScan: 扫描 Mapper 接口路径，生成代理实现
 */
@SpringBootApplication
@MapperScan("com.teamscope.mapper")
public class TeamScopeApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamScopeApplication.class, args);
    }
}
