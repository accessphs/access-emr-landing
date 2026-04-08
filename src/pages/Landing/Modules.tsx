import Slider, { Settings } from "react-slick";
import { StyleText } from "./Hero";
import {
  BedMgt,
  Bill,
  DocTemp,
  Encounter,
  Hmo,
  Inventory,
  Lab,
  Mar,
  Note,
  Patient,
  Pharmacy,
  Radio,
  Role,
  SchMgt,
  StaffMgt,
} from "./Icons";

const module1 = [
  {
    color: "#FECDE4",
    icon: SchMgt,
    label: "SCHEDULE MANAGEMENT",
  },
  {
    color: "#DAF1DC",
    icon: Hmo,
    label: "HMOS",
  },
  {
    color: "#FBEBD5",
    icon: BedMgt,
    label: "BED MANAGEMENT",
  },
  {
    color: "#DBD7F4",
    icon: Inventory,
    label: "INVENTORY",
  },
  {
    color: "#FFCCCC",
    icon: Patient,
    label: "PATIENTS",
  },
  {
    color: "#CCDEFF",
    icon: Pharmacy,
    label: "PHARMACY",
  },
  {
    color: "#E8E8E8",
    icon: DocTemp,
    label: "DOCUMENT TEMPLATES",
  },
];
const module2 = [
  {
    color: "#E8E8E8",
    icon: Note,
    label: "NOTES",
  },
  {
    color: "#FCFDCE",
    icon: Encounter,
    label: "ENCOUNTERS",
  },
  {
    color: "#F2D9E8",
    icon: Lab,
    label: "LABORATORY",
  },
  {
    color: "#CEECFD",
    icon: Radio,
    label: "RADIOLOGY",
  },
  {
    color: "#E4EBE0",
    icon: Bill,
    label: "Billing",
  },
  {
    color: "#FBEBD5",
    icon: Mar,
    label: "M.A.R",
  },
  {
    color: "#FECDE4",
    icon: StaffMgt,
    label: "Staff management",
  },
  {
    color: "#DAF1DC",
    icon: Role,
    label: "Roles & Permission",
  },
];

const baseSettings: Settings = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  dots: false,
  draggable: true,
  infinite: true,
  responsive: [
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 900, settings: { slidesToShow: 4 } },
    { breakpoint: 1200, settings: { slidesToShow: 6 } },
  ],
  slidesToScroll: 1,
  slidesToShow: 6,
  speed: 5000,
};

const moduleGroups = [
  { modules: module1, rtl: false },
  { modules: module2, rtl: true },
];

const sliderSettings: Settings = {
  ...baseSettings,
  variableWidth: true,
};

const ModuleCard = ({
  color,
  Icon,
  label,
}: {
  color: string;
  Icon: React.FC;
  label: string;
}) => (
  <div
    className="flex w-fit max-w-[min(100vw-2rem,300px)] items-center justify-start gap-2 rounded-lg px-3 py-3 sm:gap-3 sm:px-5 sm:py-4"
    style={{ backgroundColor: color }}
  >
    <Icon />
    <p className="text-sm capitalize leading-tight text-[#1A1A1A] sm:text-base md:text-lg">
      {label}
    </p>
  </div>
);

const Modules = () => {
  return (
    <div className="flex min-h-[420px] w-full flex-col bg-gradient-to-b from-[#003D32] to-[#00705C] py-12 sm:min-h-[500px] sm:py-16 md:min-h-[580px]">
      <div className="mx-auto my-auto flex w-full max-w-screen-2xl flex-col gap-10 px-2 sm:gap-12 md:gap-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 text-center sm:gap-7">
          <StyleText className="text-2xl text-white sm:text-3xl md:text-[40px]">
            SOFTWARE MODULES
          </StyleText>
          <p className="text-base font-light text-[#B3B3B3] sm:text-lg md:text-2xl">
            We built customizable modules to help you manage your hospital
            effectively
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {moduleGroups?.map(({ modules, rtl }, idx) => (
            <div className="row flex gap-3" key={idx}>
              <Slider {...sliderSettings} rtl={rtl}>
                {modules?.map(({ color, icon: Icon, label }) => (
                  <div
                    className="px-2"
                    key={label}
                    style={{ width: "fit-content" }}
                  >
                    <ModuleCard Icon={Icon} color={color} label={label} />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
