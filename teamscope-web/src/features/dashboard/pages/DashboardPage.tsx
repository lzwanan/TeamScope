import { Users, Target, Calendar, Sparkles, ArrowRight, Plus, ListTodo } from 'lucide-react';

/**
 * 仪表盘 — Notion 风格
 * <p>
 * 欢迎横幅 + 统计卡片 + 快速入口
 */
export default function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-200">
      {/* 页面标题 */}
      <h1 className="notion-page-title mb-8">仪表盘</h1>

      {/* 统计卡片行 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Users className="w-4 h-4" />}
          label="团队成员"
          value="—"
          sub="请先配置团队成员"
          color="blue"
        />
        <StatCard
          icon={<ListTodo className="w-4 h-4" />}
          label="进行中需求"
          value="—"
          sub="需求管理模块即将上线"
          color="green"
        />
        <StatCard
          icon={<Calendar className="w-4 h-4" />}
          label="活跃版本"
          value="—"
          sub="版本管理模块即将上线"
          color="purple"
        />
      </div>

      {/* 快速入口 */}
      <div className="notion-card p-6">
        <h3 className="notion-section-title">⚡ 快速开始</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <QuickCard
            title="配置角色 & 成员"
            desc="定义团队角色，添加团队成员信息"
            href="/team"
          />
          <QuickCard
            title="导入需求表"
            desc="通过 Excel 批量导入团队需求"
            disabled
          />
          <QuickCard
            title="创建版本"
            desc="新建版本并关联需求、设置阶段节点"
            disabled
          />
          <QuickCard
            title="查看进度"
            desc="版本流水线可视化，时间预警一目了然"
            disabled
          />
        </div>
      </div>

      {/* 空状态提示 */}
      <div className="notion-card p-8 mt-8 text-center">
        <Sparkles className="w-8 h-8 mx-auto mb-3 text-notion-dim dark:text-notion-dark-dim" />
        <p className="text-[14px] text-notion-dim dark:text-notion-dark-dim max-w-xs mx-auto leading-relaxed">
          TeamScope 正在成长中，更多功能即将上线
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string; sub: string; color: 'blue' | 'green' | 'purple';
}) {
  const colorMap = {
    blue:   'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    green:  'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  };
  return (
    <div className="notion-card p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-notion-dim dark:text-notion-dark-dim">
          {label}
        </span>
      </div>
      <div className="text-[28px] font-bold text-notion-text dark:text-notion-dark-text mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-[12px] text-notion-dim dark:text-notion-dark-dim">{sub}</div>
    </div>
  );
}

function QuickCard({ title, desc, href, disabled }: {
  title: string; desc: string; href?: string; disabled?: boolean;
}) {
  const classes = disabled
    ? 'notion-card p-4 opacity-40 cursor-not-allowed select-none'
    : 'notion-card p-4 cursor-pointer group';

  const inner = (
    <div className="flex items-center justify-between">
      <div className="min-w-0">
        <h4 className="text-[13px] font-medium text-notion-text dark:text-notion-dark-text mb-0.5">
          {title}
        </h4>
        <p className="text-[12px] text-notion-dim dark:text-notion-dark-dim truncate">
          {desc}
        </p>
      </div>
      {!disabled && (
        <div className="flex-shrink-0 ml-3 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-notion-dim dark:text-notion-dark-dim group-hover:text-notion-text dark:group-hover:text-notion-dark-text" />
          <ArrowRight className="w-3.5 h-3.5 text-notion-dim dark:text-notion-dark-dim group-hover:text-notion-text dark:group-hover:text-notion-dark-text opacity-0 group-hover:opacity-100 transition-opacity -ml-2" />
        </div>
      )}
    </div>
  );

  if (href && !disabled) return <a href={href} className={classes}>{inner}</a>;
  return <div className={classes}>{inner}</div>;
}
