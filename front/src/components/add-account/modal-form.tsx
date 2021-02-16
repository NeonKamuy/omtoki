import React, { useCallback, useRef, useState } from "react";
import { Modal, InputGroup, FormControl, Spinner } from "react-bootstrap";
import UserController from "../../controllers/users";
import "./index.scss";
import {
    IUserInfo,
    UserInteractiveTooltip,
} from "../user-tooltip/interactive-tooltip";
import {
    defaultTooltipStatus,
    ErrorTooltips,
    fullTooltipStatus,
    ITooltipStatus,
} from "./error-tooltips";
import { useElementRefs, useTooltipStatus, useUserInfo } from "./hooks";

export const AccountModalForm: React.FC<{
    isOpen: boolean;
    toggleIsOpen: () => void;
}> = (props) => {
    const { isOpen, toggleIsOpen } = props;
    const [isLoading, setIsLoading] = useState(false);

    const refs = useElementRefs();
    const { cardRef, skillRef, tgRef } = refs;
    const {
        tooltipStatus,
        setTooltipTimeout,
        resetTooltip,
    } = useTooltipStatus();

    const handleSubmit = useCallback((args) => {
        const newTooltipStatus = { ...defaultTooltipStatus };
        const userInfo = userInfoRef.current;

        const skill = skillRef.current?.value;
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
        if (!skill) {
            newTooltipStatus.showSkill = true;
            error = true;
        }
        if (!tg) {
            newTooltipStatus.showTg = true;
            error = true;
        }

        if (error) {
            setTooltipTimeout(newTooltipStatus);
            return;
        } else {
            resetTooltip();
        }

        setIsLoading(true);
        // UserController.addUser({ data: { name, description }, onLoaded: () => window.location.reload() });
    }, []);

    const { setUserInfo, userInfoRef } = useUserInfo();

    return (
        <>
            <Modal
                show={isOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={toggleIsOpen}
                contentClassName="account-modal-form"
            >
                <Modal.Body className="account-modal-form body">
                    <div className="sector">
                        <span>Карточка</span>
                    </div>
                    <div className="sector" ref={cardRef}>
                        <UserInteractiveTooltip onUserInfoChange={setUserInfo} />
                    </div>
                    <div className="sector">
                        <span>Навыки</span>
                    </div>
                    <div className="sector">
                        <textarea
                            ref={skillRef}
                            placeholder="Например - Java, SQL, Ruby"
                        ></textarea>
                    </div>
                    <div className="sector">
                        <span>Телеграм</span>
                    </div>
                    <div className="sector">
                        <InputGroup className="tg-input-group">
                            <InputGroup.Prepend>
                                <InputGroup.Text className="tg-input-prepend">
                                    @
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl ref={tgRef} className="tg-input" />
                        </InputGroup>
                    </div>
                    {isLoading ? (
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
                        <div className="sector submit" onClick={handleSubmit}>
                            <span>Вступить</span>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
            <ErrorTooltips refs={refs} show={tooltipStatus} />
        </>
    );
};
