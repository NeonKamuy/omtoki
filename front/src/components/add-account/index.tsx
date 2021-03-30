import React, { useCallback, useContext, useRef, useState } from "react";
import { ModalContext } from "../../views/particles/context/modal-context";
import "./index.scss";
import { AccountModalForm } from "./modal-form/AccountModalForm";

export const AccountModalButton: React.FC<{}> = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    const modalContext = useContext(ModalContext);
    const modalContextRef = useRef(modalContext);
    modalContextRef.current = modalContext;

    const toggleIsOpen = useCallback(() => {
        setIsOpen((isOpen: boolean | undefined) => {
            const { modalOpen, setModalOpen } = modalContextRef.current;

            if (!!isOpen) {
                setModalOpen(false);
                return false;
            }

            if (modalOpen) return !!isOpen;
            setModalOpen(true);
            return true;
        });
    }, [setIsOpen]);

    return (
        <>
            <div id="account-modal-trigger" onClick={toggleIsOpen}>
                <span>Вступить</span>
            </div>

            <AccountModalForm isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        </>
    );
});
