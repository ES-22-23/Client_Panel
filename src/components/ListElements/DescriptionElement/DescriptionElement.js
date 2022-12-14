import Row from "react-bootstrap/Row";
import SquareCard from "../../SquareCard/SquareCard";
import Container from "react-bootstrap/Container";

import "./DescriptionElement.css"

const DescriptionElement = (props) => {

    const descriptionElement = props.descriptionElement ? props.descriptionElement : undefined;

    if (!descriptionElement) {

        return (
            <div className="description-element mx-5 my-4 p-0">
                <Container>
                    <div className="text-center">
                        <h5 className="fs-6 fw-light">No element selected.</h5>
                    </div>
                </Container>
            </div>
        );

    } else {

        return (
            <div className="description-element mx-5 my-4 p-0">
                <Container>
                    <Row className="mt-3">
                        <h4 className="p-0 m-0 fs-4 fw-normal">{descriptionElement.title}</h4>
                    </Row>
                    <Row>
                        <small className="p-0 form-text text-muted">{descriptionElement.secondaryTitle}</small>
                    </Row>
                    <Row className="mt-2 mb-3">
                        {descriptionElement.childComponents}
                    </Row>
                </Container>

            </div>
        );

    }

}

export default DescriptionElement;