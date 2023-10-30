import React from "react";

interface ModalProps {
  content: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal fixed inset-0 bg-white flex items-center justify-center z-50 rounded-md m-5 shadow-md py-5">
        <div className="modal-content bg-white p-10">
          <span
            className="close absolute top-3 right-4 text-gray-600 cursor-pointer font-thin text-2xl"
            onClick={onClose}
          >
            &times;
          </span>
          <div className=" max-h-[500px] overflow-y-auto">
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
