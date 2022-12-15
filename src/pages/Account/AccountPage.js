import "./AccountPage.css"

import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useKeycloak} from "@react-keycloak/web";
import {Button, Col} from "react-bootstrap";
import {BsEnvelopeFill, BsFillPersonLinesFill} from "react-icons/bs";
import ButtonCard from '../../components/ButtonCard/ButtonCard';
import SquareCard from "../../components/SquareCard/SquareCard";


const AccountPage = () => {

    const { keycloak, } = useKeycloak();

    return (
        <div>
            <Container fluid>
                <Row className="mx-5 mt-3">
                    <h2 className="mt-4 mb-0 fw-light fs-3">My Account</h2>
                </Row>
                <Row className="mx-5 mt-5">
                    <Col className="col-3 account-card">
                        <Row className="mt-5">
                            <div className=" d-flex justify-content-center">
                                <img className="profile-picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="Profile Picture"/>
                            </div>
                            <div className="text-center my-3">
                                <h4 className="fs-5 fw-normal p-0 my-0">{keycloak.tokenParsed.name}</h4>
                                <small className="fw-normal text-muted">{keycloak.tokenParsed.preferred_username}</small>
                            </div>
                        </Row>
                        <div className="d-flex justify-content-center align-content-center mt-3">
                            <BsEnvelopeFill className="align-self-center" size={20}/>
                            <p className="align-self-center mt-0 mb-0 p-0 fw-light" style={{marginLeft: "10px"}}>{keycloak.tokenParsed.email}</p>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <a className="btn btn-outline-primary mb-5" role="button" aria-pressed="true" href="https://auth.hgsoft.me/auth/realms/keycloak-react-auth/account/#/personal-info">
                                Change Info.
                            </a>
                        </div>
                    </Col>
                    <Col className="col-9">
                        <div className="mx-5 mt-1">
                            <h2 className="fw-light fs-3">Overview</h2>
                            <div className="d-flex align-content-start mt-4">
                                <SquareCard title={"Properties"} value={1}/>
                                <SquareCard title={"Cameras"} value={2}/>
                                <SquareCard title={"Alarms"} value={3}/>
                                <SquareCard title={"Intrusions"} value={3}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );

}

AccountPage.propTypes = {};

AccountPage.defaultProps = {};

export default AccountPage;