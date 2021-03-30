import React from "react";
import { Modal } from "react-bootstrap";

export const SuccessModal: React.FC<{
  isOpen: boolean;
  picture: string | null;
}> = (props) => {
  const { isOpen, picture } = props;

  return (
    <Modal
      show={isOpen}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="registration-success-modal"
      backdrop="static"
    >
      <div>
        <div id="image-container">
          <img src={picture ?? ""} />
        </div>
        <div>Поздравляем! Вы удачно вступили в сообщество</div>
      </div>
    </Modal>
  );
};
