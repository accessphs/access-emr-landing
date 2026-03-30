import { FormInput } from "@/components/Input";
import { ModalTypes, useModalStore } from "@/modal/GlobalModal";
import emailjs from "@emailjs/browser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SideDrawer } from "@ui";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const formSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  organization: yup.string().required("Organization is required"),
  location: yup.string().required("Country/State is required"),
  preferred_date: yup.string().required("Preferred date is required"),
});

type FormValues = yup.InferType<typeof formSchema>;

const serviceId = import.meta.env.VITE_REACT_PUBLIC_EMAIL_SERVICE_ID;
const templateId = import.meta.env.VITE_REACT_PUBLIC_EMAIL_TEMPLATE_ID;
const userId = import.meta.env.VITE_REACT_PUBLIC_EMAIL_USER_ID;
export function RequestDemoDrawer({ isOpen, onClose }: Props) {
  const openModal = useModalStore((s) => s.openModal);
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      await emailjs.send(serviceId, templateId, data, userId);
      openModal(ModalTypes.SUCCESS);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              name="full_name"
              intent="fill"
              label="Full name"
              placeholder="Enter your full name"
            />
            <FormInput
              name="email"
              intent="fill"
              label="Email address"
              placeholder="Enter your work email address"
              type="email"
            />
            <FormInput
              name="organization"
              intent="fill"
              label="Hospital/Clinic name"
              placeholder="What is your organization name"
            />
            <FormInput
              name="location"
              intent="fill"
              label="Country/State"
              placeholder="E.g Nigeria/ Lagos"
            />
            <FormInput
              name="preferred_date"
              intent="fill"
              label="Preferred date"
              type="date"
            />

            <div className="mt-auto border-t border-gray-100 pt-6">
              <Button
                block
                kinds="primary"
                rounded
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </SideDrawer>
    </FormProvider>
  );
}
