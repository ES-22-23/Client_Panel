import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SearchBar from "../components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import IntrusionCard from "../components/IntrusionCard/IntrusionCard";
import {Col} from "react-bootstrap";
import {getIntrusions} from "../utils/IntrusionApiHandler";
import {toast} from "react-toastify";


const IntrusionsPage = () => {

    const [intrusions, setIntrusions] = useState([]);
    const [filteredIntrusions, setFilteredIntrusions] = useState([]);

    useEffect(() => {

        getIntrusions()
            .then(r => {
                setIntrusions(r.data);
                setFilteredIntrusions(r.data);
            })
            .catch(() => toast.error("Unable to obtain intrusions data."))

    }, []);

    const buildIntrusionsPanels = () => {

        let intrusionsPanels = [];
        for (let idx in filteredIntrusions) {
            const intrusion = intrusions[idx];
            intrusionsPanels.push(
                <Col className="my-2 col-3" key={intrusion.key}>
                    <IntrusionCard intrusion={intrusion} handleSelection={() => {}}/>
                </Col>
            );
        }

        return intrusionsPanels;

    }

    const handleSearch = (query) => {

        if (!query || query === "") {
            setFilteredIntrusions(intrusions);
            return;
        }

        if (query.startsWith("Property:")) {
            const queryPropertyId = query.split(':');
            setFilteredIntrusions(intrusions.filter(intrusion => intrusion.propertyId === Number(queryPropertyId[1].trim())));
        } else if (query.startsWith("Camera:")) {
            const queryCameraId = query.split(':');
            setFilteredIntrusions(intrusions.filter(intrusion => intrusion.cameraId.includes(queryCameraId[1].trim())));
        } else if (query.startsWith("Date:")) {
            const queryDate = query.split(':');
            const dateParsed = new Date(queryDate[1]);
            setFilteredIntrusions(intrusions
                .filter(intrusion => new Date(Number(Date.parse(intrusion.timestamp))).getDate() === dateParsed.getDate() &&
                    new Date(Number(intrusion.timestamp)).getMonth() === dateParsed.getMonth() &&
                    new Date(Number(intrusion.timestamp)).getFullYear() === dateParsed.getFullYear()));
        } else {
            setFilteredIntrusions(intrusions.filter(intrusion => `Intrusion #${intrusion.id}`.toLowerCase().includes(query.toLowerCase())));
        }

    }

    return (

        <Container fluid>
            <Row className="mx-5 mt-3">
                <h2 className="mt-4 mb-0 fw-light fs-3">Intrusions</h2>
            </Row>
            <Row className="mx-5">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties"/>
            </Row>
            <Row className="mx-5">
                {buildIntrusionsPanels()}
            </Row>
        </Container>
    );

};

export default IntrusionsPage;
