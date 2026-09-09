import { motion } from "motion/react";

export default function Privacy() {
  return (
    <main className='min-h-screen pt-36 pb-20 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 70,
            mass: 1,
          }}
          className='text-center mb-14'
        >
          <p className='inline-flex items-center justify-center px-8 py-2 rounded-full border border-pink-600/60 bg-pink-600/10 text-base md:text-lg font-medium text-pink-500 mb-5'>
            PRIVACY POLICY
          </p>

          <h1 className='text-4xl md:text-5xl font-medium text-white'>
            Your privacy matters to us
          </h1>

          <p className='text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-7'>
            This Privacy Policy explains how ThumbCraft collects, uses, and
            protects information when you use our website and services.
          </p>
        </motion.div>

        <div className='space-y-5'>
          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              1. Information We Collect
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              When you create an account or use ThumbCraft, we may collect
              information such as your name, email address, account credentials,
              and information you provide while using the service.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              2. How We Use Your Information
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              We use collected information to create and manage your account,
              provide thumbnail generation services, authenticate users, respond
              to support requests, and improve the ThumbCraft experience.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              3. Account and Authentication
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft uses account authentication to protect your account and
              provide access to features such as thumbnail generation and My
              Generations. You are responsible for keeping your account
              credentials secure.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              4. AI Thumbnail Generation
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Information and creative instructions that you submit for
              thumbnail generation may be processed by the AI services used by
              ThumbCraft to generate your requested images.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              5. Generated Content
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Generated thumbnails may be stored so that they can be displayed
              in your My Generations section and accessed through your account.
              You can manage your generated thumbnails through the available
              controls in the application.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              6. Cookies and Sessions
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft may use session-related technologies to keep you
              authenticated and maintain your account session while using the
              application.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              7. Third-Party Services
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft may rely on third-party services for functionality such
              as AI image generation, email delivery, database storage,
              authentication infrastructure, and hosting. These services may
              process information as necessary to provide their respective
              functionality.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              8. Data Security
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              We take reasonable measures to protect account information and
              application data. However, no method of transmission or storage
              can be guaranteed to be completely secure.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              9. Data Retention
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Account and generated-content information may be retained for as
              long as necessary to provide the service, maintain application
              functionality, comply with applicable requirements, or resolve
              disputes.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              10. Contact Us
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              If you have questions about this Privacy Policy or how ThumbCraft
              handles information, contact us at{" "}
              <span className='text-pink-400'>thumbcraftai10@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
