"use client";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

type DashboardMobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right";
};

export const SideDrawer = ({
  isOpen,
  children,
  position = "right",
  onClose,
}: DashboardMobileDrawerProps) => {
  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div
          className={classNames("fixed inset-0 flex", {
            "justify-end": position === "right",
            "justify-start": position === "left",
          })}
        >
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={classNames({
              "-translate-x-full": position === "left",
              "translate-x-full": position === "right",
            })}
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo={classNames({
              "-translate-x-full": position === "left",
              "translate-x-full": position === "right",
            })}
          >
            <DialogPanel className="flex h-full max-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl outline-none sm:max-w-lg">
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
