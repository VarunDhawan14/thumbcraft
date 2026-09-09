import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SectionTitle from "../components/SectionTitle";
import { faqsData } from "../data/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id='faq' className='px-4 md:px-16 lg:px-24 xl:px-32 mt-40'>
      <SectionTitle
        text1='FAQ'
        text2='Frequently asked questions'
        text3='Everything you need to know about creating better thumbnails with ThumbCraft.'
      />

      <div className='max-w-4xl mx-auto mt-14 space-y-4'>
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 280,
                damping: 70,
                mass: 1,
              }}
              className='rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-pink-500/40 transition-colors'
            >
              <button
                type='button'
                onClick={() => handleToggle(index)}
                className='w-full flex items-center justify-between gap-6 px-6 py-5 text-left'
                aria-expanded={isOpen}
              >
                <span className='text-base md:text-lg font-medium text-zinc-100'>
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='shrink-0'
                >
                  <ChevronDownIcon className='size-5 text-pink-400' />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className='px-6 pb-6 pr-14'>
                      <p className='text-sm md:text-base leading-7 text-zinc-400'>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
