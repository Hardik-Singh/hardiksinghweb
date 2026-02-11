import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, .project-card, .skill-tag, .tech-item, .contact-item, .experience-card';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(false);
      }
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  // Hide on mobile/touch devices or if reduced motion is preferred
  if (typeof window !== 'undefined' && ('ontouchstart' in window || prefersReducedMotion)) {
    return null;
  }

  return (
    <motion.div
      className="cursor-follower"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
        scale: isHovering ? 1.8 : 1,
        opacity: isVisible ? (isHovering ? 0.2 : 0.4) : 0
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  );
};

export default CursorFollower;
