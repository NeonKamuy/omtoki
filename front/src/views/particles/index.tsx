import React from "react";
import { useState } from "react";
import { LeftBottomLabel } from "../../components/left-bottom-label";
import { Content } from "./content";
import { ModalContext } from "./context/modal-context";
import { Header } from "./header";
import { IModalContext } from "./interfaces";

export const ParticlesView: React.FC<{}> = () => {
    const [modalOpen, setModalOpen] = useState<IModalContext["modalOpen"]>(false)
    const modalContextValue = {modalOpen, setModalOpen};

    return (
        <ModalContext.Provider value={modalContextValue}>
            <Header />
            <Content />
            <LeftBottomLabel />
        </ModalContext.Provider>
    );
};
