import Container from "react-bootstrap/Container";
import SquareCard from "../components/Dashboard/SquareCard/SquareCard";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";

const Dashboard = () => {

    return (
        <Container fluid>
            <Row>
                <Col className="col-9">
                    <Container>
                        <Row className="mt-5 mx-4">
                            <SquareCard/>
                            <SquareCard/>
                            <SquareCard/>
                            <SquareCard/>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container style={{backgroundColor: "gray"}}>
                        <p>a</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );


}

export default Dashboard;
