import React, {useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import PropertyCard from "../PropertyCard/PropertyCard";
import SearchBar from "../SearchBar/SearchBar";
import {getOwner} from "../../utils/ApiHandler";
import {useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";

const OwnerIntrusions = () => {
    const { keycloak, initialized} = useKeycloak();
    
    const [username, setUsername] = React.useState(undefined);
    const [owner, setOwner] = React.useState(undefined);
    const [allProperties, setAllProperties] = React.useState([]);
    const [properties, setProperties] = React.useState([]);

    useEffect(() => {
        if (initialized){
            setUsername(keycloak.tokenParsed.preferred_username);
        }
    },
    [keycloak, initialized])

    useEffect(() => {
        if (username !== undefined){
        console.log(username)
        getIntrusion(username).then((response) => {
            //console.log(response.data)
            setOwner(response.data);
        }).catch((error) => {
            console.log(error);
            const mock = "propId2/cam36e25c8c-165a-445a-b062-9b7a16195dd6/Video2022-11-28 03:38:09.845474"
            
            
            setOwner({ "intrusion" :  "propId2/cam36e25c8c-165a-445a-b062-9b7a16195dd6/Video2022-11-28 03:38:09.845474",
            });
        });}
    }, [username]);

    useEffect(() => {
        console.log(owner)
        if (owner !== undefined) {
            console.log("HELLO")
            setAllProperties(owner.properties);
            setProperties(owner.properties);
        }
    }, [owner]);

    const handleSearch = (search) => {
        // console.log(search);
        if (search !== "") {
            setProperties(allProperties.filter(property => property.address.toLowerCase().includes(search.toLowerCase())
                || property.name.toLowerCase().includes(search.toLowerCase())));
        } else { setProperties(allProperties); }
    };

    let propertiesPanels = [];
    for (let idx in properties) {
        const property = properties[idx]
        propertiesPanels.push(
            <Col className="mb-4 col-lg-3 col-6" key={property.id}>
                <PropertyCard property={property}/>
            </Col>
        );
    }

    return (
        <Container className="text-center justify-content-center d-flex py-5" data-testid="OwnerProperties">
            <Row className="w-100">
                <SearchBar handleSearch={handleSearch.bind(this)} addNew="/new/properties"/>
                <Row className="justify-content-start d-flex">
                    {propertiesPanels}
                </Row>
            </Row>
        </Container>
    );
};

OwnerIntrusions.propTypes = {};

OwnerIntrusions.defaultProps = {};

export default OwnerIntrusions;