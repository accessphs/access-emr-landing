import { Input } from "@/components/Input";
import { Button, SideDrawer } from "@ui";
import { FormEvent, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function RequestDemoDrawer({ isOpen, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [countryState, setCountryState] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFullName("");
      setEmail("");
      setOrganization("");
      setCountryState("");
      setPreferredDate("");
    }
  }, [isOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full min-h-screen w-full min-w-lg flex-col">
        <div className="px-6 pb-4 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Request a Demo
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Please provide your details to book a demo with an expert
              </p>
            </div>
            <button
              aria-label="Close"
              className="shrink-0 rounded-full p-2 text-gray-900 hover:bg-gray-100"
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
          </div>
        </div>

        <form
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6 sm:px-8"
          onSubmit={handleSubmit}
        >
          <Input
            intent="fill"
            label="Full name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            intent="fill"
            label="Email address"
            placeholder="Enter your work email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            intent="fill"
            label="Hospital/Clinic name"
            placeholder="What is your organization name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
          <Input
            intent="fill"
            label="Country/State"
            placeholder="E.g Nigeria/ Lagos"
            value={countryState}
            onChange={(e) => setCountryState(e.target.value)}
          />
          <Input
            intent="fill"
            label="Preferred date"
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />

          <div className="mt-auto border-t border-gray-100 pt-6">
            <Button block kinds="primary" rounded type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </SideDrawer>
  );
}
