import "./Authentication.css"

import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";

import {useKeycloak} from "@react-keycloak/web";
import DropdownCardItem from "../DropdownCardItem/DropdownCardItem";

const Authentication = () => {

    const { keycloak, } = useKeycloak();

    let authenticationInfo = (
        <div>
            <p className="fw-light mt-4 mb-0 p-0">Authentication Server</p>
            <p className="fw-normal m-0 p-0">{keycloak.authServerUrl}</p>

            <p className="fw-light mt-4 mb-0 p-0">Service</p>
            <p className="fw-normal m-0 p-0">{keycloak.clientId}</p>

            <p className="fw-light mt-4 mb-0 p-0">Realm</p>
            <p className="fw-normal mb-5 p-0">{keycloak.realm}</p>
        </div>
    );

    return (
        <Container className="text-center py-4" data-testid="Authentication">
            <Row className="justify-content-center align-items-center d-flex mt-4">
                <Col className="col-6 m-4">
                    <Card className="authentication-primary-card p-5">
                        <div className="text-center">
                            <h2>SecCom</h2>
                            <h5>Smart Security</h5>
                            <p className="text-muted fw-light">Client Panel</p>

                            <Card className="authentication-primary-card text-center mt-4">

                                <h4 className="mt-4 mb-0">Authentication</h4>
                                <small className="text-muted mt-1">Use the Login button to authenticate in this service</small>

                                <div className="mx-5 mb-5 mt-4">
                                    <DropdownCardItem title={"Authentication Details"} info={authenticationInfo}/>
                                </div>


                            </Card>

                            <p className="fw-bold m-0 p-0"></p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button variant="outline-primary" className="px-3 w-50 mt-5" onClick={() => keycloak.login()}>Login</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

// keycloak-react-auth
Authentication.propTypes = {};

Authentication.defaultProps = {};

export default Authentication;
