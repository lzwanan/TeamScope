import { useState, useEffect, useCallback, useRef } from 'react';
import { Upload, Download, Search, Plus, Pencil, Trash2, RefreshCw, ChevronLeft, ChevronRight, UploadIcon, Mail, UsersRound, UserPlus } from 'lucide-react';
import { memberApi, roleApi } from '@/shared/api/team';
import type { Member, RoleConfig, MemberSaveDTO, RoleConfigSaveDTO } from '@/shared/types';
import { StatusBadge } from '@/shared/components/business/TimeWarning';
import ConfirmDialog, { FormDialog } from '@/shared/components/ui/Dialog';

/**
 * 团队配置页面 — Notion 风格
 * <p>
 * Tab: 成员管理（默认）| 角色配置
 */
export default function TeamPage() {
  const [tab, setTab] = useState<'members' | 'roles'>('members');

  return (
    <div className="animate-in fade-in duration-200">
      {/* 页面头部 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="notion-page-title">团队配置</h1>
        <div className="flex bg-notion-hover dark:bg-notion-dark-hover rounded-notion p-0.5 gap-0.5">
          <button
            onClick={() => setTab('members')}
            className={`notion-tab ${tab === 'members' ? 'notion-tab-active' : ''}`}
          >
            成员管理
          </button>
          <button
            onClick={() => setTab('roles')}
            className={`notion-tab ${tab === 'roles' ? 'notion-tab-active' : ''}`}
          >
            角色配置
          </button>
        </div>
      </div>

      {tab === 'roles' ? <RolePanel /> : <MemberPanel />}
    </div>
  );
}

// ═══════════════════════ 角色配置面板 ═══════════════════════

function RolePanel() {
  const [roles, setRoles] = useState<RoleConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleConfig | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RoleConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<RoleConfigSaveDTO>({ roleName: '', roleCode: '', coreDuty: '', sortOrder: 0 });

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await roleApi.list(); setRoles(r.data.data); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditingRole(null);
    setForm({ roleName: '', roleCode: '', coreDuty: '', sortOrder: roles.length + 1 });
    setDialogOpen(true);
  };
  const openEdit = (r: RoleConfig) => {
    setEditingRole(r);
    setForm({ roleName: r.roleName, roleCode: r.roleCode, coreDuty: r.coreDuty, sortOrder: r.sortOrder });
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      editingRole ? await roleApi.update(editingRole.id, form) : await roleApi.add(form);
      setDialogOpen(false); load();
    } finally { setSaving(false); }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { await roleApi.delete(deleteTarget.id); setDeleteTarget(null); load(); } catch { /* */ }
  };

  if (loading) return <div className="notion-empty"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />加载中...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-notion-dim dark:text-notion-dark-dim">
          {roles.length} 个角色
        </span>
        <button onClick={openAdd} className="notion-btn-primary flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> 新增角色
        </button>
      </div>

      {/* 角色卡片 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="notion-card p-4 group cursor-default">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-mono text-notion-blue dark:text-blue-400
                               bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-[6px]">
                {role.roleCode}
              </span>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity -mr-1">
                <button onClick={() => openEdit(role)}
                  className="p-1 rounded-[6px] hover:bg-notion-hover dark:hover:bg-notion-dark-hover text-notion-dim dark:text-notion-dark-dim">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteTarget(role)}
                  className="p-1 rounded-[6px] hover:bg-red-50 dark:hover:bg-red-500/10 text-notion-dim dark:text-notion-dark-dim hover:text-notion-red">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="text-[14px] font-semibold text-notion-text dark:text-notion-dark-text mb-1.5">
              {role.roleName}
            </h3>
            <p className="text-[12px] text-notion-dim dark:text-notion-dark-dim leading-relaxed line-clamp-2">
              {role.coreDuty}
            </p>
          </div>
        ))}
      </div>

      {/* 弹窗 */}
      <FormDialog open={dialogOpen} title={editingRole ? '编辑角色' : '新增角色'}
        onClose={() => setDialogOpen(false)} onSubmit={handleSave} loading={saving}>
        <Field label="角色名称" required>
          <input className="notion-input" value={form.roleName}
            onChange={e => setForm({ ...form, roleName: e.target.value })} placeholder="如 项目经理" />
        </Field>
        <Field label="角色编码" required>
          <input className="notion-input" value={form.roleCode}
            onChange={e => setForm({ ...form, roleCode: e.target.value })} placeholder="如 pm" />
        </Field>
        <Field label="核心职责">
          <textarea className="notion-input min-h-[60px] resize-none" value={form.coreDuty}
            onChange={e => setForm({ ...form, coreDuty: e.target.value })} placeholder="描述该角色的核心职责" />
        </Field>
        <Field label="排序序号">
          <input className="notion-input" type="number" value={form.sortOrder}
            onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} />
        </Field>
      </FormDialog>

      <ConfirmDialog open={!!deleteTarget} title="删除角色"
        message={`确认删除「${deleteTarget?.roleName}」？已关联的成员不会受到影响。`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </>
  );
}

