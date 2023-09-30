import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, children, customStyles }) => {
  const defaultStyles = {
    content: {
      border: "1px solid #DCE3E5CC",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(255, 255, 255)",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  };

  const modalStyles = {
    ...defaultStyles,
    content: {
      ...defaultStyles.content, 
      ...customStyles,
    },
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "14px",
    right: "14px",
    cursor: "pointer",
  };

  function SVGIcon() {
    return (
      <svg fill="#111111" viewBox="0 0 24 24" width="24" height="24">
        <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </g>
      </svg>
    );
  }
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      style={modalStyles}
    >
      <div style={closeButtonStyles} onClick={onClose}>
        <SVGIcon />
      </div>

      {children}
    </Modal>
  );
};

export default CustomModal;
