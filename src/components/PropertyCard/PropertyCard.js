import "./PropertyCard.css"

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import {Accordion, Button, Card, Col} from "react-bootstrap";
import {RiAlarmWarningFill} from "react-icons/ri";
import {BsCameraVideoFill} from "react-icons/bs";
import {HiHomeModern} from "react-icons/hi2";
import Container from "react-bootstrap/Container";
import AccordionItem from "react-bootstrap/AccordionItem";

const PropertyCard = (props) => {

    const [property, setProperty] = useState(props.property);

    const [alarmsHidden, setAlarmsHidden] = React.useState(true);
    const [camerasHidden, setCamerasHidden] = React.useState(true);

    const [alarmsPanels, setAlarmsPanels] = React.useState([]);
    const [camerasPanels, setCamerasPanels] = React.useState([]);

    const handleViewAlarms = () => {
        setAlarmsHidden(!alarmsHidden);
    }

    const handleViewCameras = () => {
        setCamerasHidden(!camerasHidden);
    }

    useEffect(() => {
        setProperty(props.property);
    }, [props.property]);

    useEffect(() => {
        let alarms = [];
        if (!alarmsHidden && property.alarms) {
            for (let idx in property.alarms) {
                const alarm = property.alarms[idx];
                alarms.push(
                    <Row className="p-0 m-0 align-items-center d-flex" key={alarm.id}>
                        <Col className="col-3"><RiAlarmWarningFill size={40}/></Col>
                        <Col><h6 className="p-4 mt-1 mx-2"
                                 style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{alarm.id}</h6>
                        </Col>
                    </Row>
                )
            }
        }
        setAlarmsPanels(alarms);
    }, [alarmsHidden, property]);

    useEffect(() => {
        let cameras = [];
        if (!camerasHidden && property.cameras) {
            for (let idx in property.cameras) {
                const camera = property.cameras[idx];
                cameras.push(
                    <Row className="p-0 m-0 align-items-center d-flex" key={camera.id}>
                        <Col className="col-3"><BsCameraVideoFill size={40}/></Col>
                        <Col><h6 className="p-4 mt-1 mx-2"
                                 style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{camera.id}</h6>
                        </Col>
                    </Row>
                )
            }
        }
        setCamerasPanels(cameras);
    }, [camerasHidden, property]);

    if (property === undefined) {
        return <div data-testid="PropertyCard"></div>;
    }

    return (
        <Card className="property-card p-5" data-testid="PropertyCard">

            <Row>
                <HiHomeModern size={50} color="black"/>
                <div className="text-center mt-3">
                    <h5 className="fs-5 fw-bold align-self-center">{property.name}</h5>
                </div>
            </Row>

            <Row>
                <Col>
                    <Accordion defaultActiveKey={"0"} className="mt-3">
                        <AccordionItem eventKey={"0"}>
                            <Accordion.Header>
                                <div className="mx-2 fs-6 fw-light">
                                    Details
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="mx-0 p-0">
                                <Container className="text-start mx-3">
                                    <Row className="my-3">
                                        <small className="fw-normal text-muted">Address</small>
                                        <p className="fw-normal my-0">{property.address}</p>
                                    </Row>
                                    <Row className="my-3">
                                        <small className="fw-normal text-muted">Owner</small>
                                        <p className="fw-normal my-0">{property.owner.username}</p>
                                    </Row>
                                    <Row className="my-3">
                                        <small className="fw-normal text-muted">Id #{property.id}</small>
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion className="mt-3">
                        <AccordionItem eventKey={"0"}>
                            <Accordion.Header>
                                <div className="mx-2 fs-6 fw-light">
                                    Cameras
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="mx-0 p-0">
                                <Container className="my-3">
                                    {camerasPanels.length !== 0 ? camerasPanels : "No available cameras"}
                                </Container>
                            </Accordion.Body>
                        </AccordionItem>
                    </Accordion>
                </Col>
                <Col>
                    <Accordion className="mb-2 mt-3">
                        <AccordionItem eventKey={"0"}>
                            <Accordion.Header>
                                <div className="mx-2 fs-6 fw-light">
                                    Alarms
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="mx-0 p-0">
                                <Container className="my-3">
                                    {alarmsPanels.length !== 0 ? alarmsPanels : "No available alarms"}
                                </Container>
                            </Accordion.Body>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>


            {/*<Row className="justify-content-center d-flex">
                <Row className="p-0">
                    <h6 className="p-4 mt-4" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="PropertyId">{property.id}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="PropertyName">{property.name}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}} data-testid="PropertyAddress">{property.address}</h6>
                    <h6 className="p-4 mt-1" style={{borderRadius: "20px", backgroundColor: "rgba(0,0,0,0.60)"}}>{property.owner} <span style={{fontSize: "0.8rem", color: "#DC3545", cursor: "pointer"}}
                                                                                                                                        onClick={() => window.location.href = "/owners/" + property.owner}>View</span>
                    </h6>
                </Row>
                {alarmsPanels}
                {camerasPanels}
                <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={() => handleViewAlarms()}>View Alarms</Button>
                <Button variant="danger" className="mt-4 p-3" style={{borderRadius: "10px"}} onClick={()=> handleViewCameras()}>View Cameras</Button>
            </Row>*/}

        </Card>
    );
}

PropertyCard.propTypes = {
    /** The property details to display */
    property: PropTypes.object,
};

PropertyCard.defaultProps = {};

export default PropertyCard;