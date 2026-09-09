import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SoftBackdrop from "../components/SoftBackdrop";
import { useAuth } from "../context/AuthContext";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { verifyEmail, resendVerificationCode } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    if (code.length !== 6) {
      return;
    }

    try {
      setLoading(true);

      await verifyEmail(email.trim(), code.trim());

      navigate("/");
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim() || resendCooldown > 0) return;

    try {
      setResending(true);

      await resendVerificationCode(email.trim());

      setResendCooldown(60);
      setCode("");
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <SoftBackdrop />

      <div className='min-h-screen flex items-center justify-center px-4'>
        <form
          onSubmit={handleVerify}
          className='w-full max-w-md text-center bg-white/6 border border-white/10 rounded-2xl px-8 py-10'
        >
          <h1 className='text-white text-3xl font-medium'>Verify your email</h1>

          <p className='text-gray-400 text-sm mt-3'>
            We sent a 6-digit verification code to your email.
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

          <div className='mt-5 text-left'>
            <label className='text-sm text-gray-300'>Verification Code</label>

            <input
              type='text'
              inputMode='numeric'
              maxLength={6}
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder='Enter 6-digit code'
              className='mt-2 w-full h-14 rounded-full bg-white/5 ring-2 ring-white/10 focus:ring-pink-500/60 px-5 text-white text-center text-xl tracking-[0.5em] outline-none'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading || code.length !== 6}
            className='mt-6 w-full h-12 rounded-full text-white bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition'
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <button
            type='button'
            onClick={handleResend}
            disabled={resending || resendCooldown > 0}
            className='mt-5 text-sm text-pink-400 hover:underline disabled:opacity-50'
          >
            {resending
              ? "Sending..."
              : resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend verification code"}
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
