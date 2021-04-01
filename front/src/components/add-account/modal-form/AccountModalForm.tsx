import React, { useCallback, useContext, useRef, useState } from "react";
import { Modal, InputGroup, FormControl, Spinner } from "react-bootstrap";
import UserController from "../../../controllers/users";
import "../index.scss";
import { UserInteractiveTooltip } from "../../user-tooltip/interactive/interactive-tooltip";
import { defaultTooltipStatus, ErrorTooltips } from "./ErrorTooltips";
import { useElementRefs, useTooltipStatus, useUserInfo } from "../hooks";
import { TelegramInput } from "./TelegramInput";
import { SubmitButton } from "./SubmitButton";
import { SuccessModal } from "./SuccessModal";
import { DESCRIPTION_SYMBOL_LIMIT } from "./constants";
import { UserCardInteractive } from "./UserCardInteractive";
import { IUserInfo } from "../../user-tooltip/interactive/interfaces";
import { SkillInput } from "./SkillInput";

export const AccountModalForm: React.FC<{
    isOpen: boolean;
    toggleIsOpen: () => void;
}> = (props) => {
    const { isOpen, toggleIsOpen } = props;
    const [isLoading, setIsLoading] = useState(false);

    const refs = useElementRefs();
    const { cardRef, skillRef, tgRef, photoRef } = refs;
    const {
        tooltipStatus,
        setTooltipTimeout,
        resetTooltip,
    } = useTooltipStatus();

    const handleToggleIsOpen = useCallback(() => {
        toggleIsOpen();
        resetTooltip();
    }, []);

    const [successOpen, setSuccessOpen] = useState(false);

    const handleSubmit = useCallback(() => {
        const newTooltipStatus = { ...defaultTooltipStatus };
        const userInfo = userInfoRef.current;

        const skills = skillRef.current?.value;
        const tg = tgRef.current?.value;

        let error = false;
        if (
            !userInfo ||
            !userInfo.name ||
            !userInfo.description ||
            !userInfo.picture
        ) {
            newTooltipStatus.showCard = true;
            error = true;
        }

        if (!skills) {
            newTooltipStatus.showSkill = true;
            error = true;
        }
        if (!tg) {
            newTooltipStatus.showTg = true;
            error = true;
        }
        if (!userInfo.picture) {
            newTooltipStatus.showPhoto = true;
            error = true;
        }

        if (error) {
            setTooltipTimeout(newTooltipStatus);
            return;
        } else {
            resetTooltip();
        }

        setIsLoading(true);
        UserController.addUser({
            data: {
                name: userInfo.name,
                description: userInfo.description,
                picture: userInfo.picture!,
                skills,
                tg,
            },
            onLoaded: () => {
                setSuccessOpen(true);
                setTimeout(() => window.location.reload(), 5000);
            },
        }).finally(() => setIsLoading(false));
    }, []);

    const { setUserInfo, userInfoRef } = useUserInfo();

    return (
        <>
            <Modal
                show={isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleToggleIsOpen}
                className="account-modal"
                contentClassName="account-modal-form"
            >
                <Modal.Body className="account-modal-form body">
                    <div className="sector top">
                        <span onClick={handleToggleIsOpen}></span>
                    </div>
                    <UserCardInteractive
                        parentIsVisible={true}
                        photoRef={photoRef}
                        cardRef={cardRef}
                        setUserInfo={setUserInfo}
                        userInfo={userInfoRef.current}
                    />
                    <SkillInput ref={skillRef} />
                    <TelegramInput ref={tgRef} />
                    <SubmitButton
                        isLoading={isLoading}
                        onSubmit={handleSubmit}
                    />
                </Modal.Body>
            </Modal>
            <ErrorTooltips refs={refs} show={tooltipStatus} />
            <SuccessModal
                isOpen={isOpen && successOpen}
                picture={userInfoRef.current.picture}
            />
        </>
    );
};
