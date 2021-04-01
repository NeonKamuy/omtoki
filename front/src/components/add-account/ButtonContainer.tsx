import React from "react";
import { AccountModalButton } from ".";

export const AccountButtonContainer = React.memo(() => {
  return (
    <div id="account-button-container">
      <span className="slogan">
        Краснополянская it-комунна. Мы решили не ехать в Долину, так как Поляна
        уже накрыта.
      </span>
      <AccountModalButton />
      <span className="mention">
        Заявки проходят модерацию в течение 24 часов.
      </span>
    </div>
  );
});
