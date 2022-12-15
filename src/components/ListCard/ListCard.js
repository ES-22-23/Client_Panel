import {Accordion} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import {useEffect, useState} from "react";


const ListCard = (props) => {

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    if (isOpen) {
        return (
            <Accordion defaultActiveKey={"0"} className="mb-4" activeKey={"0"}>
                <AccordionItem eventKey={"0"}>
                    <Accordion.Header onClick={() => setOpen(false)}>
                        <div className="mx-3 my-2 fs-6 fw-light">
                            {props.title}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mx-0 p-0">
                        {props.childs}
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        );
    } else {
        return (
            <Accordion className="mb-4">
                <AccordionItem eventKey={"0"}>
                    <Accordion.Header>
                        <div className="mx-3 my-2 fs-6 fw-light">
                            {props.title}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="mx-0 p-0">
                        {props.childs}
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        );
    }

}

export default ListCard;