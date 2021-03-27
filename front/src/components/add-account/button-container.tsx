import React from "react";
import { AccountModalButton } from ".";

export const AccountButtonContainer = React.memo(() => {
    return (
        <div id="account-button-container">
            Краснополянская it-комунна. Мы решили не ехать в Долину, так как Поляна уже накрыта.
            <AccountModalButton />
        </div>
    );
});
