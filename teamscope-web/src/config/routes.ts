import { lazy } from 'react';

/**
 * 路由配置表
 * <p>
 * 所有路由集中在此定义，新增页面只需在此添加一条配置。
 * 使用 React.lazy 实现代码分割，大页面按需加载。
 */

// 功能模块懒加载
const TeamPage = lazy(() => import('@/features/team/pages/TeamPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<unknown>>;
  /** 是否为首页（默认重定向到第一个匹配的） */
  index?: boolean;
}

export const routes: RouteConfig[] = [
  { path: '/', element: DashboardPage, index: true },
  { path: '/team', element: TeamPage },
];
