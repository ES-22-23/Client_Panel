import "./OverviewElement.css"

import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import {HiHomeModern} from "react-icons/hi2";


const OverviewElement = (props) => {

    const content = {
        icon: props.icon ? props.icon : <HiHomeModern className="align-self-center" size={"1.5vw"} />,
        title: props.title ? props.title : "Mock Title",
        actionText: props.actionText ? props.actionText : "Mock Text",
    }

    return (
        <div className="list-element">
            <Row>
                <Col className="col-2">
                    <div className="list-element-img d-flex justify-content-center">
                        {content.icon}
                    </div>
                </Col>
                <Col className="col-5 d-flex">
                    <p className="m-0 p-0 fs-6 fw-normal align-self-center">{content.title}</p>
                </Col>
                <Col className="offset-2 col-3 d-flex justify-content-center">
                    <Button variant="outline-danger" className="align-self-center" onClick={() => props.callback()}>
                        {content.actionText}
                    </Button>
                </Col>
            </Row>

        </div>
    );

}

export default OverviewElement;