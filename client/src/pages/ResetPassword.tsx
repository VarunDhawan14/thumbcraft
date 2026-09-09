import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== 6) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email.trim(), code.trim(), password);

      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SoftBackdrop />

      <div className='min-h-screen flex items-center justify-center px-4'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-md text-center bg-white/6 border border-white/10 rounded-2xl px-8 py-10'
        >
          <h1 className='text-white text-3xl font-medium'>Reset password</h1>

          <p className='text-gray-400 text-sm mt-3'>
            Enter the code sent to your email and choose a new password.
          </p>

          <div className='mt-7 text-left'>
            <label className='text-sm text-gray-300'>Email</label>

            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-2 w-full h-12 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white outline-none'
              required
            />
          </div>

          <div className='mt-5 text-left'>
            <label className='text-sm text-gray-300'>Reset Code</label>

            <input
              type='text'
              inputMode='numeric'
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder='6-digit code'
              className='mt-2 w-full h-14 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white text-center text-xl tracking-[0.5em] outline-none'
              required
            />
          </div>

          <div className='mt-5 text-left'>
            <label className='text-sm text-gray-300'>New Password</label>

            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Minimum 8 characters'
              className='mt-2 w-full h-12 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white outline-none'
              required
              minLength={8}
            />
          </div>

          <div className='mt-5 text-left'>
            <label className='text-sm text-gray-300'>
              Confirm New Password
            </label>

            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
              className='mt-2 w-full h-12 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white outline-none'
              required
              minLength={8}
            />
          </div>

          {password && confirmPassword && password !== confirmPassword && (
            <p className='text-red-400 text-xs mt-3 text-left'>
              Passwords do not match.
            </p>
          )}

          <button
            type='submit'
            disabled={
              loading ||
              code.length !== 6 ||
              password.length < 8 ||
              password !== confirmPassword
            }
            className='mt-6 w-full h-12 rounded-full text-white bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition'
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button
            type='button'
            onClick={() => navigate("/login")}
            className='mt-5 text-sm text-pink-400 hover:underline'
          >
            Back to login
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
