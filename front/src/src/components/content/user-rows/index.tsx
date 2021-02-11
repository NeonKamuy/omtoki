import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useUserTriplets } from "../../../hooks/users";

export const UserRows: React.FC<{}> = () => {
    const userTriplets = useUserTriplets();
    const rows: ReactElement[] = useMemo(()=>userTriplets.map(e => (
        <Row className="mt-5">
            {e.map(e => (
                <Col>
                   {"Name: " + e.name}
                   <br />
                   {"Description: " + e.description}
                </Col>
            ))}
        </Row>
    )), [userTriplets])

    return <>{rows}</>;
}