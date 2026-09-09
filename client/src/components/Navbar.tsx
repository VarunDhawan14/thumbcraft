import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        className='fixed top-0 z-50 flex items-center justify-between w-full py-2.5 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur'
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 70,
          mass: 1,
        }}
      >
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <img src={logo} alt='ThumbCraft' className='h-16 md:h-17 w-auto' />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 transition duration-500'>
          <Link to='/' className='hover:text-pink-500 transition'>
            Home
          </Link>

          <Link to='/generate' className='hover:text-pink-500 transition'>
            Generate
          </Link>

          {isLoggedIn ? (
            <Link
              to='/mygenerations'
              className='hover:text-pink-500 transition'
            >
              My Generations
            </Link>
          ) : (
            <Link to='#' className='hover:text-pink-500 transition'>
              About
            </Link>
          )}

          <Link to='/contact' className='hover:text-pink-500 transition'>
            Contact us
          </Link>
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-2'>
          {isLoggedIn ? (
            <div className='relative group'>
              <button
                type='button'
                className='rounded-full size-9 bg-white/20 border-2 border-white/10 hover:bg-white/30 transition'
                aria-label='Profile'
              >
                {user?.name?.charAt(0).toUpperCase()}
              </button>

              {/* Logout Dropdown */}
              <div className='absolute hidden group-hover:block top-8 right-0 pt-3'>
                <button
                  type='button'
                  onClick={() => logout()}
                  className='bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-lg hover:bg-white/20 transition'
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              type='button'
              onClick={() => navigate("/login")}
              className='hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full'
            >
              Get Started
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type='button'
            onClick={() => setIsOpen(true)}
            className='md:hidden'
            aria-label='Open menu'
          >
            <MenuIcon size={26} className='active:scale-90 transition' />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link onClick={() => setIsOpen(false)} to='/'>
          Home
        </Link>

        <Link onClick={() => setIsOpen(false)} to='/generate'>
          Generate
        </Link>

        {isLoggedIn ? (
          <Link onClick={() => setIsOpen(false)} to='/mygenerations'>
            My Generations
          </Link>
        ) : (
          <Link onClick={() => setIsOpen(false)} to='#'>
            About
          </Link>
        )}

        <Link onClick={() => setIsOpen(false)} to='/contact'>
          Contact us
        </Link>

        {isLoggedIn ? (
          <button
            type='button'
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <Link onClick={() => setIsOpen(false)} to='/login'>
            Login
          </Link>
        )}

        <button
          type='button'
          onClick={() => setIsOpen(false)}
          className='active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex'
          aria-label='Close menu'
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
