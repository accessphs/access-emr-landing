import { HeroButton, StyleText } from './Hero'

export const System = () => {
  return (
    <div className="min-h-[750px] bg-[#021631] flex items-center relative">
      <div className="absolute right-0">
        <div className="max-w-[660px] max-h-[780px]">
          <img alt="world globe" src="globe.png" />
        </div>
      </div>
      <div className="flex flex-col gap-12 ml-[100px]">
        <div className="max-w-[619px] flex flex-col gap-6">
          <StyleText className="text-white text-[40px]/[52px] uppercase">
            REVOLUTIONIZING healTHCARE system IN AFRICA
          </StyleText>
          <p className="font-light text-base text-[#F7F7F7]">
            From small clinics to large hospitals, we’re driving Africa’s digital health transformation. By empowering
            providers with innovative tools, we’re not just upgrading systems — we’re shaping healthier communities for
            generations to come
          </p>
        </div>
        <HeroButton className="justify-start" />
      </div>
    </div>
  )
}
