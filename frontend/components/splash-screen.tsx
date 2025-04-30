"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const pathname = usePathname()
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Determine if we're on the home page
  const isHomePage = pathname === "/"

  // Set different timings based on page
  const splashDuration = isHomePage ? 3500 : 2000
  const exitAnimationDuration = 1000 // Reduced from 1500 to 1000

  // Start exit animation sequence
  const startExitSequence = () => {
    setIsExiting(true)

    // After exit animations complete, hide the splash screen
    exitTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
      setIsExiting(false)
    }, exitAnimationDuration)
  }

  useEffect(() => {
    // Initial page load
    if (!hasInitialized) {
      // Store that we've seen the initial splash screen
      sessionStorage.setItem("hasSeenInitialSplash", "true")
      setHasInitialized(true)

      // Start exit sequence before the full duration to account for animation time
      const timer = setTimeout(() => {
        startExitSequence()
      }, splashDuration - exitAnimationDuration)

      return () => {
        clearTimeout(timer)
        if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [hasInitialized, splashDuration])

  // Handle page navigation
  useEffect(() => {
    // Show splash screen on page change, but only after initial load
    if (hasInitialized) {
      setIsVisible(true)
      setIsExiting(false)

      // Start exit sequence before the full duration to account for animation time
      const timer = setTimeout(() => {
        startExitSequence()
      }, splashDuration - exitAnimationDuration)

      return () => {
        clearTimeout(timer)
        if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [pathname, hasInitialized, splashDuration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: exitAnimationDuration / 1000 - 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.5, // was 0.8
                ease: "easeOut",
                exit: { delay: isExiting ? 0.5 : 0 }, // was 0.9
              }}
              className="mb-8"
            >
              <div className="relative h-24 w-24 md:h-32 md:w-32">
                {/* Replace with your actual logo */}
                <Image
                  src="/empire-link-limousine-logo.webp"
                  alt="Empire Link Limo Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Text animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{
                delay: 0.2, // was 0.3
                duration: 0.5, // was 0.8
                exit: { delay: isExiting ? 0.4 : 0 }, // was 0.6
              }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">
                <span className="gold-gradient">Empire Link</span> Limo
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{
                  delay: 0.4, // was 0.6
                  duration: 0.5, // was 0.8
                  exit: { delay: isExiting ? 0.2 : 0 }, // was 0.3
                }}
                className="h-0.5 bg-gold mx-auto mb-4"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.5, // was 0.9
                  duration: 0.5, // was 0.8
                  exit: { delay: isExiting ? 0 : 0 },
                }}
                className="text-gray-300"
              >
                Premium Corporate Transportation
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.7, // was 1.2
                duration: 0.3, // was 0.5
                exit: { duration: 0.2, delay: 0 }, // was 0.3
              }}
              className="mt-12"
            >
              <div className="relative">
                <div className="h-0.5 w-32 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: isHomePage ? 1.2 : 0.8, // was 2 : 1.3 // Faster animation for shorter display time
                      ease: "linear",
                    }}
                    className="h-full w-16 bg-gold absolute"
                  />
                </div>
              </div>
            </motion.div>

            {/* Page indicator */}
            {!isHomePage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.9, // was 1.5
                  duration: 0.3, // was 0.5
                  exit: { duration: 0.2, delay: 0 }, // was 0.3
                }}
                className="mt-4 text-sm text-gray-400"
              >
                Loading {pathname.substring(1)}...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
