import { useState } from 'react';
import { Check, X, Loader2, Lock } from 'lucide-react';
import type { ZodType } from 'zod';

type EditableFieldProps = {
  label: string;
  value: string;
  displayValue?: string;
  icon: React.ElementType;
  prefix?: string;
  placeholder?: string;
  schema?: ZodType;
  multiline?: boolean;
  lockedUntil?: Date;
  onSave: (val: string) => Promise<unknown>;
};

const EditableField = ({
  label,
  value,
  displayValue,
  icon: Icon,
  prefix,
  placeholder,
  schema,
  multiline = false,
  lockedUntil,
  onSave,
}: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isLocked = lockedUntil ? new Date() < lockedUntil : false;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const handleSave = async () => {
    if (schema) {
      const result = schema.safeParse(draft);
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }
    }
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setError(null);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
            <Icon size={14} className="text-slate-400" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {label}
          </p>
        </div>
        {!editing &&
          (isLocked ? (
            <div className="flex items-center gap-1 text-slate-400">
              <Lock size={10} />
              <span className="text-[11px]">Locked</span>
            </div>
          ) : (
            <button
              onClick={() => {
                setDraft(value);
                setEditing(true);
              }}
              className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Edit
            </button>
          ))}
      </div>

      {editing ? (
        <div className="flex flex-col gap-1.5 w-full pl-11">
          <div
            className={`flex gap-2 ${multiline ? 'items-start' : 'items-center'}`}
          >
            {prefix && !multiline && (
              <span className="text-sm text-slate-400 shrink-0">{prefix}</span>
            )}
            {multiline ? (
              <textarea
                autoFocus
                rows={3}
                value={draft}
                placeholder={placeholder}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleCancel();
                }}
                className="w-full px-3 py-1.5 bg-white border border-teal-300 rounded-lg text-sm text-gray-800 outline-none focus:ring-1 focus:ring-teal-400 transition-all resize-none"
              />
            ) : (
              <input
                autoFocus
                value={draft}
                placeholder={placeholder}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                className="w-full px-3 py-1.5 bg-white border border-teal-300 rounded-lg text-sm text-gray-800 outline-none focus:ring-1 focus:ring-teal-400 transition-all"
              />
            )}
            <div className={`flex gap-2 ${multiline ? 'flex-col' : ''}`}>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="shrink-0 w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Check size={12} />
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="shrink-0 w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          </div>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="pl-11">
          <p className="text-sm font-semibold text-gray-800 whitespace-pre-wrap break-words">
            {displayValue || value || (
              <span className="text-slate-400 font-normal">Not added</span>
            )}
          </p>
          {isLocked && lockedUntil && (
            <p className="text-[11px] text-amber-500 mt-1">
              Available to change on {formatDate(lockedUntil)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableField;
