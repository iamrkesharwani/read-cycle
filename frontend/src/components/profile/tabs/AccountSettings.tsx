import { Lock, Bell, Shield, Trash2, ChevronRight, LogOut } from 'lucide-react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { logout } from '../../../store/auth/authSlice';

const cls = {
  row: 'w-full flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 text-left transition-all',
  rowDanger:
    'w-full flex items-center gap-3 p-4 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 text-left transition-all',
  iconWrap:
    'w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0',
  iconWrapDanger:
    'w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0',
  sectionLabel:
    'text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2',
  label: 'text-sm font-semibold text-gray-800',
  labelDanger: 'text-sm font-semibold text-red-600',
  sub: 'text-xs text-slate-400 mt-0.5',
};

const AccountSettings = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-gray-900">Account Settings</h3>
        <p className={cls.sub}>
          Manage your security, notifications, and privacy.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <p className={cls.sectionLabel}>Security</p>
          <button
            onClick={() => console.log('change password')}
            className={cls.row}
          >
            <div className={cls.iconWrap}>
              <Lock size={15} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cls.label}>Change Password</p>
              <p className={cls.sub}>Last changed 3 months ago</p>
            </div>
            <ChevronRight size={15} className="text-slate-300" />
          </button>
        </div>

        <div>
          <p className={cls.sectionLabel}>Notifications</p>
          <button
            onClick={() => console.log('email notifications')}
            className={cls.row}
          >
            <div className={cls.iconWrap}>
              <Bell size={15} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cls.label}>Email Notifications</p>
              <p className={cls.sub}>Swap requests, messages, updates</p>
            </div>
            <ChevronRight size={15} className="text-slate-300" />
          </button>
        </div>

        <div>
          <p className={cls.sectionLabel}>Privacy</p>
          <button
            onClick={() => console.log('profile visibility')}
            className={cls.row}
          >
            <div className={cls.iconWrap}>
              <Shield size={15} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cls.label}>Profile Visibility</p>
              <p className={cls.sub}>Your profile is public</p>
            </div>
            <ChevronRight size={15} className="text-slate-300" />
          </button>
        </div>

        <div>
          <p className={cls.sectionLabel}>Session</p>
          <button onClick={() => dispatch(logout())} className={cls.row}>
            <div className={cls.iconWrap}>
              <LogOut size={15} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cls.label}>Log Out</p>
              <p className={cls.sub}>Sign out of your account</p>
            </div>
            <ChevronRight size={15} className="text-slate-300" />
          </button>
        </div>

        <div>
          <p className={cls.sectionLabel}>Danger Zone</p>
          <button
            onClick={() => console.log('delete account')}
            className={cls.rowDanger}
          >
            <div className={cls.iconWrapDanger}>
              <Trash2 size={15} className="text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cls.labelDanger}>Delete Account</p>
              <p className={cls.sub}>
                Permanently remove your account and data
              </p>
            </div>
            <ChevronRight size={15} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
