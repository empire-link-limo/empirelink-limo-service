// hooks/use-mobile.tsx - Improved version
import { useState, useEffect, useCallback } from "react"

const MOBILE_BREAKPOINT = 900

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  // Use useCallback to ensure the handler doesn't change on re-renders
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  useEffect(() => {
    // Check immediately on mount
    checkMobile()
    
    // Use both resize and orientationchange events for better coverage
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)
    
    // Add a debounced check for extra reliability
    const debouncedCheck = setTimeout(checkMobile, 100)
    
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
      clearTimeout(debouncedCheck)
    }
  }, [checkMobile])

  return isMobile
}