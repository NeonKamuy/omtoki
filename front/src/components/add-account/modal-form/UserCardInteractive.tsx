import React from "react";
import { UserInteractiveTooltip } from "../../user-tooltip/interactive/interactive-tooltip";
import { IUserInfo } from "../../user-tooltip/interactive/interfaces";
import { DESCRIPTION_SYMBOL_LIMIT } from "./constants";

export const UserCardInteractive: React.FC<IUserCardInteractive> = (props) => {
    const {setUserInfo, parentIsVisible, photoRef} = props;
    const {cardRef, userInfo} = props;

    return (
        <>
            <div className="sector">
                <span>Карточка</span>
            </div>
            <div className="sector" ref={cardRef}>
                <UserInteractiveTooltip
                    onUserInfoChange={setUserInfo}
                    parentIsVisible={parentIsVisible}
                    photoRef={photoRef}
                    userInfo={userInfo}
                />
            </div>
            <div className="d-flex justify-content-end">
                {userInfo.description.length}/
                {DESCRIPTION_SYMBOL_LIMIT} символов
            </div>
        </>
    );
};

export interface IUserCardInteractive {
    userInfo: IUserInfo;
    setUserInfo: (info: IUserInfo) => void;
    parentIsVisible: boolean;
    photoRef: React.RefObject<HTMLDivElement>
    cardRef: React.RefObject<HTMLDivElement>;
}