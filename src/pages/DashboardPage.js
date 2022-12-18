import Container from "react-bootstrap/Container";
import SquareCard from "../components/SquareCard/SquareCard";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import ListCard from "../components/ListCard/ListCard";
import ChartCard from "../components/ChartCard/ChartCard";
import DescriptionElement from "../components/ListElements/DescriptionElement/DescriptionElement";
import {useEffect, useState} from "react";
import {getAlarm, getCamera, getProperties} from "../utils/SitesManagementApiHandler";
import {toast} from "react-toastify";
import {propertiesToOverviewComponent} from "../services/PropertiesService";
import {getIntrusionsFromProperty} from "../utils/IntrusionApiHandler";
import {intrusionsToChartData, intrusionsToOverviewComponent} from "../services/IntrusionsService";

const DashboardPage = () => {

    const [properties, setProperties] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [alarms, setAlarms] = useState([]);
    const [intrusions, setIntrusions] = useState([]);

    const [detailedInfo, setDetailedInfo] = useState(undefined);
    const [shouldOpen, setShouldOpen] = useState(false);

    let detailsComponent = <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open />;

    useEffect(() => {

        getProperties()
            .then(r => setProperties(r.data))
            .catch(() => {
                toast.error("Unable to get your properties.")
            });

    }, []);

    useEffect(() => {

        if (!properties) return;

        for (let property of properties) {

            let alarmsIds = property.alarms;
            let camerasIds = property.cameras;

            alarmsIds.forEach(alarmId => {
                getAlarm(alarmId)
                    .then(r => setAlarms([...alarms, r.data]))
                    .catch(() => {
                        toast.error("Unable to get data for alarm")
                    });
            });

            camerasIds.forEach(cameraId => {
               getCamera(cameraId)
                   .then(r => setCameras([...cameras, r.data]))
                   .catch(() => toast.error("Unable to get data for camera"))
            });

            getIntrusionsFromProperty(property.id)
                .then(r => setIntrusions(r.data))
                .catch(() => {
                    toast.error("Unable to get intrusions for your properties.")
                });

        }

    }, [properties]);

    const onDetailsSelected = (detailsInfo) => {

        setDetailedInfo(detailsInfo);
        setShouldOpen(true);

        detailsComponent = <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open={detailsInfo !== undefined} />;

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
                    <SquareCard title={"Intrusions"} value={intrusions.length}/>
                </div>
            </Row>
            <Row className="mx-5 mt-4">
                <Col className="col-7">
                    <ChartCard title={"Intrusions Evolution"} description={"Check the number of intrusions registered in the last week."} data={intrusionsToChartData(intrusions)} open/>
                    <ListCard title={"Details"} childs={<DescriptionElement descriptionElement={detailedInfo}/>} open={shouldOpen} />
                </Col>
                <Col>
                    <ListCard title={"Properties"} childs={propertiesToOverviewComponent(properties, onDetailsSelected)} open/>
                    <ListCard title={"Intrusions"} childs={intrusionsToOverviewComponent(intrusions.slice(0, 10), onDetailsSelected)} />
                </Col>
            </Row>
        </Container>
    );


}

export default DashboardPage;
