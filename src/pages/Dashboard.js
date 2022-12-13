import Container from "react-bootstrap/Container";
import SquareCard from "../components/Dashboard/SquareCard/SquareCard";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import ListCard from "../components/Dashboard/ListCard/ListCard";
import ListElement from "../components/Dashboard/ListElement/ListElement";
import ChartCard from "../components/Dashboard/IntrusionsChart/ChartCard";

const Dashboard = () => {

    return (
        <Container fluid>
            <Row className="mx-5 mt-3">
                <h2 className="mt-4 mb-0 fw-light fs-3">Dashboard</h2>
            </Row>
            <Row className="mx-5 mt-3">
                <div className="d-flex align-content-start">
                    <SquareCard title={"Properties"} value={2}/>
                    <SquareCard title={"Cameras"} value={2}/>
                    <SquareCard title={"Alarms"} value={2}/>
                    <SquareCard title={"Intrusions"} value={3}/>
                </div>
            </Row>
            <Row className="mx-5 mt-4">
                <Col className="col-7">
                    <ChartCard title={"Intrusions Evolution"} description={"Check the number of intrusions registered in the last week."}/>
                </Col>
                <Col>
                    <ListCard title={"Properties"} childs={[<ListElement/>, <ListElement/>]} />
                    <ListCard title={"Intrusions"} childs={[<ListElement/>, <ListElement/>]} />
                </Col>
            </Row>
        </Container>
    );


}

export default Dashboard;
