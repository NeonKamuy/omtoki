import React, { useCallback, useState } from 'react';
import { Row, Col, Form, FormControl, InputGroup, Navbar, Button } from 'react-bootstrap';
import { AccountModal } from './account-modal';
import { BurgerButton } from './burger-button';
import { BurgerModal } from './burger-modal';

export const Header: React.FC<{}> = () => {
    const [burgerModalIsOpen, setBurgerModalIsOpen] = useState(false);
    const [accountModalIsOpen, setAccountModalIsOpen] = useState(false);

    const toggleBurgerModal = useCallback(() => {
        setAccountModalIsOpen(e => false);
        setBurgerModalIsOpen(e => !e);
    }, [setBurgerModalIsOpen, setAccountModalIsOpen])

    const toggleAccountModal = useCallback(()=>{
        setBurgerModalIsOpen(false);
        setAccountModalIsOpen(e => !e);
    }, [setBurgerModalIsOpen, setAccountModalIsOpen])

    return (
        <Navbar className="justify-content-between">
            <Form inline className="pl-4 pt-1">
                <Button onClick={toggleAccountModal} variant="outline-dark">Новая Анкета</Button>
            </Form>
            <Form inline className="pr-4 pt-1">
                <BurgerButton isOpen={burgerModalIsOpen} onClick={toggleBurgerModal} />
            </Form>

            <AccountModal isOpen={accountModalIsOpen} toggleIsOpen={toggleAccountModal} />
            <BurgerModal isOpen={burgerModalIsOpen} toggleIsOpen={toggleBurgerModal} />
        </Navbar>
    );
}