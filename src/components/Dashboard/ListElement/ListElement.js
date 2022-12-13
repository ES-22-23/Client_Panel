import "./ListElement.css"

import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import {HiHomeModern} from "react-icons/hi2";


const ListElement = () => {

    return (
        <div className="list-element">
            <Row>
                <Col className="col-2">
                    <div className="list-element-img d-flex justify-content-center">
                        <HiHomeModern className="align-self-center" size={"1.5vw"} />
                    </div>
                </Col>
                <Col className="col-5 d-flex">
                    <p className="m-0 p-0 fs-6 fw-normal align-self-center">Property #1</p>
                </Col>
                <Col className="offset-2 col-3 d-flex justify-content-center">
                    <Button variant="outline-danger" className="align-self-center">Details</Button>
                </Col>
            </Row>

        </div>
    );

}

export default ListElement;