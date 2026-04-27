import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  AtSign,
  FileText,
} from 'lucide-react';
import Field from '../fields/Field';
import EditableField from '../fields/EditableField';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import type { RootState } from '../../../store/store';
import {
  citySchema,
  emailSchema,
  nameSchema,
  usernameSchema,
  phoneSchema,
} from '../../../../../shared/schemas/auth/update.schema';
import {
  updateName,
  updateEmail,
  updateUsername,
  updatePhone,
  updateCity,
  updateBio,
} from '../../../store/auth/authThunk';

const USERNAME_COOLDOWN_DAYS = 30;

const formatPhone = (phone: string): string => {
  const format = phone.slice(2, 12);
  return `+91-${format}`;
};

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const usernameLockedUntil = user.usernameUpdatedAt
    ? new Date(
        new Date(user.usernameUpdatedAt).getTime() +
          USERNAME_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
      )
    : undefined;

  // value = raw 10-digit for the input, displayValue = formatted for read view
  const rawPhone = user.phone?.replace(/^91/, '') ?? '';
  const displayPhone = user.phone ? formatPhone(user.phone) : '';

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
        <EditableField
          label="Full Name"
          value={user.name ?? ''}
          icon={User}
          placeholder="Your full name"
          schema={nameSchema}
          onSave={(val) => dispatch(updateName(val)).unwrap()}
        />

        <EditableField
          label="Username"
          value={user.username ?? ''}
          icon={AtSign}
          prefix="@"
          placeholder="your-username"
          schema={usernameSchema}
          lockedUntil={usernameLockedUntil}
          onSave={(val) => dispatch(updateUsername(val)).unwrap()}
        />

        <EditableField
          label="Email Address"
          value={user.email ?? ''}
          icon={Mail}
          placeholder="you@example.com"
          schema={emailSchema}
          onSave={(val) => dispatch(updateEmail(val)).unwrap()}
        />

        <EditableField
          label="Phone"
          value={rawPhone}
          displayValue={displayPhone}
          icon={Phone}
          placeholder="9876543210"
          schema={phoneSchema}
          onSave={(val) => dispatch(updatePhone(val)).unwrap()}
        />

        <EditableField
          label="Location"
          value={user.city ?? ''}
          icon={MapPin}
          placeholder="Your city"
          schema={citySchema}
          onSave={(val) => dispatch(updateCity(val)).unwrap()}
        />

        <Field label="Member Since" value={memberSince} icon={CalendarDays} />

        <div className="sm:col-span-2">
          <EditableField
            label="Bio"
            value={user.bio ?? ''}
            icon={FileText}
            placeholder="Tell the community what you're currently reading..."
            multiline
            onSave={(val) => dispatch(updateBio(val)).unwrap()}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
