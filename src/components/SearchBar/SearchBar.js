import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import {Button, Card, Col, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const SearchBar = (props) => {

    const [search, setSearch] = React.useState("");
    const [searchBy, setSearchBy] = React.useState("None");

    const handleSearch = () => {
        if (props.handleSearch)
            props.handleSearch(search);
        setSearchBy(search);
    };

    return (
        <Row className="my-4 justify-content-start d-flex" data-testid="SearchBar">
            <Col className="col-3 mb-3">
                <Card className="query-element py-2 px-3" >
                    <span>Filtering By: <span className="fw-bold">{searchBy}</span></span>
                </Card>
            </Col>
            <Col className="offset-6 col-3 mb-3">
                <Form className="d-flex">
                    <Form.Control
                        id="search"
                        type="search"
                        placeholder="Search"
                        className="search-box me-2"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleSearch();
                            }
                        }}
                    />
                    <Button variant="outline-primary" onClick={handleSearch.bind(this)}>Search</Button>
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