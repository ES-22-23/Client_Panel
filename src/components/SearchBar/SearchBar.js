import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import {Button, Card, Col, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const SearchBar = (props) => {

    const [search, setSearch] = React.useState("");
    const [searchBy, setSearchBy] = React.useState("");

    const handleSearch = () => {
        // console.log(search);
        if (props.handleSearch)
            props.handleSearch(search);
        setSearchBy(search);
    };

    return (
        <Row className="my-4 justify-content-start d-flex" data-testid="SearchBar">
            <Col className="col-lg-3 col-7 justify-content-start d-flex mb-3">
                <Button variant="danger" style={{width: "50%"}} href={props.addNew}>Add New</Button>
            </Col>
            <Col className="col-6 mb-3">
                <Card className="py-2 px-3 text-white shadow" style={{border: "none", borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.80)", textAlign: "start"}}>
                    <span>Search by: <span style={{fontWeight: "bold"}}>{searchBy}</span></span>
                </Card>
            </Col>
            <Col className="col-lg-3 mb-3">
                <Form className="d-flex">
                    <Form.Control
                        id="search"
                        type="search"
                        placeholder="Search"
                        className="me-2 shadow text-white"
                        aria-label="Search"
                        style={{backgroundColor: "rgba(0,0,0,0.80)", borderRadius: "10px", border: "none"}}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSearch();
                            }
                        }}
                    />
                    <Button variant="danger" onClick={handleSearch.bind(this)}>Search</Button>
                </Form>
            </Col>
        </Row>
    );
}

SearchBar.propTypes = {
    /** Function to be called when the search button is clicked */
    handleSearch: PropTypes.func,
    /** URL to be redirected to when the add new button is clicked */
    addNew: PropTypes.string
};

SearchBar.defaultProps = {
    handleSearch: () => {},
    addNew: "/",
};

export default SearchBar;