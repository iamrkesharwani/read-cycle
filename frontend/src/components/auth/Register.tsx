import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.js";
import { registerUser } from "../../store/auth/authThunk.js";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Loader2,
  ArrowRight,
  EyeOff,
  Eye,
} from "lucide-react";
import DecorativeRegisterLogin from "../ui/misc/DecorativeRegisterLogin.js";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterType,
} from "../../../../shared/schemas/auth/register.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterInput } from "../../../../shared/types/user.js";
import registerImg from "../../assets/register.jpg";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = (data: RegisterInput) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="flex flex-1">
      {/* Form panel */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-8"
        style={{ background: "#fafaf8" }}
      >
        <DecorativeRegisterLogin />

        <div className="relative z-10 w-full max-w-sm">
          <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Create account
          </h2>
          <p className="mb-8 text-sm text-slate-400">
            Join readers swapping books in your city.
          </p>

          {error && (
            <div className="mb-5 rounded-r-lg border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
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
                  {...register("name")}
                  className={`w-full rounded-xl border-[1.5px] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/10"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-[10px] font-bold uppercase text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
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
                  {...register("email")}
                  className={`w-full rounded-xl border-[1.5px] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/10"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[10px] font-bold uppercase text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
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
                  {...register("city")}
                  className={`w-full rounded-xl border-[1.5px] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all ${
                    errors.city
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/10"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type={show ? "text" : "password"}
                  {...register("password")}
                  placeholder="Minimum 8 characters"
                  className={`w-full rounded-xl border-[1.5px] bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[10px] font-bold uppercase text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
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

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs font-medium text-slate-300">OR</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-teal-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Image panel */}
      <div className="relative hidden flex-[0_0_50%] flex-col overflow-hidden lg:flex">
        <img
          src={registerImg}
          alt="Books"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(13,148,136,0.72) 0%, rgba(6,78,59,0.88) 100%)",
          }}
        />

        <div className="relative z-10 p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/90">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            Ready To Start Swapping
          </div>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center px-10">
          <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tight text-white">
            Your shelf is someone's{" "}
            <span className="text-amber-300">next favourite.</span>
          </h1>
        </div>

        <div className="relative z-10 p-8">
          <div className="border-l-2 border-amber-400 pl-4">
            <p className="text-sm font-semibold italic leading-relaxed text-white/90">
              "A reader lives a thousand lives before he dies."
            </p>
            <p className="mt-2 text-xs font-semibold text-white/50">
              — George R.R. Martin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
