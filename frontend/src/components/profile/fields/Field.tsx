type FieldProps = {
  label: string;
  value: string;
  icon: React.ElementType;
};

const Field = ({ label, value, icon: Icon }: FieldProps) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-800 truncate">
          {value || '—'}
        </p>
      </div>
    </div>
  );
};

export default Field;
