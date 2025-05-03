"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Switch } from "@/app/components/ui/Switch";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shutterControls = useAnimation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "HOME", href: "#" },
    { name: "ABOUT", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  // Use useEffect to create a custom animation sequence that respects the "floor"
  useLayoutEffect(() => {
    if (!isMenuOpen) return;

    const animateShutter = async () => {
      // Fast initial drop to the floor
      await shutterControls.start({
        y: 0,
        transition: { duration: 0.3, ease: "easeIn" },
      });

      // Series of bounces that never go below y=0 (the floor)
      await shutterControls.start({
        y: [0, -80, 0, -40, 0, -20, 0, -10, 0, -5, 0],
        transition: {
          duration: 1.5,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
          ease: "easeOut",
        },
      });
    };

    // Delay the animation until next tick so the element mounts
    requestAnimationFrame(() => {
      animateShutter();
    });
  }, [isMenuOpen, shutterControls]);

  // Handle exit animation separately
  useEffect(() => {
    if (!isMenuOpen) {
      shutterControls.start({
        y: "-100%",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [isMenuOpen, shutterControls]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="w-full shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Logo</div>
          <div className="cursor-pointer z-50">
            <Switch isChecked={isMenuOpen} onChange={toggleMenu} />
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 bg-white z-40"
            initial={{ y: "-100%" }}
            animate={shutterControls}
            exit={{ y: "-100%", transition: { duration: 0.5 } }}
          >
            <nav className="flex flex-col items-start justify-center gap-8 pl-16 w-full h-full">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  // No initial opacity animation - items are visible from the start
                  animate={{
                    y: [0, -30 - i * 15, 0, -15 - i * 8, 0, -5 - i * 3, 0],
                    transition: {
                      duration: 1.2,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                      ease: "easeOut",
                      delay: 0.3, // All items start bouncing at the same time after shutter impact
                    },
                  }}
                  // No exit opacity animation
                  exit={{ y: 0 }}
                  className="overflow-visible"
                >
                  <motion.a
                    href={item.href}
                    className="text-black text-6xl font-black tracking-tighter hover:text-gray-500 transition-colors block"
                    whileHover={{
                      x: 20,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
