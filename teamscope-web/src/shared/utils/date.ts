/**
 * 日期工具函数
 */

/** 格式化日期为 yyyy-MM-dd */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 格式化日期为 yyyy-MM-dd HH:mm */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${h}:${min}`;
}

/**
 * 计算剩余/超期天数
 * @returns { days: 相差天数(正=剩余, 负=超期), text: 描述文字, isOverdue: 是否超期 }
 */
export function calcDaysRemaining(targetDate: string | Date): {
  days: number;
  text: string;
  isOverdue: boolean;
} {
  const now = new Date();
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  // 只比较日期部分
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDateOnly = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diff = targetDateOnly.getTime() - nowDate.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return { days, text: `剩余 ${days} 天`, isOverdue: false };
  if (days === 0) return { days: 0, text: '今天截止', isOverdue: false };
  return { days, text: `已超期 ${Math.abs(days)} 天`, isOverdue: true };
}
