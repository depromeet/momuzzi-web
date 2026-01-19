import Button from '@/components/ui/Button';
import BaseModal from '@/components/ui/Modal/BaseModal';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  confirmText = '네',
  cancelText = '아니오',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col gap-6">
        <h3 className="text-center body-3 font-semibold">{title}</h3>

        <div className="flex gap-4">
          <Button theme="gray" className="flex-1" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="flex-1" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
