import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    //url: "https://auth.hgsoft.me/",
    url: "http://localhost:8080/auth",
    //realm: "keycloak-react-auth",
    realm: "test_realm",
    //clientId: "react-client-panel",
    clientId: "react-client-auth",
});
export default keycloak;