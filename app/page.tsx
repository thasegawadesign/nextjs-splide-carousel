import AccessibleCarousel, { Slide } from "@/app/components/AccessibleCarousel";

const slides: Slide[] = [
  {
    id: "s1",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_298157092.avif",
    imgWidth: "400",
    imgHeight: "240",
    imgAlt: "",
  },
  {
    id: "s2",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_578141325.avif",
    imgWidth: "400",
    imgHeight: "240",
    imgAlt: "",
  },
  {
    id: "s3",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_963764512.avif",
    imgWidth: "400",
    imgHeight: "240",
    imgAlt: "",
  },
  {
    id: "s4",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_562011970.avif",
    imgWidth: "400",
    imgHeight: "240",
    imgAlt: "",
  },
  {
    id: "s5",
    title: "",
    description: "",
    imgSrc: "/AdobeStock_279421172.avif",
    imgWidth: "400",
    imgHeight: "240",
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
