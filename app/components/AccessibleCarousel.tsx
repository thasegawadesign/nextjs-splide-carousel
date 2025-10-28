"use client";

import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type Slide = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth?: string;
  imgHeight?: string;
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

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const prevTimerRef = useRef<number | null>(null);
  const nextTimerRef = useRef<number | null>(null);

  const DISABLE_DELAY_MS = 80;
  const PADDING = "10%";

  useEffect(() => {
    if (!rootRef.current) return;

    const initialPadding = { left: PADDING, right: PADDING };

    const isTouch =
      typeof window !== "undefined" &&
      (matchMedia?.("(pointer: coarse)")?.matches || "ontouchstart" in window);

    const splide = new Splide(rootRef.current, {
      type: "slide",
      perPage: 2,
      perMove: 1,
      speed: 1200,
      gap: "1rem",
      easing: "cubic-bezier(0.18, 1.05, 0.22, 1)",
      trimSpace: true,
      rewind: false,
      arrows: false,
      pagination: false,
      drag: isTouch ? true : false,
      autoplay: false,
      accessibility: true,
      padding: initialPadding,
      breakpoints: {
        768: {
          perPage: 1,
          padding: initialPadding,
          trimSpace: true,
        },
      },
    });

    const updateLiveRegion = (indexZeroBased: number) => {
      if (!statusRef.current || !splideRef.current) return;

      const splide = splideRef.current;
      const totalSlides = splide.length;
      const perPage = splide.options.perPage ?? 1;

      const normalize = (i: number, n: number) => ((i % n) + n) % n;
      const head = normalize(indexZeroBased, totalSlides);

      if (perPage === 1) {
        const current = head + 1;
        statusRef.current.textContent = `${totalSlides}枚中${current}枚目に移動`;
        return;
      }

      const rangeStart = head + 1;
      const rangeEnd = Math.min(head + perPage, totalSlides);

      statusRef.current.textContent = `${totalSlides}枚中（${rangeStart}–${rangeEnd}枚目）に移動`;
    };

    const updatePadding = (index: number) => {
      const end = splide.Components.Controller.getEnd();
      const desired =
        index >= end
          ? { left: initialPadding.left, right: PADDING }
          : initialPadding;

      splide.options = {
        padding: desired,
      };
      splide.refresh();
    };

    const clearTimers = () => {
      if (prevTimerRef.current) {
        clearTimeout(prevTimerRef.current);
        prevTimerRef.current = null;
      }
      if (nextTimerRef.current) {
        clearTimeout(nextTimerRef.current);
        nextTimerRef.current = null;
      }
    };

    const scheduleDisable = (indexZeroBased: number) => {
      const len = splide.Components.Slides.getLength(true);
      if (indexZeroBased === 0) {
        if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
        prevTimerRef.current = window.setTimeout(
          () => setPrevDisabled(true),
          DISABLE_DELAY_MS,
        );
      } else {
        if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
        setPrevDisabled(false);
      }
      if (indexZeroBased === len - (splide.options.perPage || 1)) {
        if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
        nextTimerRef.current = window.setTimeout(
          () => setNextDisabled(true),
          DISABLE_DELAY_MS,
        );
      } else {
        if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
        setNextDisabled(false);
      }
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

    splide.on("moved", (newIndex) => {
      updateLiveRegion(newIndex);
      scheduleDisable(newIndex);
      updatePadding(newIndex);
    });

    splide.mount();
    splideRef.current = splide;
    return () => {
      clearTimers();
      splide.destroy();
      splideRef.current = null;
    };
  }, []);

  const goPrev = () => splideRef.current && splideRef.current.go("<");
  const goNext = () => splideRef.current && splideRef.current.go(">");

  const listId = "carousel-list";

  return (
    <>
      <div className="mr-[calc(50%-50vw)] ml-[calc(50%-50vw)] w-screen">
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
                      className="h-80 w-full rounded-4xl object-cover lg:h-128"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 flex items-center justify-end rounded-xl px-[10%]">
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="前のスライドへ"
                aria-controls={listId}
                disabled={prevDisabled}
                className={clsx(
                  "cursor-pointer rounded-full bg-black/50 p-3 text-white/70 ring-1 ring-white/30 outline-offset-2 transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white",
                  { "pointer-events-none opacity-50": prevDisabled },
                )}
              >
                <FaChevronLeft className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="次のスライドへ"
                aria-controls={listId}
                disabled={nextDisabled}
                className={clsx(
                  "cursor-pointer rounded-full bg-black/50 p-3 text-white/70 ring-1 ring-white/30 outline-offset-2 transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white",
                  { "pointer-events-none opacity-50": nextDisabled },
                )}
              >
                <FaChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
