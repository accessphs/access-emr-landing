import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { StyleText } from "./Hero";
import { ArrowRight } from "./Icons";

const testimonials = [
  {
    quote:
      "With Access EMR, I spend less time buried in paperwork and more time with my patients. Having lab results, prescriptions, and patient history in one place has transformed how I work.",
    name: "Dr. Ayooluwa Gbadamosi",
    role: "General Practitioner",
    logoSrc: "/boston-logo.png",
    logoTitle: "Boston Children’s Hospital",
    logoSubtitle: "Where the world comes for answers",
  },
  {
    quote:
      "Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.",
    name: "Dr. Jonathan Peters",
    role: "Pediatric Consultant",
    logoSrc: "/boston-logo.png",
    logoTitle: "Boston Children’s Hospital",
    logoSubtitle: "Where the world comes for answers",
  },
  {
    quote:
      "Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.",
    name: "Dr. Jonathan Peters",
    role: "Pediatric Consultant",
    logoSrc: "/boston-logo.png",
    logoTitle: "Boston Children’s Hospital",
    logoSubtitle: "Where the world comes for answers",
  },
  {
    quote:
      "Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.",
    name: "Dr. Jonathan Peters",
    role: "Pediatric Consultant",
    logoSrc: "/boston-logo.png",
    logoTitle: "Boston Children’s Hospital",
    logoSubtitle: "Where the world comes for answers",
  },
];

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  logoSrc: string;
  logoTitle: string;
  logoSubtitle?: string;
};

/** Breakpoints are max-width; list largest → smallest so narrow viewports get the tightest settings. */
const sliderSettings: Settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 3,
  speed: 500,
  swipeToSlide: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
  ],
};

const TestimonialCard = ({
  quote,
  name,
  role,
  logoSrc,
  logoTitle,
  logoSubtitle,
}: TestimonialCardProps) => {
  return (
    <div className="relative pt-5">
      <div className="max-w-[480px] rounded-xl bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-8">
        <div className="absolute left-1/2 top-1 z-30 -translate-x-1/2">
          <span className="text-5xl leading-none text-[#90A47C] sm:text-6xl">
            “
          </span>
        </div>

        <p className="mb-6 leading-relaxed text-gray-700">“{quote}”</p>

        <div className="mb-6">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>

        <div className="flex items-center gap-3">
          <img alt={`${logoTitle} logo`} className="h-10" src={logoSrc} />

          <div>
            <p className="font-semibold leading-tight text-[#0055A4]">
              {logoTitle}
            </p>

            {logoSubtitle ? (
              <p className="text-xs leading-tight text-[#A1449C]">
                {logoSubtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Testimonial = () => {
  const sliderRef = useRef<Slider | null>(
    null
  ) as React.MutableRefObject<Slider>;

  return (
    <div className="flex bg-[#F7F7F7]" id="testimonials">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-12 sm:gap-10 sm:py-16 md:ml-8 md:px-6 lg:ml-[100px] lg:my-[120px] lg:gap-11">
        <div className="flex max-w-[1000px] flex-col gap-5 sm:gap-6">
          <StyleText className="text-2xl uppercase leading-tight sm:text-3xl md:text-[40px] md:leading-[52px] lg:max-w-[763px]">
            Trusted by Healthcare Professionals
          </StyleText>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-xl text-base font-light text-[#6B6161] sm:text-lg md:text-2xl">
              Hear what our users have to say about us
            </p>
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <button
                aria-label="Previous testimonials"
                className="flex size-10 items-center justify-center rounded-full border border-[#1A1A1A] bg-white rotate-180 hover:bg-gray-200"
                type="button"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <ArrowRight />
              </button>
              <button
                aria-label="Next testimonials"
                className="flex size-10 items-center justify-center rounded-full border border-[#1A1A1A] bg-white hover:bg-gray-200"
                type="button"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <Slider {...sliderSettings} ref={sliderRef}>
            {testimonials.map((t, i) => (
              <div
                className="px-2 sm:px-4"
                key={i}
                style={{ width: "min(calc(100vw - 2.5rem), 480px)" }}
              >
                <TestimonialCard {...t} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
