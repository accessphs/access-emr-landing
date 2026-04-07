import { HeroButton, StyleText } from "./Hero";

export const System = () => {
  return (
    <div className="relative flex min-h-[520px] flex-col items-stretch overflow-hidden bg-[#021631] py-12 sm:min-h-[620px] sm:py-16 lg:min-h-[750px] lg:flex-row lg:items-center lg:py-0">
      <div className="pointer-events-none absolute -right-6 top-6 w-[min(100%,380px)] sm:right-0 sm:top-10 sm:w-[min(100%,480px)] lg:inset-y-0 lg:left-auto lg:right-0 lg:top-auto lg:flex lg:w-1/2 lg:max-w-[660px] lg:items-center">
        <div className="max-h-[280px] max-w-full opacity-90 sm:max-h-[360px] lg:max-h-[780px] lg:opacity-100">
          <img
            alt="world globe"
            className="h-full w-full object-contain object-right"
            src="globe.png"
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-8 px-4 sm:gap-10 sm:px-6 md:ml-8 lg:ml-[100px] lg:gap-12">
        <div className="flex max-w-[619px] flex-col gap-4 sm:gap-6">
          <StyleText className="text-2xl uppercase leading-tight text-white sm:text-3xl md:text-[40px] md:leading-[52px]">
            REVOLUTIONIZING healTHCARE system IN AFRICA
          </StyleText>
          <p className="text-sm font-light text-[#F7F7F7] sm:text-base">
            From small clinics to large hospitals, we’re driving Africa’s digital
            health transformation. By empowering providers with innovative tools,
            we’re not just upgrading systems — we’re shaping healthier communities
            for generations to come
          </p>
        </div>
        <HeroButton className="justify-start" />
      </div>
    </div>
  );
};
