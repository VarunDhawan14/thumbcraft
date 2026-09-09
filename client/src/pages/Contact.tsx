import { useState, useEffect } from "react";
import { MailIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SoftBackdrop from "../components/SoftBackdrop";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";

const Contact = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Query",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Restore saved contact form data after login
  useEffect(() => {
    if (user) {
      const savedDraft = sessionStorage.getItem("thumbcraft_contact_draft");

      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);

          setFormData({
            name: draft.name || user.name || "",
            email: user.email || "",
            topic: draft.topic || "General Query",
            message: draft.message || "",
          });

          sessionStorage.removeItem("thumbcraft_contact_draft");

          return;
        } catch {
          sessionStorage.removeItem("thumbcraft_contact_draft");
        }
      }

      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate name
    if (!formData.name.trim()) {
      return toast.error("Please enter your name");
    }

    // Validate message
    if (!formData.message.trim()) {
      return toast.error("Please enter your message");
    }

    // If user is not logged in, save the form and redirect to login
    if (!isLoggedIn) {
      sessionStorage.setItem(
        "thumbcraft_contact_draft",
        JSON.stringify({
          name: formData.name,
          topic: formData.topic,
          message: formData.message,
        }),
      );

      navigate("/login", {
        state: {
          from: "/contact",
        },
      });

      return;
    }

    try {
      setLoading(true);

      // Do NOT send email from frontend.
      // Backend will get the real email from the logged-in user's session.
      const { data } = await api.post("/api/contact", {
        name: formData.name.trim(),
        topic: formData.topic,
        message: formData.message.trim(),
      });

      toast.success(data?.message || "Message sent successfully!");

      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        topic: "General Query",
        message: "",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SoftBackdrop />

      <main className='min-h-screen px-4 pt-32 pb-20 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          {/* HEADER */}
          <motion.div
            className='mx-auto mb-12 max-w-2xl text-center'
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className='mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-medium text-pink-400'>
              <MessageCircleIcon className='size-4' />
              We'd love to hear from you
            </div>

            <h1 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl'>
              Let's talk about your{" "}
              <span className='bg-linear-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent'>
                ideas
              </span>
            </h1>

            <p className='mt-4 text-sm leading-6 text-zinc-400 sm:text-base'>
              Have a question, suggestion, or feedback? Send us a message and
              we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* CONTENT */}
          <div className='grid gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
            {/* LEFT CARD */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-7 shadow-2xl backdrop-blur-xl sm:p-9'
            >
              <div className='absolute -right-20 -top-20 size-52 rounded-full bg-pink-600/10 blur-3xl' />

              <div className='relative'>
                <div className='mb-8'>
                  <div className='mb-4 flex size-12 items-center justify-center rounded-2xl border border-pink-500/20 bg-pink-500/10'>
                    <MailIcon className='size-6 text-pink-400' />
                  </div>

                  <h2 className='text-2xl font-semibold text-zinc-100'>
                    Contact information
                  </h2>

                  <p className='mt-2 text-sm leading-6 text-zinc-400'>
                    Prefer email? You can directly reach us using the address
                    below.
                  </p>
                </div>

                <div className='rounded-2xl border border-white/10 bg-black/20 p-5'>
                  <p className='text-xs font-medium uppercase tracking-wider text-zinc-500'>
                    Email us at
                  </p>

                  <a
                    href='mailto:thumbcraftai10@gmail.com'
                    className='mt-2 block break-all text-base font-medium text-zinc-100 transition hover:text-pink-400'
                  >
                    thumbcraftai10@gmail.com
                  </a>
                </div>

                <div className='mt-6 space-y-5'>
                  <div>
                    <h3 className='text-sm font-semibold text-zinc-200'>
                      Questions & suggestions
                    </h3>

                    <p className='mt-1 text-sm leading-6 text-zinc-500'>
                      Tell us what you need, what could be improved, or what
                      you'd like to see in ThumbCraft.
                    </p>
                  </div>

                  <div>
                    <h3 className='text-sm font-semibold text-zinc-200'>
                      Feedback matters
                    </h3>

                    <p className='mt-1 text-sm leading-6 text-zinc-500'>
                      Your feedback helps us make ThumbCraft better for
                      creators.
                    </p>
                  </div>
                </div>

                <div className='mt-8 border-t border-white/10 pt-6'>
                  <p className='text-xs leading-5 text-zinc-600'>
                    We appreciate every message and suggestion from our
                    community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* FORM CARD */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className='rounded-3xl border border-white/10 bg-white/6 p-7 shadow-2xl backdrop-blur-xl sm:p-9'
            >
              <div className='mb-7'>
                <h2 className='text-2xl font-semibold text-zinc-100'>
                  Send us a message
                </h2>

                <p className='mt-2 text-sm text-zinc-500'>
                  Fill out the form below and we'll receive your message
                  directly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-5'>
                {/* NAME + EMAIL */}
                <div className='grid gap-5 sm:grid-cols-2'>
                  {/* NAME */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-zinc-200'
                    >
                      Your Name
                    </label>

                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      placeholder='Enter your name'
                      className='w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10'
                    />
                  </div>

                  {/* EMAIL */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-zinc-200'
                    >
                      Email Address
                    </label>

                    <input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      readOnly
                      placeholder='Login to use your email'
                      className='w-full cursor-not-allowed rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600'
                    />
                  </div>
                </div>

                {/* TOPIC */}
                <div className='space-y-2'>
                  <label
                    htmlFor='topic'
                    className='block text-sm font-medium text-zinc-200'
                  >
                    What can we help with?
                  </label>

                  <select
                    id='topic'
                    name='topic'
                    value={formData.topic}
                    onChange={handleChange}
                    className='w-full rounded-2xl border border-pink-500/50 bg-zinc-950 px-5 py-3.5 text-sm text-zinc-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/10'
                  >
                    <option
                      value='General Query'
                      className='bg-zinc-950 text-zinc-100'
                    >
                      General Query
                    </option>

                    <option
                      value='Suggestion'
                      className='bg-zinc-900 text-zinc-100'
                    >
                      Suggestion
                    </option>

                    <option
                      value='Feedback'
                      className='bg-zinc-900 text-zinc-100'
                    >
                      Feedback
                    </option>

                    <option
                      value='Bug Report'
                      className='bg-zinc-900 text-zinc-100'
                    >
                      Bug Report
                    </option>

                    <option value='Other' className='bg-zinc-900 text-zinc-100'>
                      Other
                    </option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-zinc-200'
                    >
                      Your Message
                    </label>

                    <span className='text-xs text-zinc-600'>
                      {formData.message.length}/1000
                    </span>
                  </div>

                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={1000}
                    rows={7}
                    placeholder='Write your query, suggestion, or feedback here...'
                    className='w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10'
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type='submit'
                  disabled={loading}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-pink-500 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 transition hover:from-pink-600 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message
                      <SendIcon className='size-4' />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
