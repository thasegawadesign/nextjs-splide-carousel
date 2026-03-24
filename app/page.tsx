import AccessibleCarousel, { Slide } from "@/app/components/AccessibleCarousel";

const slides: Slide[] = [
  {
    id: "s1",
    imgSrc: "/photo1.avif",
    imgAlt: "カクレクマノミ",
    imgWidth: "6000",
    imgHeight: "4000",
  },
  {
    id: "s2",
    imgSrc: "/photo2.avif",
    imgAlt: "ニシキテグリ",
    imgWidth: "5184",
    imgHeight: "2912",
  },
  {
    id: "s3",
    imgSrc: "/photo3.avif",
    imgAlt: "タコクラゲ",
    imgWidth: "3600",
    imgHeight: "2400",
  },
  {
    id: "s4",
    imgSrc: "/photo4.avif",
    imgAlt: "ウミウシ",
    imgWidth: "2761",
    imgHeight: "1952",
  },
  {
    id: "s5",
    imgSrc: "/photo5.avif",
    imgAlt: "ウニ",
    imgWidth: "4000",
    imgHeight: "2672",
  },
];

export default function Home() {
  return (
    <main className="mx-auto px-5 py-20">
      <AccessibleCarousel slides={slides} ariaLabel="おすすめコンテンツ" />
    </main>
  );
}
