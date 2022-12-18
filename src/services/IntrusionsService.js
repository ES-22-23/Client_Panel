import OverviewElement from "../components/ListElements/OverviewElement/OverviewElement";

const intrusionsToOverviewComponent = (intrusions, callback) => {

    const listOfOverviewComponents = [];

    intrusions = intrusions.sort((a,b) => new Date(b.date)-new Date(a.date));

    for (let intrusionIdx in intrusions) {
        let intrusion = intrusions[intrusionIdx];
        listOfOverviewComponents.push(<OverviewElement
            title={`Intrusion# ${intrusion.id}`}
            actionText={"Details"}
            callback={() => callback({title: `Intrusion #${intrusion.id}`, secondaryTitle:
                    `Intrusion detected in Property#${intrusion.propertyId} at ${intrusion.timestamp}. 
                    Detected by camera ${intrusion.cameraId}`
            })}
        />);
    }

    return listOfOverviewComponents;

};

const intrusionsToChartData = (intrusions) => {

    let intrusionsChartData = [];

    const intrusionsDataByDate = new Map();

    for (let intrusionIdx in intrusions) {

        let intrusion = intrusions[intrusionIdx];
        let intrusionDate = new Date(Number(Date.parse(intrusion.timestamp))).toDateString();

        if (intrusionsDataByDate.has(intrusionDate)) {
            intrusionsDataByDate.set(intrusionDate, intrusionsDataByDate.get(intrusionDate)+1);
        } else {
            intrusionsDataByDate.set(intrusionDate, 1);
        }

    }

    for (let [key, value] of intrusionsDataByDate.entries()) {
        intrusionsChartData.push({id: key, date: key, intrusions: value})
    }

    intrusionsChartData = intrusionsChartData.sort((a,b) => new Date(a.date)-new Date(b.date));

    return intrusionsChartData;

}

export {
    intrusionsToOverviewComponent,
    intrusionsToChartData
};
