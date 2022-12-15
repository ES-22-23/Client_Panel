import SquareCard from "../SquareCard/SquareCard";


const AccountOverview = (props) => {

    return (
        <div className="d-flex align-content-start mt-4">
            <SquareCard title={"Properties"} value={props.propertiesCount}/>
            <SquareCard title={"Cameras"} value={props.camerasCount}/>
            <SquareCard title={"Alarms"} value={props.alarmsCount}/>
            <SquareCard title={"Intrusions"} value={props.intrusionsCount}/>
        </div>
    );

};

export default AccountOverview;