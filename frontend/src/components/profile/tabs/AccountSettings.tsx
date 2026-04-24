import { Lock, Bell, Shield, Trash2, ChevronRight, LogOut } from 'lucide-react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { logout } from '../../../store/auth/authSlice';
import { cls } from '../../../style/profile/AccountSettings';

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
