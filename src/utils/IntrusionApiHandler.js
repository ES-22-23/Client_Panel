import axios from "axios";
import keycloak from "../Keycloak";

// const apiAddress = process.env.REACT_APP_API_URL + "/api";
const apiAddress = "http://loadbalancer.scss.hgsoft.me:8083";

async function getIntrusions() {
    return await axios.get(apiAddress + "/intrusions", {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getIntrusionsFromProperty(propertyId) {
    return await axios.get(apiAddress + "/intrusions/property/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getIntrusionsFromCamera(cameraId) {
    return await axios.get(apiAddress + "/intrusions/camera/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

async function getIntrusionVideoUrl(intrusionId) {
    return await axios.get(apiAddress + "/intrusions/url/" + intrusionId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token},
        timeout: 5000
    });
}

export {getIntrusions, getIntrusionsFromProperty, getIntrusionsFromCamera, getIntrusionVideoUrl};
