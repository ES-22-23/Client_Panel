import "./AccountPage.css"

import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {useKeycloak} from "@react-keycloak/web";
import {Col} from "react-bootstrap";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import {getAlarms, getCameras, getProperties} from "../../utils/SitesManagementApiHandler";
import {toast} from "react-toastify";
import AccountOverview from "../../components/AccountOverview/AccountOverview";
import {getIntrusions} from "../../utils/IntrusionApiHandler";


const AccountPage = () => {

    const { keycloak, } = useKeycloak();

    const [properties, setProperties] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [alarms, setAlarms] = useState([]);
    const [intrusions, setIntrusions] = useState([]);

    useEffect(() => {

        getProperties()
            .then(r => setProperties(r.data))
            .catch(() => toast.error("Unable to load properties data"));

        getCameras()
            .then(r => setCameras(r.data))
            .catch(() => toast.error("Unable to load cameras data"));

        getAlarms()
            .then(r => setAlarms(r.data))
            .catch(() => toast.error("Unable to load alarms data"));

        getIntrusions()
            .then(r => setIntrusions(r.data))
            .catch(() => toast.error("Unable to load intrusions data"));

    }, []);

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
