type VideoGuideFilterTabProps = {
  active: boolean;
  label: string;
  onSelect: () => void;
};

export function VideoGuideFilterTab({
  active,
  label,
  onSelect,
}: VideoGuideFilterTabProps) {
  return (
    <button
      aria-pressed={active}
      className="relative pb-2 text-sm text-[#6B6161] transition-colors hover:text-gray-900 sm:pb-3 sm:text-base"
      type="button"
      onClick={onSelect}
    >
      <span
        className={
          active ? "font-semibold text-gray-900" : "font-normal text-[#6B6161]"
        }
      >
        {label}
      </span>
      {active ? (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
      ) : null}
    </button>
  );
}
