import { ModalTypes, useModalStore } from "@/modal/GlobalModal";
import { Button } from "@ui";
import classNames from "classnames";
import { Demo } from "./Icons";

export const StyleText = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => (
  <p className={className} style={{ fontFamily: "Microgramma" }}>
    {children}
  </p>
);

export const HeroButton = ({ className }: { className?: string }) => {
  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className={classNames("flex flex-col gap-4 sm:flex-row sm:gap-8", className)}>
      <Button
        kinds={"secondary"}
        onClick={() => openModal(ModalTypes.REQUEST_DEMO_DRAWER)}
      >
        <span>Request Demo</span>
        <Demo />
      </Button>
      {/* <Button>
      <span>Sign in</span>
      <Next />
    </Button> */}
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="relative flex min-h-[min(100svh,720px)] items-center justify-center overflow-hidden sm:min-h-[640px] lg:min-h-[721px]"
      id="home"
    >
      <div className="absolute inset-0">
        <img
          alt="a doctor sitting in his office"
          className="h-full w-full object-cover"
          src="/banner.jpg"
        />
      </div>
      <div className="absolute inset-0 flex flex-1 bg-black/70" />
      <div className="z-10 flex max-w-[990px] flex-col justify-center gap-10 px-4 py-16 sm:gap-14 sm:px-6 md:gap-[70px] lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6">
          <StyleText className="text-3xl uppercase leading-tight text-white sm:text-4xl sm:leading-snug md:text-5xl lg:text-[56px] lg:leading-[72px]">
            Smarter Healthcare, Seamless Workflow
          </StyleText>
          <p className="max-w-[744px] text-base text-white sm:text-lg">
            The all-in-one Electronic Medical Record (EMR) system built to
            simplify patient care, streamline hospital operations, and improve
            outcomes.
          </p>
        </div>
        <HeroButton className="justify-center" />
      </div>
    </div>
  );
};

export default Hero;
