import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import SearchBar from "../components/SearchBar/SearchBar";
import {getProperties} from "../utils/SitesManagementApiHandler";
import {toast} from "react-toastify";

const PropertiesPage = () => {

    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        getProperties()
            .then(r => {
                setProperties(r.data);
                setFilteredProperties(r.data);
            })
            .catch(() => toast("Error obtaining properties"))
    },[]);

    const handleSearch = (search) => {
        if (search !== "") {
            setFilteredProperties(properties.filter(property => property.address.toLowerCase().includes(search.toLowerCase())
                || property.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredProperties(properties);
        }
    };

    let propertiesPanels = [];
    for (let idx in filteredProperties) {
        const property = filteredProperties[idx]
        propertiesPanels.push(
            <Col className="mb-4 col-12">
                <PropertyCard property={property}/>
            </Col>
        );
    }

    return (
        <Container data-testid="OwnerProperties" fluid>
            <Row className="mx-5 mt-3">
                <h2 className="mt-4 mb-0 fw-light fs-3">Properties</h2>
            </Row>
            <Row className="mx-5 mt-3">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties"/>
                <Row className="justify-content-start d-flex">
                    {propertiesPanels}
                </Row>
            </Row>
        </Container>
    );

};

PropertiesPage.propTypes = {};

PropertiesPage.defaultProps = {};

export default PropertiesPage;
