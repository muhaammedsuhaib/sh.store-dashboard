import Modal from "./Modal";
import { Button } from "./Button";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title: string;
  description: React.ReactNode;

  confirmText?: string;
  cancelText?: string;

  confirmVariant?: "primary" | "danger" | "success" | "secondary";
  loading?: boolean;
}

export function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  loading = false,
}: ConfirmActionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-slate-400">{description}</p>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
            disabled={loading}
            title={cancelText}
          >
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            variant={confirmVariant}
            className="flex-1"
            disabled={loading}
            title={loading ? `${confirmText}...` : confirmText}
          >
            {loading ? `${confirmText}...` : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
