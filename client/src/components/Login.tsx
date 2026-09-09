import React, { useEffect, useState } from "react";
import SoftBackdrop from "./SoftBackdrop";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [state, setState] = useState<"login" | "register">("login");

  const { user, login, signUp } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (state === "register") {
      if (formData.password.length < 8) {
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        return;
      }
    }

    try {
      setLoading(true);

      if (state === "login") {
        try {
          await login({
            email: formData.email,
            password: formData.password,
          });
        } catch (error: any) {
          if (error?.requiresVerification && error?.email) {
            navigate(`/verify-email?email=${encodeURIComponent(error.email)}`);
          }
        }
      } else {
        await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <SoftBackdrop />

      <div className='min-h-screen flex items-center justify-center px-4'>
        <form
          onSubmit={handleSubmit}
          className='w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8 py-2'
        >
          <h1 className='text-white text-3xl mt-10 font-medium'>
            {state === "login" ? "Login" : "Create account"}
          </h1>

          <p className='text-gray-400 text-sm mt-2'>
            {state === "login"
              ? "Please sign in to continue"
              : "Create your SiteCraft AI account"}
          </p>

          {state !== "login" && (
            <div className='flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                className='text-white/60'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='8' r='5' />
                <path d='M20 21a8 8 0 0 0-16 0' />
              </svg>

              <input
                type='text'
                name='name'
                placeholder='Name'
                className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className='flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='text-white/75'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' />
              <rect x='2' y='4' width='20' height='16' rx='2' />
            </svg>

            <input
              type='email'
              name='email'
              placeholder='Email id'
              className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='text-white/75'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>

            <input
              type='password'
              name='password'
              placeholder='Password'
              className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none'
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          {state === "register" && (
            <div className='flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-pink-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                className='text-white/75'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
                <path d='M7 11V7a5 5 0 0 1 10 0v4' />
              </svg>

              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full bg-transparent text-white placeholder-white/60 border-none outline-none'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          )}

          {state === "login" && (
            <div className='mt-4 text-left'>
              <button
                type='button'
                onClick={() => navigate("/forgot-password")}
                className='text-sm text-pink-400 hover:underline'
              >
                Forgot password?
              </button>
            </div>
          )}

          {state === "register" &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className='text-red-400 text-xs text-left mt-3'>
                Passwords do not match.
              </p>
            )}

          <button
            type='submit'
            disabled={loading}
            className='mt-5 w-full h-11 rounded-full text-white bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition'
          >
            {loading
              ? "Please wait..."
              : state === "login"
                ? "Login"
                : "Create account"}
          </button>

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className='text-gray-400 text-sm mt-3 mb-11 cursor-pointer'
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <span className='text-pink-400 hover:underline ml-1'>
              {state === "login" ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
