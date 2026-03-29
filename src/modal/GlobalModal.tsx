import { LockedTutorialModal } from "@/pages/modals/LockedTutorialModal";
import { RequestDemoDrawer } from "@/pages/modals/RequestDemoDrawer";
import { Success } from "@/pages/modals/Success";
import { VideoGuideModal } from "@/pages/modals/VideoGuide";
import { Fragment, JSX } from "react";
import { create } from "zustand";

export enum ModalTypes {
  VIDEO_GUIDE = "VIDEO_GUIDE",
  LOCKED_TUTORIAL = "LOCKED_TUTORIAL",
  REQUEST_DEMO_DRAWER = "REQUEST_DEMO_DRAWER",
  SUCCESS = "SUCCESS",
}

type AppModal = {
  modal: ModalTypes;
  modalProps: Record<string, unknown>;
};

type Store = {
  activeModal: AppModal[];
  closeModal: (modal: ModalTypes) => void;
  openModal: (modal: ModalTypes, modalProps?: Record<string, unknown>) => void;
};

export const useModalStore = create<Store>((set) => ({
  activeModal: [],
  closeModal: (mod) => {
    return set((state) => ({
      activeModal: state?.activeModal?.filter(({ modal }) => modal !== mod),
    }));
  },

  openModal: (modal, modalProps = {}) =>
    set(({ activeModal }) => ({
      activeModal: [
        ...(activeModal
          ? activeModal.filter(({ modal: mod }) => mod !== modal)
          : []),
        { modal, modalProps },
      ],
    })),
}));

const Modals = [
  { component: VideoGuideModal, value: ModalTypes.VIDEO_GUIDE },
  { component: LockedTutorialModal, value: ModalTypes.LOCKED_TUTORIAL },
  { component: RequestDemoDrawer, value: ModalTypes.REQUEST_DEMO_DRAWER },
  { component: Success, value: ModalTypes.SUCCESS },
] as {
  value: ModalTypes;
  component: ({
    isOpen,
    onClose,
    ...rest
  }: {
    isOpen: boolean;
    onClose: () => void;
  } & Record<string, unknown>) => JSX.Element;
}[];

export const GlobalModals = () => {
  const { activeModal, closeModal } = useModalStore();
  return (
    <>
      {activeModal &&
        Modals?.map(({ value, component: Component }) => {
          const active = {
            ...activeModal.find(({ modal }) => modal === value)?.modalProps,
          };

          const reset = active.reset;
          return (
            <Fragment key={value}>
              {activeModal.some(({ modal }) => modal === value) && (
                <Component
                  isOpen={activeModal?.some(({ modal }) => modal === value)}
                  key={value}
                  onClose={() => {
                    if (typeof reset === "function") {
                      reset();
                    }
                    closeModal(value);
                  }}
                  {...active}
                />
              )}
            </Fragment>
          );
        })}
    </>
  );
};
