import { motion } from "motion/react";

export default function Terms() {
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
            TERMS OF SERVICE
          </p>

          <h1 className='text-4xl md:text-5xl font-medium text-white'>
            Terms for using ThumbCraft
          </h1>

          <p className='text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-7'>
            These terms describe the rules and conditions that apply when you
            use ThumbCraft and its services.
          </p>
        </motion.div>

        <div className='space-y-5'>
          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              1. Acceptance of Terms
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              By accessing or using ThumbCraft, you agree to these Terms of
              Service. If you do not agree with these terms, you should not use
              the service.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              2. Use of ThumbCraft
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft provides AI-powered tools for creating thumbnails and
              related visual content. You agree to use the service only for
              lawful purposes and in accordance with these terms.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              3. User Accounts
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Some ThumbCraft features require an account. You are responsible
              for providing accurate information and for maintaining the
              security of your account credentials.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              4. AI-Generated Content
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Thumbnail results are generated using AI services and may vary
              depending on your instructions and the underlying generation
              technology. ThumbCraft does not guarantee that every generated
              result will meet your exact expectations.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              5. Prohibited Use
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              You must not use ThumbCraft to create or distribute content that
              violates applicable laws, infringes the rights of others, or
              abuses, disrupts, or attempts to compromise the service.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              6. Generated Images and Intellectual Property
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Your use of generated images is subject to the capabilities,
              limitations, and terms of the underlying AI services used by
              ThumbCraft. You are responsible for ensuring that your use of
              generated content does not violate applicable laws or third-party
              rights.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              7. Free Usage and Service Limits
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft may provide access to AI generation through services
              that have usage limits, quotas, or availability restrictions.
              Generation availability may therefore vary over time.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              8. Service Availability
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              We aim to keep ThumbCraft available and functional, but we do not
              guarantee uninterrupted access. The service may occasionally be
              unavailable because of maintenance, technical problems,
              third-party service limitations, or other circumstances.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              9. Disclaimer
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              ThumbCraft is provided on an available basis. We do not guarantee
              that generated thumbnails will achieve a particular number of
              views, clicks, engagement, or other performance results.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              10. Account Termination
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              Access to ThumbCraft may be suspended or terminated if an account
              is used in violation of these terms or in a way that could harm
              the service or other users.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              11. Changes to These Terms
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              These terms may be updated from time to time as ThumbCraft
              evolves. Continued use of the service after changes are published
              means you accept the updated terms.
            </p>
          </section>

          <section className='rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8'>
            <h2 className='text-xl md:text-2xl font-medium text-white'>
              12. Contact Us
            </h2>
            <p className='text-slate-400 leading-7 mt-3'>
              For questions regarding these Terms of Service, contact us at{" "}
              <span className='text-pink-400'>thumbcraftai10@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
