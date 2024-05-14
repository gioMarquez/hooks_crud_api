import Form from '../Form/Form';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;

}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg">
        <button
          className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
          onClick={onClose}
        >
          X
        </button>
        <div className="modal-content">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Modal;