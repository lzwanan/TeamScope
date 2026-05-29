import type React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * 确认删除弹窗 — Notion 风格
 */
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="notion-overlay" onClick={onCancel}>
      <div className="notion-dialog max-w-sm" onClick={e => e.stopPropagation()}>
        <h3 className="text-[15px] font-semibold text-notion-text dark:text-notion-dark-text mb-2">
          {title}
        </h3>
        <p className="text-[13px] text-notion-dim dark:text-notion-dark-dim mb-6">
          {message}
        </p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="notion-btn-secondary">取消</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="notion-btn-primary !bg-notion-red hover:!bg-red-600 disabled:opacity-50"
          >
            {loading ? '删除中...' : '确认删除'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────

interface FormDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  submitLabel?: string;
}

/**
 * 通用表单弹窗 — Notion 风格
 */
export function FormDialog({ open, title, children, onClose, onSubmit, loading, submitLabel = '保存' }: FormDialogProps) {
  if (!open) return null;

  return (
    <div className="notion-overlay" onClick={onClose}>
      <div className="notion-dialog" onClick={e => e.stopPropagation()}>
        <h3 className="text-[15px] font-semibold text-notion-text dark:text-notion-dark-text mb-5">
          {title}
        </h3>

        <div className="space-y-4">{children}</div>

        <div className="flex gap-2 justify-end mt-6">
          <button onClick={onClose} className="notion-btn-secondary">取消</button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="notion-btn-primary disabled:opacity-50"
          >
            {loading ? '保存中...' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
