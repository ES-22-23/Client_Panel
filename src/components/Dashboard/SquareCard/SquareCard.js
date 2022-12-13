import "./SquareCard.css"
import Row from "react-bootstrap/Row";


const SquareCard = (props) => {

    return (
        <div className={(!props.last) ? "square-card rounded-2 my-2 d-flex justify-content-center" : "square-card-last rounded-2 my-2 d-flex justify-content-center"}>
            <div className="align-self-center">
                <Row className="text-center">
                    <p className="fs-2 fw-bold p-0 m-0">{props.value}</p>
                </Row>
                <Row className="text-center">
                    <p className="fs-6 fw-normal p-0 m-0">{props.title}</p>
                </Row>
            </div>
        </div>
    );


}

export default SquareCard;
