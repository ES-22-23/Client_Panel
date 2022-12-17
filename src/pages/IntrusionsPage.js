import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SearchBar from "../components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import IntrusionCard from "../components/IntrusionCard/IntrusionCard";


const IntrusionsPage = () => {

    const [intrusions, setIntrusions] = useState();
    const [filteredIntrusions, setFilteredIntrusions] = useState();

    useEffect(() => {
        // TODO: Get intrusions from API.
        // setIntrusions()
        // setFilteredIntrusions()
    }, []);

    let intrusionsPanels = [];
    for (let idx in intrusions) {
        const intrusion = intrusions[idx];
        intrusionsPanels.push(
            <Row className="my-2" key={intrusion.key}>
                <IntrusionCard intrusion={intrusion} handleSelection={() => {}}/>
            </Row>
        );
    }

    return (
        <Container fluid>
            <Row className="mx-5 mt-3">
                <h2 className="mt-4 mb-0 fw-light fs-3">Intrusions</h2>
            </Row>
            <Row className="mx-5">
                <SearchBar handleSearch={() => {}} addNew="/new/properties"/>
            </Row>
            <Row className="justify-content-start d-flex">
                {intrusionsPanels}
            </Row>
        </Container>
    );

};

export default IntrusionsPage;