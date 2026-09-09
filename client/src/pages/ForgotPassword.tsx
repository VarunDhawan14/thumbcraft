import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setLoading(true);

      await forgotPassword(email.trim());

      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      console.error("Forgot password error:", error);
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
          <h1 className='text-white text-3xl font-medium'>Forgot password?</h1>

          <p className='text-gray-400 text-sm mt-3'>
            Enter your email and we'll send you a password reset code.
          </p>

          <div className='mt-7 text-left'>
            <label className='text-sm text-gray-300'>Email</label>

            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
              className='mt-2 w-full h-12 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white outline-none'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-6 w-full h-12 rounded-full text-white bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition'
          >
            {loading ? "Sending..." : "Send Reset Code"}
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

export default ForgotPassword;
