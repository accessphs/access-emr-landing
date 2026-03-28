import { parseYoutubeVideoId } from "@/utils/parseYoutubeVideoId";
import { Modal } from "@ui";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterSrc?: string;
  title?: string;
};

function formatTimestamp(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "0:00";
  }
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CloseIcon() {
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function PlayIconLarge() {
  return (
    <svg
      aria-hidden
      className="ml-1 h-10 w-10"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PlayIconSmall() {
  return (
    <svg
      aria-hidden
      className="ml-0.5 h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function FullscreenIcon() {
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

export function VideoGuideModal({
  isOpen,
  onClose,
  videoUrl,
  posterSrc,
  title,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const trimmedUrl = videoUrl?.trim() ?? "";
  const youtubeId = trimmedUrl ? parseYoutubeVideoId(trimmedUrl) : null;
  const isYoutube = youtubeId !== null;
  const hasVideo = Boolean(trimmedUrl);

  useEffect(() => {
    if (isYoutube) return;
    const v = videoRef.current;
    if (!v) return;
    if (!isOpen) {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen, isYoutube]);

  useEffect(() => {
    if (isYoutube) return;
    const v = videoRef.current;
    if (!isOpen || !v || !trimmedUrl) return;
    const tryPlay = () => {
      void v
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    tryPlay();
  }, [isOpen, isYoutube, trimmedUrl]);

  const togglePlay = useCallback(() => {
    if (isYoutube) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  }, [isYoutube]);

  const onProgressPointer = useCallback(
    (clientX: number, rect: DOMRect) => {
      if (isYoutube) return;
      const v = videoRef.current;
      if (!v || !duration) return;
      const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
      v.currentTime = (x / rect.width) * duration;
    },
    [duration, isYoutube]
  );

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const requestFs = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen().catch(() => {});
    }
  }, []);

  return (
    <Modal
      bgClassName="bg-transparent"
      className="max-h-[90vh] lg:!max-w-[min(1200px,calc(100vw-2rem))] md:!max-w-[min(960px,calc(100vw-2rem))] sm:!max-w-[min(768px,calc(100vw-2rem))] !gap-0 !overflow-hidden !rounded-xl !bg-[#1a1a1a] !p-0 !shadow-2xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="relative flex w-full flex-col rounded-xl bg-[#1a1a1a] text-white">
        <div
          ref={stageRef}
          className="relative w-full overflow-hidden rounded-xl bg-black"
        >
          <button
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-4 sm:top-4"
            type="button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          {title ? (
            <p className="absolute left-3 top-3 z-20 line-clamp-2 max-w-[min(100%,calc(100%-5rem))] pr-2 text-left text-sm font-medium text-white drop-shadow-md sm:left-4 sm:top-4 sm:text-base">
              {title}
            </p>
          ) : null}

          {!hasVideo ? (
            <div className="flex aspect-video w-full items-center justify-center bg-neutral-900 text-sm text-white/60">
              No video URL provided
            </div>
          ) : isYoutube && youtubeId ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video min-h-[220px] w-full border-0"
              src={
                isOpen
                  ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
                  : undefined
              }
              title={title ?? "YouTube video"}
            />
          ) : (
            <>
              <video
                ref={videoRef}
                className="aspect-video w-full object-cover"
                playsInline
                poster={posterSrc}
                preload="metadata"
                src={trimmedUrl}
                onClick={togglePlay}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration || 0);
                }}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
              />

              {!playing ? (
                <button
                  aria-label="Play video"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
                  type="button"
                  onClick={togglePlay}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                    <PlayIconLarge />
                  </span>
                </button>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-4 pt-12 sm:px-4">
                <div
                  aria-hidden
                  className="mb-3 h-1 w-full cursor-pointer rounded-full bg-white/25"
                  role="presentation"
                  onClick={(e) =>
                    onProgressPointer(
                      e.clientX,
                      e.currentTarget.getBoundingClientRect()
                    )
                  }
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-[width] duration-150 ease-linear"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                    type="button"
                    onClick={togglePlay}
                  >
                    {playing ? <PauseIcon /> : <PlayIconSmall />}
                  </button>
                  <span className="shrink-0 font-mono text-xs text-white/90 tabular-nums sm:text-sm">
                    {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
                  </span>
                  <span className="flex-1" />
                  <button
                    aria-label="Enter fullscreen"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    type="button"
                    onClick={requestFs}
                  >
                    <FullscreenIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
