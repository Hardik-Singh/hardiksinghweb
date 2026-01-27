import { useEffect, useRef } from 'react';
import { useThemeStore } from '../store/themeStore';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const { theme } = useThemeStore();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Colors based on theme
    const lightColors = ['#F4A7B9', '#FBBAC7', '#E8879B', '#FFD4DD'];
    const darkColors = ['#D4879A', '#C4728A', '#B8607A', '#A8506A'];
    const colors = theme === 'dark' ? darkColors : lightColors;

    const particleColors = theme === 'dark'
      ? ['#D4879A', '#C4728A', '#B8965A']
      : ['#F4A7B9', '#E8879B', '#C9A961'];

    const petalCount = 15; // Reduced for subtlety
    const particleCount = 30; // Subtle particle count

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize petals
    const createPetal = (): Petal => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: Math.random() * 0.3 - 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.15 + 0.05, // Very subtle: 0.05-0.2
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    // Initialize particles
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    });

    petalsRef.current = Array.from({ length: petalCount }, createPetal);
    particlesRef.current = Array.from({ length: particleCount }, createParticle);

    // Draw petal shape
    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      ctx.fillStyle = petal.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        petal.size * 0.3, -petal.size * 0.5,
        petal.size * 0.8, -petal.size * 0.5,
        petal.size, 0
      );
      ctx.bezierCurveTo(
        petal.size * 0.8, petal.size * 0.5,
        petal.size * 0.3, petal.size * 0.5,
        0, 0
      );
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw petals
      petalsRef.current.forEach((petal, index) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.3;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          petalsRef.current[index] = createPetal();
          petalsRef.current[index].y = -20;
        }

        if (petal.x > canvas.width + 20) {
          petal.x = -20;
        } else if (petal.x < -20) {
          petal.x = canvas.width + 20;
        }

        drawPetal(petal);
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.1; // Very subtle particles
        ctx.fill();
      });

      // Draw subtle connections between nearby particles
      const connectionColor = theme === 'dark' ? '212, 135, 154' : '244, 167, 185';
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${connectionColor}, ${(1 - distance / 120) * 0.08})`; // Very subtle
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default AmbientBackground;
