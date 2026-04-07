import {
  VideoGuideCard,
  VideoGuideFilterTab,
  type VideoGuideCardProps,
  type VideoGuideRole,
} from "@ui";
import { useMemo, useState } from "react";
import { StyleText } from "./Hero";

type FilterId = "all" | VideoGuideRole;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "administrator", label: "Administrators" },
  { id: "doctor", label: "Doctors" },
  { id: "nurse", label: "Nurses" },
  { id: "receptionist", label: "Receptionist" },
  { id: "pharmacist", label: "Pharmacist" },
  { id: "lab_technician", label: "Lab Technician" },
];

type GuideItem = VideoGuideCardProps & { id: string };

/** Direct .mp4/.webm URLs use the custom player; YouTube watch/share links use an embed. */
// const SAMPLE_VIDEO_URL = "https://youtu.be/vMz5FhPcMJE";

const GUIDES: GuideItem[] = [
  {
    id: "A",
    title: "Administrator's Introduction",
    role: "administrator",
    videoUrl: "https://youtu.be/cJHMCZhNzNo",
  },
  {
    id: "1",
    title: "Doctor's Introduction",
    role: "doctor",
    videoUrl: "https://youtu.be/oSzOYrIlx68",
  },
  {
    id: "2",
    title: "Nurse's Introduction",
    role: "nurse",
    videoUrl: "https://youtu.be/QBi3x0xpKE8",
  },
  {
    id: "3",
    title: "Receptionist's Introduction",
    role: "receptionist",
    videoUrl: "https://youtu.be/vMz5FhPcMJE",
  },
  // {
  //   id: "4",
  //   title: "Patient vitals & charting",
  //   role: "nurse",
  // },
  // {
  //   id: "5",
  //   title: "Medication administration (MAR)",
  //   role: "nurse",
  // },
  // {
  //   id: "6",
  //   title: "Handoff & shift reports",
  //   role: "nurse",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "7",
  //   title: "User roles & permissions",
  //   role: "administrator",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "8",
  //   title: "Department & location setup",
  //   role: "administrator",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "9",
  //   title: "Audit logs & compliance",
  //   role: "administrator",
  // },
  // {
  //   id: "10",
  //   title: "Dispensing & inventory checks",
  //   role: "pharmacist",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "11",
  //   title: "Drug interaction alerts",
  //   role: "pharmacist",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "12",
  //   title: "Compounding workflows",
  //   role: "pharmacist",
  // },
  // {
  //   id: "13",
  //   title: "Receiving orders & specimens",
  //   role: "lab_technician",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "14",
  //   title: "Entering & verifying results",
  //   role: "lab_technician",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
  // {
  //   id: "15",
  //   title: "Critical value notifications",
  //   role: "lab_technician",
  // },
  // {
  //   id: "16",
  //   title: "Discharge summary & follow-up",
  //   role: "doctor",
  //   videoUrl: SAMPLE_VIDEO_URL,
  // },
];

export const VideoGuide = () => {
  const [filter, setFilter] = useState<FilterId>("all");

  const visibleGuides = useMemo(() => {
    if (filter === "all") return GUIDES;
    return GUIDES.filter((g) => g.role === filter);
  }, [filter]);

  return (
    <div className="w-full px-4 pb-16 sm:px-6 sm:pb-20 md:px-12 md:pb-24 lg:px-[100px]">
      <div className="mx-auto mt-16 mb-8 flex max-w-screen-2xl flex-col items-center gap-2 text-center sm:mt-20 sm:mb-10 md:mt-24 md:mb-12">
        <StyleText className="text-3xl uppercase text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px]">
          Video Guides
        </StyleText>
        <p className="max-w-2xl text-base text-[#6B6161] sm:text-lg md:text-2xl">
          Tips and tutorials to help you navigate the system
        </p>
      </div>

      <div className="mx-auto max-w-screen-2xl border-b border-gray-200">
        <nav
          aria-label="Filter by role"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 md:gap-x-10"
        >
          {FILTERS.map(({ id, label }) => (
            <VideoGuideFilterTab
              key={id}
              active={filter === id}
              label={label}
              onSelect={() => setFilter(id)}
            />
          ))}
        </nav>
      </div>

      <ul className="mx-auto mt-12 grid max-w-screen-2xl list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {visibleGuides.map(({ id, title, role, thumbnailSrc, videoUrl }) => (
          <li key={id}>
            <VideoGuideCard
              role={role}
              thumbnailSrc={thumbnailSrc}
              title={title}
              videoUrl={videoUrl}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
