'use client';

import Splide from '@splidejs/splide';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export type Slide = {
  id: string;
  title: string;
  description?: string;
  imgSrc?: string;
  imgWidth?: string;
  imgHeight?: string;
  imgAlt?: string;
};

type Props = {
  slides: Slide[];
  ariaLabel?: string;
};

export default function AccessibleCarousel({
  slides,
  ariaLabel = 'おすすめコンテンツ',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const isTouch =
      typeof window !== 'undefined' &&
      (matchMedia?.('(pointer: coarse)')?.matches || 'ontouchstart' in window);

    const splide = new Splide(rootRef.current, {
      type: 'loop',
      perPage: 1,
      speed: 450,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      arrows: true,
      pagination: true,
      drag: isTouch,
      autoplay: false,
      accessibility: true,
    });

    const updateLiveRegion = (indexZeroBased: number) => {
      if (!statusRef.current) return;
      const total = splide.Components.Slides.getLength(true);
      const current = (indexZeroBased % total) + 1;
      statusRef.current.textContent = `${total}枚中${current}枚目に移動`;
    };

    splide.on('mounted', () => {
      rootRef.current
        ?.querySelectorAll<HTMLLIElement>(".splide__slide[aria-hidden='true']")
        .forEach((el) => el.setAttribute('aria-hidden', 'true'));

      updateLiveRegion(splide.index);
    });

    splide.on('move', (newIndex) => {
      updateLiveRegion(newIndex);
    });

    splide.mount();
    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="splide"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div ref={statusRef} aria-live="polite" className="sr-only" />
      <div className="splide__track" aria-live="off">
        <ul className="splide__list">
          {slides.map((s, i) => (
            <li
              key={s.id}
              className="splide__slide"
              aria-label={`${i + 1} / ${slides.length}`}
            >
              <article className="relative flex flex-col items-start gap-3 p-6 rounded-2xl text-white">
                {s.imgSrc && (
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt ?? ''}
                    width={s.imgWidth ? parseInt(s.imgWidth, 10) : 400}
                    height={s.imgHeight ? parseInt(s.imgHeight, 10) : 240}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
