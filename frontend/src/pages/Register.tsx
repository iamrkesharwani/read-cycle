import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { registerUser } from '../store/auth/authThunk';
import { User, Mail, Lock, MapPin, Loader2, ArrowRight } from 'lucide-react';
import DecorativeRegisterLogin from '../components/DecorativeRegisterLogin';
import { useForm } from 'react-hook-form';
import {
  registerSchema,
  type RegisterType,
} from '../../../shared/schemas/auth/register.schema.js';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RegisterInput } from '../../../shared/types/user.js';
import registerImg from '../assets/register.jpg';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user, token } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (user && token) navigate('/');
  }, [user, token, navigate]);

  const onSubmit = (data: RegisterInput) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="flex flex-1">
      {/* Form panel */}
      <div
        className="flex-1 flex items-center justify-center px-8 relative overflow-hidden"
        style={{ background: '#fafaf8' }}
      >
        <DecorativeRegisterLogin />

        <div className="relative z-10 w-full max-w-sm">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Create account
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Join readers swapping books in your city.
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register('name')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border-[1.5px] rounded-xl text-sm outline-none transition-all ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border-[1.5px] rounded-xl text-sm outline-none transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                City
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Kolkata"
                  {...register('city')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border-[1.5px] rounded-xl text-sm outline-none transition-all ${
                    errors.city
                      ? 'border-red-500 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Minimum 8 characters"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border-[1.5px] rounded-xl text-sm outline-none transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-100'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/10'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-all mt-2"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs text-slate-300 font-medium">OR</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-teal-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Image panel */}
      <div className="hidden lg:flex flex-col flex-[0_0_50%] relative overflow-hidden">
        <img
          src={registerImg}
          alt="Books"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(13,148,136,0.72) 0%, rgba(6,78,59,0.88) 100%)',
          }}
        />

        <div className="relative z-10 p-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Book Exchange Platform
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center px-10">
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight text-center">
            Your shelf is someone's{' '}
            <span className="text-amber-300">next favourite.</span>
          </h1>
        </div>

        <div className="relative z-10 p-8">
          <div className="border-l-2 border-amber-400 pl-4">
            <p className="text-white/90 text-sm font-semibold italic leading-relaxed">
              "A reader lives a thousand lives before he dies."
            </p>
            <p className="text-white/50 font-semibold text-xs mt-2">
              — George R.R. Martin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
