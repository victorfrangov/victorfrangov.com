'use client';

import * as React from 'react';
import { motion, useAnimate } from 'motion/react';
import { cn } from '@/lib/utils';

type TextGenerateEffectProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  words: string;
  duration?: number;
  staggerDelay?: number;
  filter?: boolean;
  once?: boolean;
  rootMargin?: string;
};

export function TextGenerateEffect({
  words,
  duration = 0.6,
  staggerDelay = 0.12,
  filter = true,
  once = true,
  rootMargin = '0px 0px -10% 0px',
  className,
  ...props
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const [hasPlayed, setHasPlayed] = React.useState(false);

  React.useEffect(() => {
    if (!scope.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && (!hasPlayed || !once)) {
          // Animate each word with stagger
          const wordSpans = scope.current!.querySelectorAll('[data-word]') as NodeListOf<HTMLElement>

          wordSpans.forEach((el, i) => {
            const keyframes: Keyframe[] = [
              { opacity: 0, transform: 'translateY(8px)', filter: filter ? 'blur(4px)' : 'none' },
              { opacity: 1, transform: 'translateY(0px)', filter: 'none' },
            ]

            el.animate(keyframes, {
              duration,
              delay: i * staggerDelay,
              easing: 'ease-out',
              fill: 'forwards',
            })
          });
          setHasPlayed(true);
        }
      },
      { root: null, rootMargin, threshold: 0.2 }
    );

    observer.observe(scope.current);
    return () => observer.disconnect();
  }, [scope, animate, duration, staggerDelay, filter, once, hasPlayed, rootMargin]);

  const split = words.split(' ');

  return (
    <div ref={scope} className={cn('inline-block', className)} {...props}>
      {split.map((w, i) => (
        <motion.span
          key={i}
          data-word
          initial={{ opacity: 0, y: 8, filter: filter ? 'blur(4px)' : 'none' }}
          style={{ display: 'inline-block', marginRight: 8 }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}