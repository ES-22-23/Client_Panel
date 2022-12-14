import axios from "axios";
import keycloak from "../Keycloak";

// const apiAddress = process.env.REACT_APP_API_URL + "/api";
// const apiAddress = "http://imapi.scss.hgsoft.me";
const apiAddress = "http://localhost:8082";

// Owner functions
async function getOwners() {
    return await axios.get(apiAddress + "/owners", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getOwner(ownerId) {
    return await axios.get(apiAddress + "/owners/" + ownerId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Property functions
async function getProperties() {
    return await axios.get(apiAddress + "/properties", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getProperty(propertyId) {
    return await axios.get(apiAddress + "/properties/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Camera functions
async function getCameras() {
    return await axios.get(apiAddress + "/cameras", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getCamera(cameraId) {
    return await axios.get(apiAddress + "/cameras/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


// Alarm functions

async function getAlarms() {
    return await axios.get(apiAddress + "/alarms", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getAlarm(alarmId) {
    return await axios.get(apiAddress + "/alarms/" + alarmId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

// Event functions

async function getVideos() {
    return await axios.get(apiAddress + "/events", {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getVideosForOwner(username) {
    return await axios.get(apiAddress + "/events/owner/" + username, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getVideoForProperty(propertyId) {
    return await axios.get(apiAddress + "/events/property/" + propertyId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getVideoForCamera(cameraId) {
    return await axios.get(apiAddress + "/events/camera/" + cameraId, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}

async function getVideoFile(videoKey) {
    return await axios.get(apiAddress + "/events/" + videoKey, {
        headers: {'Authorization': 'Bearer ' + keycloak.token}
    });
}


export {
    getOwners,
    getOwner,

    getProperties,
    getProperty,

    getCameras,
    getCamera,
 
    getAlarms,
    getAlarm,
 
    getVideos,
    getVideosForOwner,
    getVideoForProperty,
    getVideoForCamera,
    getVideoFile
};