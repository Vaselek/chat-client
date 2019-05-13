import React from 'react';
import {
    Nav,
    Navbar,
} from "reactstrap";
import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const Toolbar = ({user, logout}) => {
    return (
        <Navbar color="light" light expand="md">
            <Nav className="ml-auto" navbar>
                {user ? <UserMenu user={user} logout={logout} /> : <AnonymousMenu/> }
            </Nav>
        </Navbar>
    );
};

export default Toolbar;
