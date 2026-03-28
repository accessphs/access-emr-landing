import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import { StyleText } from './Hero'
import { ArrowRight } from './Icons'

const testimonials = [
  {
    quote:
      'With Access EMR, I spend less time buried in paperwork and more time with my patients. Having lab results, prescriptions, and patient history in one place has transformed how I work.',
    name: 'Dr. Ayooluwa Gbadamosi',
    role: 'General Practitioner',
    logoSrc: '/boston-logo.png',
    logoTitle: 'Boston Children’s Hospital',
    logoSubtitle: 'Where the world comes for answers'
  },
  {
    quote:
      'Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.',
    name: 'Dr. Jonathan Peters',
    role: 'Pediatric Consultant',
    logoSrc: '/boston-logo.png',
    logoTitle: 'Boston Children’s Hospital',
    logoSubtitle: 'Where the world comes for answers'
  },
  {
    quote:
      'Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.',
    name: 'Dr. Jonathan Peters',
    role: 'Pediatric Consultant',
    logoSrc: '/boston-logo.png',
    logoTitle: 'Boston Children’s Hospital',
    logoSubtitle: 'Where the world comes for answers'
  },
  {
    quote:
      'Access EMR has streamlined clinical operations and improved patient care. My workflow is faster and more organized.',
    name: 'Dr. Jonathan Peters',
    role: 'Pediatric Consultant',
    logoSrc: '/boston-logo.png',
    logoTitle: 'Boston Children’s Hospital',
    logoSubtitle: 'Where the world comes for answers'
  }
]

type TestimonialCardProps = {
  quote: string
  name: string
  role: string
  logoSrc: string
  logoTitle: string
  logoSubtitle?: string
}

const baseSettings: Settings = {
  arrows: false,
  dots: false,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 3,
  speed: 500,
  swipeToSlide: true
}

const sliderSettings: Settings = {
  ...baseSettings,
  variableWidth: true
}

const TestimonialCard = ({ quote, name, role, logoSrc, logoTitle, logoSubtitle }: TestimonialCardProps) => {
  return (
    <div className="relative pt-5">
      <div className="rounded-xl shadow-sm px-6 py-8 bg-white max-w-[480px]">
        {/* Quote Icon */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30">
          <span className="text-6xl text-[#90A47C] leading-none">“</span>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 leading-relaxed mb-6">“{quote}”</p>

        {/* Name + Role */}
        <div className="mb-6">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>

        {/* Logo + Text */}
        <div className="flex items-center gap-3">
          <img alt={`${logoTitle} logo`} className="h-10" src={logoSrc} />

          <div>
            <p className="text-[#0055A4] font-semibold leading-tight">{logoTitle}</p>

            {logoSubtitle && <p className="text-[#A1449C] text-xs leading-tight">{logoSubtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Testimonial = () => {
  const sliderRef = useRef<Slider | null>(null) as React.MutableRefObject<Slider>
  const next = () => {
    sliderRef.current?.slickNext()
  }

  const previous = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <div className="flex bg-[#F7F7F7]" id="testimonials">
      <div className="my-[120px] ml-[100px] flex flex-col gap-11">
        <div className="flex flex-col gap-6 max-w-[1300px]">
          <StyleText className="text-[40px]/[52px] uppercase max-w-[763px]">
            Trusted by Healthcare Professionals
          </StyleText>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-light text-[#6B6161]">Hear what our users have to say about us</p>
            <div className="flex gap-5 items-center">
              <button
                className="size-10 rounded-full border border-[#1A1A1A] flex justify-center items-center rotate-180 hover:bg-gray-200 bg-white"
                onClick={previous}
              >
                <ArrowRight />
              </button>
              <button
                className="size-10 rounded-full border border-[#1A1A1A] flex justify-center items-center bg-white hover:bg-gray-200"
                onClick={next}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <Slider {...sliderSettings} ref={sliderRef}>
            {testimonials?.map((t, i) => (
              <div className="px-4" key={i} style={{ width: 500 }}>
                <TestimonialCard {...t} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
