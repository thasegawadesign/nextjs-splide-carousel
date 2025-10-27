"use client";

import Splide from "@splidejs/splide";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  ariaLabel = "おすすめコンテンツ",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const splideRef = useRef<Splide | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const isTouch =
      typeof window !== "undefined" &&
      (matchMedia?.("(pointer: coarse)")?.matches || "ontouchstart" in window);

    const splide = new Splide(rootRef.current, {
      type: "slide",
      perPage: 2,
      perMove: 1,
      speed: 450,
      gap: "1rem",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      trimSpace: true,
      rewind: true,
      arrows: false,
      pagination: false,
      drag: isTouch ? true : false,
      autoplay: false,
      accessibility: true,
      padding: { left: 0, right: "15%" },
      breakpoints: {
        768: {
          perPage: 1,
          gap: "0.75rem",
          padding: { left: 0, right: "20%" },
          trimSpace: true,
        },
      },
    });

    const updateLiveRegion = (indexZeroBased: number) => {
      if (!statusRef.current) return;
      const total = splide.Components.Slides.getLength(true);
      const current = (indexZeroBased % total) + 1;
      statusRef.current.textContent = `${total}枚中${current}枚目に移動`;
    };

    splide.on("mounted", () => {
      rootRef.current
        ?.querySelectorAll<HTMLLIElement>(".splide__slide[aria-hidden='true']")
        .forEach((el) => el.setAttribute("aria-hidden", "true"));

      updateLiveRegion(splide.index);
    });

    splide.on("move", (newIndex) => {
      updateLiveRegion(newIndex);
    });

    splide.mount();
    splideRef.current = splide;
    return () => {
      splide.destroy();
      splideRef.current = null;
    };
  }, []);

  const goPrev = () => splideRef.current && splideRef.current.go("<");
  const goNext = () => splideRef.current && splideRef.current.go(">");

  const listId = "carousel-list";

  return (
    <>
      <div
        ref={rootRef}
        className="splide relative"
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
                {s.imgSrc && (
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt ?? ""}
                    width={s.imgWidth ? parseInt(s.imgWidth, 10) : 400}
                    height={s.imgHeight ? parseInt(s.imgHeight, 10) : 240}
                    className="aspect-video h-60 w-full rounded-xl object-cover"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex items-center justify-end gap-3 rounded-xl px-3 py-2">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="前のスライドへ"
              aria-controls={listId}
              className="cursor-pointer rounded-full bg-black/50 p-2.5 text-white/80 ring-1 ring-white/30 outline-offset-2 transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="次のスライドへ"
              aria-controls={listId}
              className="cursor-pointer rounded-full bg-black/50 p-2.5 text-white/80 ring-1 ring-white/30 outline-offset-2 transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
