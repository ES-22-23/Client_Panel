import OverviewElement from "../components/Dashboard/ListElements/OverviewElement/OverviewElement";

const propertiesToOverviewComponent = (properties, callback) => {

    const listOfOverviewComponents = [];
    for (let propertyIdx in properties) {
        let property = properties[propertyIdx];
        listOfOverviewComponents.push(<OverviewElement
            title={property.name}
            actionText={"Details"}
            callback={() => callback({title: property.name, secondaryTitle: property.address})}
        />);
    }

    return listOfOverviewComponents;

};

export {
    propertiesToOverviewComponent
}