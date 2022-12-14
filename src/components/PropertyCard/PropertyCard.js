import "./PropertyCard.css"

import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import {Card, Col} from "react-bootstrap";
import {RiAlarmWarningFill} from "react-icons/ri";
import {BsCameraVideoFill} from "react-icons/bs";
import {HiHomeModern} from "react-icons/hi2";
import PropertyCardItem from "../PropertyCardItem/PropertyCardItem";

const PropertyCard = (props) => {

    const [property, setProperty] = useState(props.property);

    const [alarmsPanels, setAlarmsPanels] = useState([]);
    const [camerasPanels, setCamerasPanels] = useState([]);

    useEffect(() => {
        setProperty(props.property);
    }, [props.property]);

    useEffect(() => {

        let cameras = [];
        let alarms = [];

        if (property.alarms) {
            for (let idx in property.alarms) {
                const alarm = property.alarms[idx];
                alarms.push(
                    <Row className="d-flex align-items-center p-0 m-0" key={alarm}>
                        <Col className="col-2">
                            <RiAlarmWarningFill size={30}/>
                        </Col>
                        <Col>
                            <h6 className="p-4 mt-1 mx-2">{alarm}</h6>
                        </Col>
                    </Row>
                )
            }
        }

        if (property.cameras) {
            for (let idx in property.cameras) {
                const camera = property.cameras[idx];
                cameras.push(
                    <Row className="d-flex align-items-center p-0 m-0" key={camera}>
                        <Col className="col-2">
                            <BsCameraVideoFill size={30}/>
                        </Col>
                        <Col>
                            <h6 className="p-4 py-1 mt-1 mx-2">{camera}</h6>
                        </Col>
                    </Row>
                )
            }
        }

        setCamerasPanels(cameras);
        setAlarmsPanels(alarms);

    }, [property]);

    if (property === undefined) {
        return <div data-testid="PropertyCard"></div>;
    }

    const propertyDetailsInfo = (
        <div>
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
        </div>
    );

    return (
        <Card className="property-card p-5" data-testid="PropertyCard">

            <Row>
                <HiHomeModern size={50} color="black"/>
                <div className="text-center mt-3">
                    <h5 className="fs-5 fw-bold align-self-center">{property.name}</h5>
                </div>
            </Row>

            <Row className="mt-3">
                <Col>
                    <PropertyCardItem title={"Details"} info={propertyDetailsInfo} startsOpen />
                </Col>
                <Col>
                    <PropertyCardItem title={"Cameras"} info={camerasPanels} />
                </Col>
                <Col>
                    <PropertyCardItem title={"Alarms"} info={alarmsPanels} />
                </Col>
            </Row>

        </Card>
    );
}

PropertyCard.propTypes = {
    /** The property details to display */
    property: PropTypes.object,
};

PropertyCard.defaultProps = {};

export default PropertyCard;