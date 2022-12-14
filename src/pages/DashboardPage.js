import Container from "react-bootstrap/Container";
import SquareCard from "../components/SquareCard/SquareCard";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import ListCard from "../components/ListCard/ListCard";
import OverviewElement from "../components/ListElements/OverviewElement/OverviewElement";
import ChartCard from "../components/ChartCard/ChartCard";
import DescriptionElement from "../components/ListElements/DescriptionElement/DescriptionElement";
import {useEffect, useState} from "react";
import {getAlarms, getCameras, getProperties} from "../utils/ApiHandler";
import {toast} from "react-toastify";
import {propertiesToOverviewComponent} from "../services/PropertiesService";

const DashboardPage = () => {

    const [properties, setProperties] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [alarms, setAlarms] = useState([]);
    const [detailedInfo, setDetailedInfo] = useState(undefined);
    const [shouldOpen, setShouldOpen] = useState(false);

    let detailsComponent = <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open />;

    useEffect(() => {

        getProperties()
            .then(r => setProperties(r.data))
            .catch(() => {
                toast("Unable to get your properties.")
            });

        getAlarms()
            .then(r => setAlarms(r.data))
            .catch(() => {
                toast("Unable to get your alarms.")
            });

        getCameras()
            .then(r => setCameras(r.data))
            .catch(() => {
                toast("Unable to get your cameras.")
            });

    }, []);

    const onDetailsSelected = (detailsInfo) => {

        setDetailedInfo(detailsInfo);
        setShouldOpen(true);
        detailsComponent = <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open={detailsInfo !== undefined} />;
        setShouldOpen(true);
        setDetailedInfo(detailsInfo);

        toast("Details Selected");

    };

    return (
        <Container fluid>
            <Row className="mx-5 mt-3">
                <h2 className="mt-4 mb-0 fw-light fs-3">Dashboard</h2>
            </Row>
            <Row className="mx-5 mt-3">
                <div className="d-flex align-content-start">
                    <SquareCard title={"Properties"} value={properties.length}/>
                    <SquareCard title={"Cameras"} value={cameras.length}/>
                    <SquareCard title={"Alarms"} value={alarms.length}/>
                    <SquareCard title={"Intrusions"} value={3}/>
                </div>
            </Row>
            <Row className="mx-5 mt-4">
                <Col className="col-7">
                    <ChartCard title={"Intrusions Evolution"} description={"Check the number of intrusions registered in the last week."} open/>
                    <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open={shouldOpen} />
                </Col>
                <Col>
                    <ListCard title={"Properties"} childs={propertiesToOverviewComponent(properties, onDetailsSelected)} open/>
                    <ListCard title={"Intrusions"} childs={[<OverviewElement/>, <OverviewElement/>]} />
                </Col>
            </Row>
        </Container>
    );


}

export default DashboardPage;