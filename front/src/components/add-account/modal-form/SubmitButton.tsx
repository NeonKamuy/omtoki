import React from "react";
import { Spinner } from "react-bootstrap";

export const SubmitButton: React.FC<{ isLoading: boolean, onSubmit: ()=>void }> = ({
  isLoading, onSubmit
}) => {
  return isLoading ? (
    <div className="sector submit loading">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        style={{ marginRight: 10 }}
      />
      <span>Отправка...</span>
    </div>
  ) : (
    <div className="sector submit" onClick={onSubmit}>
      <span>Вступить</span>
    </div>
  );
};
