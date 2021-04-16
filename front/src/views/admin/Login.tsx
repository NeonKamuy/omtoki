import React, { useCallback, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { setAccessToken } from "../../config";
import AdminController from "../../controllers/admin";
import { IRedirectionPath, RedirectionPath } from "../../hooks/navigation";

const sha512 = require("js-sha512");

export const Login: React.FC<{}> = () => {
    const { redirectionPath } = useParams<{
        redirectionPath: IRedirectionPath;
    }>();

    const accessTokenRef = useRef<HTMLInputElement | null>(null);
    const history = useHistory();

    const login = useCallback(() => {
        const token = accessTokenRef?.current?.value;
        if (!token) {
            alert("Пожалуйста, введите пароль");
            return;
        }

        const encryptedToken = sha512(token);

        AdminController.login({
            data: { accessToken: encryptedToken },
        })
            .then(() => {
                setAccessToken(encryptedToken);
                history.push(RedirectionPath[redirectionPath]);
            })
            .catch(() => {
                alert("Неверный пароль!");
            });
    }, []);

    const handleFormKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key == "Enter") {
                event.preventDefault();
                login();
            }
        },
        []
    );

    return (
        <Container
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form>
                        <Form.Group
                            controlId="formBasicPassword"
                            onKeyPress={handleFormKeyPress}
                            onKeyDown={handleFormKeyPress}
                        >
                            <Form.Label>Введите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                ref={accessTokenRef}
                                onKeyPress={handleFormKeyPress}
                                onKeyDown={handleFormKeyPress}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={login}>
                            Подтвердить
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
