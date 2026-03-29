import { Button, Modal } from "@ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Success = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="!max-w-[470px] !rounded-xl !p-0 !shadow-xl"
    >
      <div className="flex flex-col items-center justify-center gap-8 text-center py-16 px-6">
        <img src="/success.png" alt="success" className="w-[115px] h-[115px]" />
        <div className="flex gap-5 flex-col">
          <h2 className="text-2xl font-medium text-[#141414]">
            Request Submitted
          </h2>
          <p className="text-sm text-gray-500">
            Thank you for your request. Our customer support will be in touch
            with you
          </p>
        </div>
        <Button block kinds="primary" rounded onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
};
