import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useUserFives } from "../../../hooks/users";
import { IUserBase } from "../../../shared/interfaces/user";
import ReactTooltip from 'react-tooltip';
import "./index.scss";

export const UserRows: React.FC<{}> = () => {
    const userTriplets = useUserFives();

    const rows: ReactElement[] = useMemo(() => userTriplets.map(e => (
        <Row className="mt-5">
            {e.map(e => (
                <Col>
                    <div className="dot"
                        style={{
                            backgroundColor: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
                        }}
                        data-tip={
                            generateTooltip(e)
                        }
                        data-html={
                            true
                        }>
                    </div>
                    <ReactTooltip />
                </Col>
            ))}
        </Row>
    )), [userTriplets])

    return <>{rows}</>;
}

function generateTooltip(user: IUserBase) {
    return `
        <div><b>Имя</b>: ${user.name}</div>
        <div><b>Описание</b>: ${user.description}</div>
    `;
}