import React from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { useElementRefs } from "./hooks";

export const ErrorTooltips: React.FC<IProps> = (props) => {
    const { cardRef, skillRef, tgRef } = props.refs;
    const { showCard, showTg, showSkill } = props.show;

    return (
        <>
            <Overlay target={cardRef.current} show={showCard} placement="top">
                <Tooltip id="card-overlay">Кажется, ты не полностью заполнил карточку</Tooltip>
            </Overlay>
            <Overlay target={skillRef.current} show={showSkill} placement="top">
                <Tooltip id="skill-overlay">Без навыков нам не понять, кто ты!</Tooltip>
            </Overlay>
            <Overlay target={tgRef.current} show={showTg} placement="top">
                <Tooltip id="tg-overlay">Мы уверены, что у настоящего айтишника должен быть Телеграм!</Tooltip>
            </Overlay>
        </>
    );
};

interface IProps {
    refs: ReturnType<typeof useElementRefs>;
    show: ITooltipStatus;
}

export interface ITooltipStatus {
    showCard: boolean;
    showTg: boolean;
    showSkill: boolean;
}


export const defaultTooltipStatus = {
    showCard: false,
    showSkill: false,
    showTg: false,
};

export const fullTooltipStatus = {
    showCard: true,
    showSkill: true,
    showTg: true,
};
