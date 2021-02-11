import React from "react";
import { Container } from "react-bootstrap";
import { UserRows } from "./user-rows";

export const Content: React.FC<{}> = ()=>{
    return (
        <Container>
          <UserRows />
        </Container>
    )
}