/**
 * 时间预警标签 — Notion 风格
 * <p>
 * 传入目标日期，自动计算剩余/超期天数，用 Notion 色板微章展示
 */
interface TimeWarningProps {
  date: string;
  className?: string;
}

export default function TimeWarning({ date, className = '' }: TimeWarningProps) {
  const now = new Date();
  const target = new Date(date);
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diff = targetDate.getTime() - nowDate.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 7) return <span className={`badge badge-green ${className}`}>剩余 {days} 天</span>;
  if (days > 3) return <span className={`badge badge-blue ${className}`}>剩余 {days} 天</span>;
  if (days > 0) return <span className={`badge badge-orange ${className}`}>剩余 {days} 天</span>;
  if (days === 0) return <span className={`badge badge-orange ${className}`}>今天截止</span>;
  return <span className={`badge badge-red ${className}`}>已超期 {Math.abs(days)} 天</span>;
}

/**
 * 状态徽章
 */
interface StatusBadgeProps {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
  className?: string;
}

export function StatusBadge({ active, activeText = '在职', inactiveText = '离职', className = '' }: StatusBadgeProps) {
  return (
    <span className={`badge ${active ? 'badge-green' : 'badge-gray'} ${className}`}>
      {active ? activeText : inactiveText}
    </span>
  );
}
