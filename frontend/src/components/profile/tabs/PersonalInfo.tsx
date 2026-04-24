import { User, Mail, Phone, MapPin, CalendarDays } from 'lucide-react';
import { cls } from '../../../style/profile/PersonalInfo';

const Field = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className={cls.field}>
    <div className={cls.iconWrap}>
      <Icon size={14} className="text-slate-400" />
    </div>
    <div className="min-w-0">
      <p className={cls.fieldLabel}>{label}</p>
      <p className={cls.fieldValue}>{value || '—'}</p>
    </div>
  </div>
);

const PersonalInfo = ({ name, email }: { name?: string; email?: string }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">
          Personal Information
        </h3>
        <p className="text-xs text-slate-400">
          Your account details and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full Name" value={name || '—'} icon={User} />
        <Field label="Email Address" value={email || '—'} icon={Mail} />
        <Field label="Phone" value="Not added" icon={Phone} />
        <Field label="Location" value="Siliguri, India" icon={MapPin} />
        <Field label="Member Since" value="April 2023" icon={CalendarDays} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">Bio</p>
          <button className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            Edit
          </button>
        </div>
        <textarea
          rows={3}
          placeholder="Tell the community what you're currently reading..."
          className={cls.textarea}
        />
        <div className="mt-2 flex justify-end">
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
