import { motion } from "motion/react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Generate", href: "/generate" },
      { name: "My Generations", href: "/mygenerations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Home", href: "/" },
      { name: "Contact Us", href: "/contact" },
      { name: "My Generations", href: "/mygenerations" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='mt-40 border-t border-white/10 bg-black px-6 py-12 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col gap-12 lg:flex-row lg:justify-between'>
        {/* LEFT SIDE */}
        <motion.div
          className='grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-16 lg:gap-24'
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 70,
            mass: 1,
          }}
        >
          {/* LOGO */}
          <div className='flex flex-col gap-3'>
            <Link to='/' className='w-fit'>
              <img
                src='/favicon.svg'
                alt='ThumbCraft'
                className='size-8'
                width={32}
                height={32}
              />
            </Link>

            <Link
              to='/'
              className='text-sm text-gray-400 transition hover:text-white'
            >
              Home
            </Link>
          </div>

          {/* FOOTER SECTIONS */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className='font-semibold text-white'>{section.title}</p>

              <ul className='mt-3 space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className='text-sm text-gray-400 transition hover:text-pink-500'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className='flex flex-col gap-3 lg:items-end lg:text-right'
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 70,
            mass: 1,
          }}
        >
          <p className='text-sm text-gray-400'>Contact us at:</p>

          <a
            href='mailto:thumbcraftai10@gmail.com'
            className='text-sm text-gray-400 transition hover:text-pink-500'
          >
            thumbcraftai10@gmail.com
          </a>

          <p className='mt-3 text-sm text-gray-500'>
            © {new Date().getFullYear()}{" "}
            <span className='text-gray-400'>ThumbCraft</span>
          </p>
        </motion.div>
      </div>

      {/* BOTTOM BORDER */}
      <div className='mt-10 border-t border-white/10 pt-5'>
        <p className='text-xs text-gray-600'>
          AI-powered thumbnail generation made simple.
        </p>
      </div>
    </footer>
  );
}
