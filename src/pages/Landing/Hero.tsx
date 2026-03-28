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

export const HeroButton = ({ className }: { className?: string }) => (
  <div className={classNames("flex gap-8", className)}>
    <Button kinds={"secondary"}>
      <span>Request Demo</span>
      <Demo />
    </Button>
    {/* <Button>
      <span>Sign in</span>
      <Next />
    </Button> */}
  </div>
);

const Hero = () => {
  return (
    <div
      className="min-h-[721px] relative flex items-center justify-center overflow-hidden"
      id="home"
    >
      <div className="absolute inset-0">
        <img alt="a doctor sitting in his office" src="/banner.jpg" />
      </div>
      <div className="flex flex-1 bg-black/70 absolute inset-0"></div>
      <div className="flex flex-col gap-[70px] justify-center max-w-[990px] z-10">
        <div className="flex flex-col gap-6 text-center justify-center items-center">
          <StyleText className="text-[56px]/[72px] text-white uppercase">
            Smarter Healthcare, Seamless Workflow
          </StyleText>
          <p className="text-white text-lg max-w-[744px]">
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
