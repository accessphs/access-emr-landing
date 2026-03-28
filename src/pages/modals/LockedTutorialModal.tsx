import { ModalTypes, useModalStore } from "@/modal/GlobalModal";
import { Modal } from "@ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo?: () => void;
  onLogIn?: () => void;
};

export function LockedTutorialModal({
  isOpen,
  onClose,
  onRequestDemo,
  onLogIn,
}: Props) {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <Modal
      className="!max-w-[420px] !rounded-3xl !p-0 !shadow-xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="relative px-8 pb-8 pt-12 text-center">
        <button
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-900 transition-colors hover:bg-gray-100"
          type="button"
          onClick={onClose}
        >
          <svg
            aria-hidden
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Want to see Tutorial?
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-gray-600 sm:text-base">
          To access this tutorial video you have to log in or request a demo
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <button
            className="w-full rounded-full border border-gray-200 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 sm:w-auto"
            type="button"
            onClick={() => {
              onRequestDemo?.();
              onClose();
              openModal(ModalTypes.REQUEST_DEMO_DRAWER, {});
            }}
          >
            Request demo
          </button>
          <button
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            type="button"
            onClick={() => {
              onLogIn?.();
              onClose();
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </Modal>
  );
}
