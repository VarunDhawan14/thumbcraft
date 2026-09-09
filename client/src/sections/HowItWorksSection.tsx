import { motion } from "motion/react";
import {
  ArrowRightIcon,
  PaletteIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter your topic",
    description:
      "Tell ThumbCraft what your video is about and what you want your thumbnail to communicate.",
    icon: TypeIcon,
  },
  {
    number: "02",
    title: "Customize your style",
    description:
      "Choose your aspect ratio, visual style, color scheme, and add creative instructions.",
    icon: PaletteIcon,
  },
  {
    number: "03",
    title: "Generate your thumbnail",
    description:
      "Let AI create a professional, attention-grabbing thumbnail for your video in seconds.",
    icon: SparklesIcon,
  },
];

export default function HowItWorksSection() {
  return (
    <section id='how-it-works' className='w-full mt-24 md:mt-32 scroll-mt-24'>
      <motion.div
        className='text-center mb-10'
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 70,
          mass: 1,
        }}
      >
        <p className='text-sm font-medium text-pink-500 mb-2'>HOW IT WORKS</p>

        <h2 className='text-3xl md:text-4xl font-medium text-white'>
          Create your thumbnail in 3 simple steps
        </h2>

        <p className='text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-3'>
          From your idea to a ready-to-use thumbnail, ThumbCraft keeps the
          entire process simple.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto'>
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.number} className='relative'>
              <motion.div
                className='h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:border-pink-500/30 hover:bg-white/[0.06] transition-all'
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 280,
                  damping: 70,
                  mass: 1,
                }}
              >
                <div className='flex items-center justify-between mb-5'>
                  <div className='size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center'>
                    <Icon className='size-5 text-pink-400' />
                  </div>

                  <span className='text-sm font-semibold text-pink-500/70'>
                    {step.number}
                  </span>
                </div>

                <h3 className='text-lg font-medium text-white'>{step.title}</h3>

                <p className='text-sm leading-6 text-slate-400 mt-2'>
                  {step.description}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <ArrowRightIcon className='hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 size-7 text-pink-500/50' />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
