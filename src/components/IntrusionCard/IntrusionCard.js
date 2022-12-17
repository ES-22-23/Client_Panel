import './IntrusionCard.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Row from "react-bootstrap/Row";
import {Button, Card, Col} from "react-bootstrap";
import {getVideoFile} from "../../utils/SitesManagementApiHandler";
import {toast} from "react-toastify";
import {GiSecurityGate} from "react-icons/gi";
import DropdownCardItem from "../DropdownCardItem/DropdownCardItem";

const IntrusionCard = (props) => {

    const [intrusion, setIntrusion] = React.useState(props.intrusion);

    useEffect(() => {
        setIntrusion(props.intrusion);
    }, [props.intrusion]);

    const handleDownload = () => {
        getVideoFile(intrusion.key).then(response => {

            const contentType = response.headers['Content-type'];
            const filename =  response.headers.get('Content-Disposition').split('attachment; filename=')[1];

            // Binary Large Object (BLOB) is a collection of binary data stored as a single entity.
            const blob = new Blob([response.data], {type: contentType});

            // We create an object URL for the incoming Blob and tell the browser to download the image with a hidden <a> HTML element.
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            toast.success("Download completed!");

        }).catch(error => {
            console.log(error);
            toast.error("Error downloading video.");
        });
    }

    const handleSelection = () => {
        props.handleSelection(intrusion);
    }

    const intrusionDetailsInfo = (
        <div>
            <Row className="my-3">
                <small className="fw-normal text-muted">Property #{intrusion.propertyId}</small>
            </Row>
            <Row className="my-3">
                <small className="fw-normal text-muted">Date</small>
                <p className="fw-normal my-0">{new Date(Number(intrusion.timestamp)).toLocaleDateString("pt-PT")}</p>
            </Row>
            <Row className="my-3">
                <small className="fw-normal text-muted">Camera</small>
                <p className="fw-normal my-0">{intrusion.cameraId}</p>
            </Row>
            <Row className="my-3">
                <small className="fw-normal text-muted">Id #{intrusion.id}</small>
            </Row>
        </div>
    );

    return (
        <div className="intrusion-card p-5" data-testid="IntrusionCard">
            <Row className="justify-content-center align-items-center d-flex my-0">
                <Row className="d-flex align-content-center text-center">
                    <GiSecurityGate size={50}/>
                    <p className="fs-4 fw-bold mt-2">Intrusion #{intrusion.id}</p>
                </Row>
                <Row>
                    <DropdownCardItem title={"Details"} info={intrusionDetailsInfo} />
                </Row>
                <Row className="d-flex justify-content-center mt-3">
                    <Button variant="outline-primary" className="w-75 py-2 m-2" onClick={handleSelection}>View Video</Button>
                    <Button variant="dark" className="w-75 py-2 m-2 mb-0" onClick={handleDownload}>Download Video</Button>
                </Row>
            </Row>
        </div>
    );
}

IntrusionCard.propTypes = {
    /** Intrusion details to be displayed on the card */
    intrusion: PropTypes.object,
    /** Function to be called when the View Video button is clicked */
    handleSelection: PropTypes.func
};

IntrusionCard.defaultProps = {
    intrusion: {
        key: "",
        propertyID: "",
        cameraID: "",
        intrusionDate: ""
    },
    handleSelection: () => {}
};

export default IntrusionCard;
