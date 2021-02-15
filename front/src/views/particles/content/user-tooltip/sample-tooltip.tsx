import React from "react";
import "./layouts/index.scss";
import "./layouts/sample.scss";
import "../../../../vendor/arrow-down/arrow-down.css";

export const UserSampleTooltip: React.FC<{}> = React.memo(() => {
    return (
        <div className="user-tooltip-layout-default user-tooltip-container sample">
            <div className="user-tooltip-left-column">
                <div className="user-tooltip-left-top-row sample">
                    <div className="user-tooltip-picture sample">
                        <i className="gg-arrow-down"></i>
                    </div>
                </div>

                <div className="user-tooltip-left-bottom-row sample"></div>
            </div>

            <div className="user-tooltip-right-column">
                <div className="user-tooltip-right-top-row sample">
                    <span className="user-tooltip-text-content">Имя Фамилия</span>
                </div>

                <div className="user-tooltip-right-bottom-row sample">
                    <span className="user-tooltip-text-content">
                        На Java запустил ракету в космос. Очнулся, понял, что сон. Плакал
                    </span>
                </div>
            </div>
        </div>
    );
});
