import AccessibleCarousel, { Slide } from "@/app/components/AccessibleCarousel";

const slides: Slide[] = [
  {
    id: "s1",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_298157092.avif",
    imgWidth: "6000",
    imgHeight: "4000",
    imgAlt: "",
  },
  {
    id: "s2",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_578141325.avif",
    imgWidth: "5184",
    imgHeight: "2912",
    imgAlt: "",
  },
  {
    id: "s3",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_963764512.avif",
    imgWidth: "3600",
    imgHeight: "2400",
    imgAlt: "",
  },
  {
    id: "s4",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_562011970.avif",
    imgWidth: "2761",
    imgHeight: "1952",
    imgAlt: "",
  },
  {
    id: "s5",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_279421172.avif",
    imgWidth: "4000",
    imgHeight: "2672",
    imgAlt: "",
  },
];

export default function Home() {
  return (
    <main className="mx-auto px-5 py-20">
      <AccessibleCarousel slides={slides} ariaLabel="おすすめコンテンツ" />
    </main>
  );
}
