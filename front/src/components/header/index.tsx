import React, { useCallback, useState } from 'react';
import { Row, Col, Form, FormControl, InputGroup, Navbar, Button } from 'react-bootstrap';
import { AccountModalButton } from './account-modal';
import { BurgerModalButton } from './burger-modal';
import { BurgerButton } from './burger-modal/burger-button';

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
        <Navbar className="justify-content-between" style={{backgroundColor: "transparent"}}>
            <Form inline className="pl-lg-4 pl-xs-2 pt-1">
                <AccountModalButton isOpen={accountModalIsOpen} toggleIsOpen={toggleAccountModal} />
            </Form>
            <Form inline className="pr-lg-4 pr-xs-2 pt-1">
                <BurgerModalButton isOpen={burgerModalIsOpen} toggleIsOpen={toggleBurgerModal} />
            </Form>
        </Navbar>
    );
}