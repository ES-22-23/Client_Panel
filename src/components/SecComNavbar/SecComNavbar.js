import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsFillCameraVideoFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {Button, Col} from "react-bootstrap";

import { useKeycloak } from "@react-keycloak/web";

import "./SecComNavbar.css"

const SecComNavbar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const { keycloak, initialized } = useKeycloak();

    if (initialized && !keycloak.authenticated) {
        return (
            <Navbar className="justify-content-center" style={{backgroundColor: "rgba(0,0,0,0.60)"}} expand="lg">
                <Navbar.Brand href="/" className="p-3 text-white" data-testid="SecComLogo">
                    <BsFillCameraVideoFill color="#DC3545"/> SecCom
                </Navbar.Brand>
            </Navbar>
        );
    }

    return (
        <Container className="m-0 p-0" fluid>
            <Navbar variant="light" className="top-navbar" data-testid="SecComNavbar">
                <Container className="py-1 my-1">
                    <Navbar.Brand href="/" className="pe-5" data-testid="SecComLogo">
                        <BsFillCameraVideoFill color="#DC3545"/> SecCom
                    </Navbar.Brand>
                    <Col className="justify-content-end d-flex">
                        <Button variant="outline-danger" className="px-3" onClick={() => keycloak.logout()}>Logout {keycloak.tokenParsed.preferred_username}</Button>
                    </Col>
                </Container>

            </Navbar>
            <Navbar variant="light" className="bottom-navbar" data-testid="SecComNavbar">
                <Container className="py-0 my-0 px-0 ">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className="px-3" active={url === "/" || url === "/home.feature"}>Home</Nav.Link>
                            <Nav.Link href="/properties" className="px-3" active={url === "/properties"}>Properties</Nav.Link>
                            <Nav.Link href="/intrusions" className="px-3" active={url === "/intrusions"}>Intrusions</Nav.Link>
                            <Nav.Link href="/account" className="px-3" active={url === "/account"}>Account</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default SecComNavbar;