// ═══════════════════════ 成员管理面板 ═══════════════════════

function MemberPanel() {
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const size = 10;
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [roles, setRoles] = useState<RoleConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<MemberSaveDTO>({ name: '', email: '', phone: '', roleCode: '', status: 1, remark: '' });

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const r = await memberApi.page({ page, size, roleCode: roleFilter || undefined, keyword: keyword || undefined });
      setMembers(r.data.data.records); setTotal(r.data.data.total);
    } finally { setLoading(false); }
  }, [page, size, roleFilter, keyword]);
  useEffect(() => { loadMembers(); }, [loadMembers]);

  useEffect(() => { roleApi.list().then(r => setRoles(r.data.data)).catch(() => {}); }, []);

  const tp = Math.ceil(total / size);

  const openAdd = () => {
    setEditingMember(null);
    setForm({ name: '', email: '', phone: '', roleCode: roles[0]?.roleCode || '', status: 1, remark: '' });
    setDialogOpen(true);
  };
  const openEdit = (m: Member) => {
    setEditingMember(m);
    setForm({ name: m.name, email: m.email || '', phone: m.phone || '', roleCode: m.roleCode, status: m.status, remark: m.remark || '' });
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      editingMember ? await memberApi.update(editingMember.id, form) : await memberApi.add(form);
      setDialogOpen(false); loadMembers();
    } finally { setSaving(false); }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { await memberApi.delete(deleteTarget.id); setDeleteTarget(null); loadMembers(); } catch { /* */ }
  };
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setImporting(true);
    try { const r = await memberApi.import(f); alert(r.data.data); loadMembers(); }
    catch (err: unknown) { alert('导入失败: ' + (err instanceof Error ? err.message : String(err))); }
    finally { setImporting(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  return (
    <>
      {/* ── 工具栏 ── */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 min-w-[180px] max-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-notion-subtle dark:text-notion-dark-dim" />
          <input className="notion-input pl-9" placeholder="搜索姓名或邮箱..."
            value={keyword} onChange={e => { setKeyword(e.target.value); setPage(1); }} />
        </div>
        <select className="notion-select w-auto" value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
          <option value="">全部角色</option>
          {roles.map(r => <option key={r.roleCode} value={r.roleCode}>{r.roleName}</option>)}
        </select>
        <div className="flex-1" />
        <button onClick={() => window.open(memberApi.exportUrl)}
          className="notion-btn-secondary flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> 导出
        </button>
        <button onClick={() => fileRef.current?.click()} disabled={importing}
          className="notion-btn-secondary flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" /> {importing ? '导入中...' : '导入'}
        </button>
        <input ref={fileRef} type="file" accept=".xlsx" onChange={handleImport} className="hidden" />
        <button onClick={openAdd} className="notion-btn-primary flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5" /> 新增成员
        </button>
      </div>

      {/* ── 数据表 ── */}
      <div className="notion-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="notion-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>角色</th>
                <th>邮箱</th>
                <th>手机号</th>
                <th>状态</th>
                <th>备注</th>
                <th className="w-[72px]">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="notion-empty"><RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2" />加载中...</td></tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="notion-empty">
                    <UsersRound className="w-6 h-6 mx-auto mb-2 text-notion-subtle dark:text-notion-dark-dim" />
                    <span>暂无成员，</span>
                    <button onClick={openAdd} className="text-notion-blue hover:underline">新增</button>
                    <span className="mx-1">或</span>
                    <button onClick={() => fileRef.current?.click()} className="text-notion-blue hover:underline">导入 Excel</button>
                  </td>
                </tr>
              ) : (
                members.map(m => (
                  <tr key={m.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-[6px] bg-notion-blue/10 dark:bg-blue-500/15
                                        flex items-center justify-center text-[11px] font-semibold text-notion-blue dark:text-blue-400 flex-shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <span className="font-medium text-notion-text dark:text-notion-dark-text">{m.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-[12px] text-notion-dim dark:text-notion-dark-dim
                                       bg-notion-hover dark:bg-notion-dark-hover px-2 py-0.5 rounded-[6px]">
                        {m.roleName || m.roleCode}
                      </span>
                    </td>
                    <td className="text-[13px] text-notion-dim dark:text-notion-dark-dim">
                      {m.email ? <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{m.email}</span> : '—'}
                    </td>
                    <td className="text-[13px] text-notion-dim dark:text-notion-dark-dim">{m.phone || '—'}</td>
                    <td><StatusBadge active={m.status === 1} /></td>
                    <td className="text-[13px] text-notion-dim dark:text-notion-dark-dim max-w-[140px] truncate">{m.remark || '—'}</td>
                    <td>
                      <div className="flex items-center gap-0.5">
                        <button onClick={() => openEdit(m)}
                          className="p-1.5 rounded-[6px] hover:bg-notion-hover dark:hover:bg-notion-dark-hover
                                     text-notion-dim dark:text-notion-dark-dim hover:text-notion-text dark:hover:text-notion-dark-text">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(m)}
                          className="p-1.5 rounded-[6px] hover:bg-red-50 dark:hover:bg-red-500/10
                                     text-notion-dim dark:text-notion-dark-dim hover:text-notion-red">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        {total > 0 && (
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-notion-border dark:border-notion-dark-border">
            <span className="text-[12px] text-notion-dim dark:text-notion-dark-dim">共 {total} 条</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                className="p-1 rounded-[6px] hover:bg-notion-hover dark:hover:bg-notion-dark-hover disabled:opacity-30
                           text-notion-dim dark:text-notion-dark-dim">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[12px] text-notion-dim dark:text-notion-dark-dim px-2 tabular-nums">{page} / {tp}</span>
              <button onClick={() => setPage(p => Math.min(tp, p + 1))} disabled={page >= tp}
                className="p-1 rounded-[6px] hover:bg-notion-hover dark:hover:bg-notion-dark-hover disabled:opacity-30
                           text-notion-dim dark:text-notion-dark-dim">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── 新增/编辑弹窗 ── */}
      <FormDialog open={dialogOpen} title={editingMember ? '编辑成员' : '新增成员'}
        onClose={() => setDialogOpen(false)} onSubmit={handleSave} loading={saving}>
        <Field label="姓名" required>
          <input className="notion-input" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} placeholder="成员姓名" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="邮箱">
            <input className="notion-input" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
          </Field>
          <Field label="手机号">
            <input className="notion-input" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="11位手机号" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="角色" required>
            <select className="notion-select" value={form.roleCode}
              onChange={e => setForm({ ...form, roleCode: e.target.value })}>
              {roles.map(r => <option key={r.roleCode} value={r.roleCode}>{r.roleName}</option>)}
            </select>
          </Field>
          <Field label="状态">
            <select className="notion-select" value={form.status}
              onChange={e => setForm({ ...form, status: Number(e.target.value) })}>
              <option value={1}>在职</option>
              <option value={0}>离职</option>
            </select>
          </Field>
        </div>
        <Field label="备注">
          <textarea className="notion-input min-h-[54px] resize-none" value={form.remark}
            onChange={e => setForm({ ...form, remark: e.target.value })} placeholder="备注信息..." />
        </Field>
      </FormDialog>

      <ConfirmDialog open={!!deleteTarget} title="删除成员"
        message={`确认删除「${deleteTarget?.name}」？此操作不可撤销。`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </>
  );
}

// ═══════════════════════ 表单字段 ═══════════════════════

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium text-notion-dim dark:text-notion-dark-dim mb-1.5 block">
        {label}{required && <span className="text-notion-red ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
