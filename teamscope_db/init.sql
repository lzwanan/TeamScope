-- ============================================================
-- TeamScope 数据库初始化脚本
-- 数据库: teamscope_db
-- 编码:   utf8mb4 / utf8mb4_unicode_ci
-- ============================================================

CREATE DATABASE IF NOT EXISTS teamscope_db
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE teamscope_db;

-- ============================================================
-- 1. 角色配置表 (ts_role_config)
-- 存储团队中所有角色的定义，如项目经理、产品经理等
-- ============================================================
DROP TABLE IF EXISTS ts_role_config;
CREATE TABLE ts_role_config (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY  COMMENT '主键ID',
    role_name       VARCHAR(64)     NOT NULL                    COMMENT '角色名称，如 项目经理/产品经理/架构师',
    role_code       VARCHAR(32)     NOT NULL UNIQUE             COMMENT '角色编码，如 pm/pd/architect，用于系统内唯一标识',
    core_duty       VARCHAR(512)    NOT NULL DEFAULT ''         COMMENT '核心职责描述',
    sort_order      INT             NOT NULL DEFAULT 0          COMMENT '排序序号，数值越小越靠前',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色配置表';

-- ============================================================
-- 2. 团队成员表 (ts_member)
-- 存储团队成员基本信息，关联角色配置
-- ============================================================
DROP TABLE IF EXISTS ts_member;
CREATE TABLE ts_member (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY  COMMENT '主键ID',
    name            VARCHAR(32)     NOT NULL                    COMMENT '成员姓名',
    email           VARCHAR(128)    DEFAULT ''                  COMMENT '邮箱',
    phone           VARCHAR(32)     DEFAULT ''                  COMMENT '手机号',
    role_code       VARCHAR(32)     NOT NULL                    COMMENT '角色编码，关联 ts_role_config.role_code',
    -- 当角色配置表中的角色被删除后，此字段保留最后一次赋值的 role_code，不会置空或级联删除
    avatar_url      VARCHAR(256)    DEFAULT ''                  COMMENT '头像URL',
    status          TINYINT         NOT NULL DEFAULT 1          COMMENT '状态：1-在职 0-离职',
    remark          VARCHAR(256)    DEFAULT ''                  COMMENT '备注信息',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_role_code (role_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='团队成员表';

-- ============================================================
-- 3. 角色配置表 - 初始化数据
-- 预置 8 种标准角色
-- ============================================================
INSERT INTO ts_role_config (role_name, role_code, core_duty, sort_order) VALUES
('项目经理',   'pm',          '进度风险同步',                        1),
('产品经理',   'pd',          '需求梳理, 原型设计, 版本规划, 客户对接',   2),
('架构师',     'architect',   '架构设计, 技术选型, 架构评审, 技术难点攻克', 3),
('TSE',        'tse',         '转测信息同步',                        4),
('后端研发',   'backend',     '后端研发端到端的相关事务',              5),
('前端研发',   'frontend',    '前端研发端到端的相关事务',              6),
('测试工程师', 'qa',          '版本需求质量保障',                    7),
('运维工程师', 'ops',         '现网环境运维',                        8);
