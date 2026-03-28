"use client";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
  isCentered?: boolean;
  bgClassName?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  isCentered = true,
  bgClassName,
}: Props) => {
  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => onClose && onClose()}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 bg-black/10 backdrop-blur-sm">
          <div
            className={classNames(`flex h-full justify-center overflow-auto`, {
              "items-center": isCentered,
            })}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={classNames(
                  "m-auto flex max-h-[95%] w-full max-w-lg transform flex-col gap-6 overflow-y-scroll rounded-2xl bg-white p-5 shadow-xl transition-all",
                  className
                )}
              >
                <div
                  className={classNames(
                    "flex h-max max-h-full w-full flex-col overflow-y-scroll",
                    bgClassName
                  )}
                >
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
