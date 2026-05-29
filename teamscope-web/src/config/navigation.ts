/**
 * 导航菜单配置
 * <p>
 * 新增功能模块时在此添加一项即可在侧边栏显示。
 * icon 对应 AuroraShell 中的 iconMap 键名。
 */
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const navigationItems: NavItem[] = [
  { label: '仪表盘', path: '/', icon: 'Dashboard' },
  { label: '团队配置', path: '/team', icon: 'Users' },
];
