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
  { id: "pharmacist", label: "Pharmacist" },
  { id: "lab_technician", label: "Lab Technician" },
];

type GuideItem = VideoGuideCardProps & { id: string };

/** Direct .mp4/.webm URLs use the custom player; YouTube watch/share links use an embed. */
const SAMPLE_VIDEO_URL = "https://youtu.be/vMz5FhPcMJE";

const GUIDES: GuideItem[] = [
  {
    id: "1",
    title: "How to add a patient",
    role: "doctor",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "2",
    title: "Ordering for a drug",
    role: "doctor",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "3",
    title: "Reviewing lab results in the chart",
    role: "doctor",
  },
  {
    id: "4",
    title: "Patient vitals & charting",
    role: "nurse",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "5",
    title: "Medication administration (MAR)",
    role: "nurse",
  },
  {
    id: "6",
    title: "Handoff & shift reports",
    role: "nurse",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "7",
    title: "User roles & permissions",
    role: "administrator",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "8",
    title: "Department & location setup",
    role: "administrator",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "9",
    title: "Audit logs & compliance",
    role: "administrator",
  },
  {
    id: "10",
    title: "Dispensing & inventory checks",
    role: "pharmacist",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "11",
    title: "Drug interaction alerts",
    role: "pharmacist",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "12",
    title: "Compounding workflows",
    role: "pharmacist",
  },
  {
    id: "13",
    title: "Receiving orders & specimens",
    role: "lab_technician",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "14",
    title: "Entering & verifying results",
    role: "lab_technician",
    videoUrl: SAMPLE_VIDEO_URL,
  },
  {
    id: "15",
    title: "Critical value notifications",
    role: "lab_technician",
  },
  {
    id: "16",
    title: "Discharge summary & follow-up",
    role: "doctor",
    videoUrl: SAMPLE_VIDEO_URL,
  },
];

export const VideoGuide = () => {
  const [filter, setFilter] = useState<FilterId>("all");

  const visibleGuides = useMemo(() => {
    if (filter === "all") return GUIDES;
    return GUIDES.filter((g) => g.role === filter);
  }, [filter]);

  return (
    <div className="w-full px-16 pb-24 md:px-[100px]">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 items-center mt-24 mb-12 text-center">
        <StyleText className="text-[72px] text-black uppercase">
          Video Guides
        </StyleText>
        <p className="text-2xl text-[#6B6161]">
          Tips and tutorials to help you navigate the system
        </p>
      </div>

      <div className="mx-auto max-w-screen-2xl border-b border-gray-200">
        <nav
          aria-label="Filter by role"
          className="flex flex-wrap gap-x-10 gap-y-3 justify-center"
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
