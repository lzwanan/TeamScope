import { Sparkles, Users, Target, Calendar } from 'lucide-react';

/**
 * 仪表盘页面
 * <p>
 * 展示团队整体概览：成员统计、版本状态、近期事项
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 欢迎横幅 - 极光渐变 */}
      <div className="aurora-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5" />
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">TeamScope</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md">
            极光之下，效能之上 — 让云服务团队的每一个角色、需求、版本都清晰可见
          </p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5 text-purple-600" />}
          label="团队成员"
          value="--"
          sub="请先配置团队成员"
        />
        <StatCard
          icon={<Target className="w-5 h-5 text-blue-600" />}
          label="进行中需求"
          value="--"
          sub="需求管理模块即将上线"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5 text-cyan-600" />}
          label="活跃版本"
          value="--"
          sub="版本管理模块即将上线"
        />
      </div>

      {/* 快速入口 */}
      <div className="aurora-card p-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">⚡ 快速开始</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <QuickLink title="配置角色 & 成员" desc="定义团队角色，添加成员信息" href="/team" />
          <QuickLink title="导入需求表" desc="通过 Excel 批量导入团队需求" href="" disabled />
          <QuickLink title="创建版本" desc="新建版本并关联需求、设置阶段节点" href="" disabled />
          <QuickLink title="查看进度" desc="版本流水线可视化，时间预警一目了然" href="" disabled />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="aurora-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">{icon}</div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  );
}

function QuickLink({ title, desc, href, disabled }: { title: string; desc: string; href: string; disabled?: boolean }) {
  const cn = disabled
    ? 'aurora-card p-4 opacity-50 cursor-not-allowed'
    : 'aurora-card p-4 cursor-pointer';

  const content = (
    <>
      <h4 className="text-sm font-medium text-gray-800 mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{desc}</p>
    </>
  );

  if (disabled) return <div className={cn}>{content}</div>;
  return (
    <a href={href} className={cn}>
      {content}
    </a>
  );
}
