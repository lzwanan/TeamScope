import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Moon, Sun, Sparkles } from 'lucide-react';
import { navigationItems } from '@/config/navigation';
import { useTheme } from '@/shared/hooks/useTheme';

const iconMap: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  Users: Users,
  Sparkles: Sparkles,
};

/**
 * Notion 风格布局壳
 * <p>
 * 极简左侧导航 + 顶部留白标题栏 + 主题切换。
 * 导航完全由 config/navigation.ts 配置驱动。
 */
export default function AuroraShell() {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-notion-bg dark:bg-notion-dark-bg">
      {/* ─── 左侧导航 (Notion sidebar) ─── */}
      <aside className="w-56 flex-shrink-0 flex flex-col
                        bg-notion-bg dark:bg-notion-dark-bg
                        border-r border-notion-border dark:border-notion-dark-border">
        {/* Workspace switcher */}
        <div className="h-11 flex items-center px-3 gap-2">
          <Sparkles className="w-4 h-4 text-notion-dim dark:text-notion-dark-dim flex-shrink-0" />
          <span className="text-[13px] font-semibold text-notion-text dark:text-notion-dark-text truncate">
            TeamScope
          </span>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              {renderIcon(item.icon, iconMap)}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 底部：主题切换 */}
        <div className="px-2 py-2 border-t border-notion-border dark:border-notion-dark-border">
          <button
            onClick={toggle}
            className="sidebar-link w-full"
            title={theme === 'light' ? '切换到暗色主题' : '切换到浅色主题'}
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4 flex-shrink-0" />
                <span>暗色模式</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 flex-shrink-0" />
                <span>浅色模式</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ─── 右侧内容区 ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶栏（仅留白，Notion 风格） */}
        <header className="h-11 flex items-center px-6 flex-shrink-0
                          bg-notion-bg dark:bg-notion-dark-bg
                          border-b border-notion-border dark:border-notion-dark-border">
          <span className="text-[13px] text-notion-dim dark:text-notion-dark-dim font-medium">
            云服务团队效能工具箱
          </span>
        </header>

        {/* 内容 */}
        <main className="flex-1 overflow-y-auto px-12 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function renderIcon(name: string, map: Record<string, React.ElementType>) {
  const Icon = map[name];
  if (Icon) return <Icon className="w-4 h-4 flex-shrink-0" />;
  return <Sparkles className="w-4 h-4 flex-shrink-0" />;
}
