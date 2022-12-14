import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useKeycloak} from "@react-keycloak/web";
import {Card, Col,Button} from "react-bootstrap";
import {BsEnvelopeFill, BsFillPersonLinesFill} from "react-icons/bs";
import ButtonCard from '../ButtonCard/ButtonCard';
import {toast} from "react-toastify";


import Form from 'react-bootstrap/Form';
import { getOwner, updateOwner } from '../../utils/SitesManagementApiHandler';

const InfoUpdate = () => {
    const { keycloak, } = useKeycloak();

    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        //const owner = {"name": name, "username": username, "email": email, "password": password};
        const owner = {"name": name, "username": username, "email": email};

        if (name === ""){
            owner.name = keycloak.tokenParsed.name
        }
        else if (username === ""){
            owner.username = keycloak.tokenParsed.preferred_username
        }
        else if (email === ""){
            owner.username = keycloak.tokenParsed.email
        }
        console.log(owner)
        //updateOwner(keycloak.tokenParsed.name, owner)
        updateOwner(keycloak.tokenParsed.preferred_username, owner).then((response) => {
            toast.success("Owner updated successfully");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }).catch((error) => {
            toast.error("Error updating owner");
        });
    };
    const options = {title: "Properties", description: "View his properties", link: "/properties", icon: "BsFillHouseDoorFill"};
    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="AccountPage">
            <Row className="justify-content-center align-items-center d-flex mt-4 w-75" style={{maxWidth: "600px"}}>
                <Card className="p-5 text-white shadow" style={{border: "none", borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)", textAlign: "start"}}>
                    <Row>
                        <Form >
                            <h2>Update Client Info</h2>
                            <Form.Group className="mb-3" controlId="formBasic">
                                <Form.Label>New Name</Form.Label>
                                <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        onChange={(e) => setName(e.target.value)}/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleSubmit.bind(this)}>
                                Submit
                            </Button>
                        </Form>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

InfoUpdate.propTypes = {};

InfoUpdate.defaultProps = {};

export default InfoUpdate;
