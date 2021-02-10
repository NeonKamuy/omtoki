import React, { useCallback, useState } from 'react';
import HamburgerMenu from "react-hamburger-menu";

export const Header: React.FC<{}> = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

    const handleHamburgerClicked = useCallback(() => {
        setHamburgerIsOpen(e => !e);
    }, [setHamburgerIsOpen])

    return (
        <div>
            <span style={{ cursor: "pointer" }}>
                <HamburgerMenu
                    isOpen={hamburgerIsOpen}
                    menuClicked={handleHamburgerClicked}
                    width={18}
                    height={15}
                    strokeWidth={1}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
            </span>
        </div>);
}