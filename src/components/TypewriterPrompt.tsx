import { useState, useEffect, useRef } from 'react';

interface TypewriterPromptProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypewriterPrompt({ text, speed = 45, onComplete }: TypewriterPromptProps) {
  const [displayed, setDisplayed] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const calledComplete = useRef(false);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDisplayed((prev) => {
        if (prev >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!calledComplete.current && onComplete) {
            calledComplete.current = true;
            setTimeout(onComplete, 300);
          }
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, onComplete]);

  useEffect(() => {
    const blink = window.setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="typewriter">
      <span className="typewriter-prefix">{'> '}</span>
      <span>{text.slice(0, displayed)}</span>
      <span className="typewriter-cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
    </div>
  );
}
