import "./AccountPage.css"

import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useKeycloak} from "@react-keycloak/web";
import {Col} from "react-bootstrap";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import {getAlarm, getCamera, getProperties} from "../../utils/SitesManagementApiHandler";
import {toast} from "react-toastify";
import AccountOverview from "../../components/AccountOverview/AccountOverview";
import {getIntrusionsFromProperty} from "../../utils/IntrusionApiHandler";


const AccountPage = () => {

    const { keycloak, } = useKeycloak();

    const [properties, setProperties] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [alarms, setAlarms] = useState([]);
    const [intrusions, setIntrusions] = useState([]);

    useEffect(() => {

        getProperties()
            .then(r => setProperties(r.data))
            .catch(() => {
                toast.error("Unable to get your properties.")
            });

    }, []);

    useEffect(() => {
        updateOverviewInfo(properties);
    }, [properties]);

    const updateOverviewInfo = (propertiesObtained) => {

        const instantiatedPromises = [];
        const obtainedAlarms = [], obtainedCameras = [], obtainedIntrusions = [];

        if (!propertiesObtained) return;

        for (let property of propertiesObtained) {

            let alarmsIds = property.alarms;
            let camerasIds = property.cameras;

            alarmsIds.forEach(alarmId => {
                instantiatedPromises.push(getAlarm(alarmId)
                    .then(r => obtainedAlarms.push(r.data))
                    .catch(() => toast.error(`Unable to get data for alarm ${alarmId}`)));
            });

            camerasIds.forEach(cameraId => {
                instantiatedPromises.push(getCamera(cameraId)
                    .then(r => obtainedCameras.push(r.data))
                    .catch(() => toast.error(`Unable to get data for camera ${cameraId}`)));
            });

            instantiatedPromises.push(getIntrusionsFromProperty(property.id)
                .then(r => obtainedIntrusions.push.apply(obtainedIntrusions, r.data))
                .catch(() => toast.error(`Unable to get intrusions for property ${property.id}`)));

        }

        Promise.all(instantiatedPromises)
            .then(() => {
                setAlarms(obtainedAlarms);
                setCameras(obtainedCameras);
                setIntrusions(obtainedIntrusions);
            });

    };

    return (
        <div>
            <Container fluid>
                <Row className="mx-5 mt-3">
                    <h2 className="mt-4 mb-0 fw-light fs-3">My Account</h2>
                </Row>
                <Row className="mx-5 mt-5">
                    <Col className="col-3">
                        <AccountInfo name={keycloak.tokenParsed.name} username={keycloak.tokenParsed.preferred_username}
                                     email={keycloak.tokenParsed.email} />
                    </Col>
                    <Col className="col-9">
                        <div className="mx-5 mt-1">
                            <h2 className="fw-light fs-3">Overview</h2>
                            <AccountOverview propertiesCount={properties.length} camerasCount={cameras.length}
                                             alarmsCount={alarms.length} intrusionsCount={intrusions.length} />
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
