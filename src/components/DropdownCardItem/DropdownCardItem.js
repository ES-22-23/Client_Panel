import AccordionItem from "react-bootstrap/AccordionItem";
import {Accordion} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const DropdownCardItem = (props) => {

    if (props.startsOpen) {
        return (
            <Accordion defaultActiveKey={"0"} className="mb-2 mt-3">
                <AccordionItem eventKey={"0"}>
                    <Accordion.Header>
                        <div className="mx-2 fs-6 fw-light">
                            {props.title ? props.title : "Title Not Found"}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mx-0 p-0">
                        <Container className="my-3 mx-2">
                            {props.info && props.info.length !== 0 ? props.info : "No available info"}
                        </Container>
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        );
    } else {
        return (
            <Accordion className="mb-2 mt-3">
                <AccordionItem eventKey={"0"}>
                    <Accordion.Header>
                        <div className="mx-2 fs-6 fw-light">
                            {props.title ? props.title : "Title Not Found"}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mx-0 p-0">
                        <Container className="my-3 mx-2">
                            {props.info && props.info.length !== 0 ? props.info : "No available info"}
                        </Container>
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        );
    }

};

export default DropdownCardItem;
