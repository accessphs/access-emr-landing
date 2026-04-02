import { ModalTypes, useModalStore } from "@/modal/GlobalModal";
import classNames from "classnames";

export type VideoGuideRole =
  | "administrator"
  | "doctor"
  | "nurse"
  | "pharmacist"
  | "lab_technician"
  | "receptionist";

const ROLE_META: Record<
  VideoGuideRole,
  { label: string; badgeClass: string }
> = {
  nurse: {
    label: "Nurse's flow",
    badgeClass: "bg-[#F5F0D8] text-[#4a4a2a]",
  },
  doctor: {
    label: "Doctor's flow",
    badgeClass: "bg-[#E3F2E6] text-[#1B5E20]",
  },
  administrator: {
    label: "Administrator's flow",
    badgeClass: "bg-[#E3F2FD] text-[#0D47A1]",
  },
  pharmacist: {
    label: "Pharmacist's flow",
    badgeClass: "bg-[#FCE4EC] text-[#880E4F]",
  },
  lab_technician: {
    label: "Lab technician's flow",
    badgeClass: "bg-[#EDE7F6] text-[#4A148C]",
  },
  receptionist: {
    label: "Receptionist's flow",
    badgeClass: "bg-[#F5F0D8] text-[#4a4a2a]",
  },
};

function PlayIcon() {
  return (
    <svg
      aria-hidden
      className="ml-0.5 h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect height="11" rx="2" width="14" x="5" y="11" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export type VideoGuideCardProps = {
  title: string;
  role: VideoGuideRole;
  thumbnailSrc?: string;
  /** When missing or blank, the card is shown as locked (no playback). */
  videoUrl?: string;
  className?: string;
};

export function VideoGuideCard({
  title,
  role,
  thumbnailSrc = "/tutorial.jpg",
  videoUrl,
  className,
}: VideoGuideCardProps) {
  const openModal = useModalStore((s) => s.openModal);
  const playableSrc = videoUrl?.trim() || null;
  const isLocked = !playableSrc;
  const { label, badgeClass } = ROLE_META[role];

  const media = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-gray-100">
      <img
        alt=""
        className="h-full w-full object-cover"
        decoding="async"
        loading="lazy"
        src={thumbnailSrc}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/[0.08]">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white shadow-sm backdrop-blur-[2px]"
          aria-hidden
        >
          {isLocked ? <LockIcon /> : <PlayIcon />}
        </span>
      </div>
    </div>
  );

  const body = (
    <>
      {media}
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-base font-semibold leading-snug text-gray-900">
          {title}
        </h3>
        <span
          className={classNames(
            "inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium",
            badgeClass
          )}
        >
          {label}
        </span>
      </div>
    </>
  );

  const shellClass = classNames(
    "overflow-hidden rounded-lg border border-[#E5E5E5] bg-white text-left shadow-sm transition-shadow",
    "hover:shadow-md focus-within:shadow-md",
    isLocked && "opacity-[0.98]",
    className
  );

  if (isLocked) {
    return (
      <article className={shellClass}>
        <button
          aria-label={`${title} (locked — sign in or request demo)`}
          className="block w-full cursor-pointer text-left outline-none ring-primary focus-visible:ring-2 focus-visible:ring-offset-2"
          type="button"
          onClick={() => openModal(ModalTypes.LOCKED_TUTORIAL, {})}
        >
          {body}
        </button>
      </article>
    );
  }

  return (
    <article className={shellClass}>
      <button
        className="block w-full cursor-pointer text-left outline-none ring-primary focus-visible:ring-2 focus-visible:ring-offset-2"
        type="button"
        onClick={() =>
          openModal(ModalTypes.VIDEO_GUIDE, {
            posterSrc: thumbnailSrc,
            title,
            videoUrl: playableSrc,
          })
        }
      >
        {body}
      </button>
    </article>
  );
}
