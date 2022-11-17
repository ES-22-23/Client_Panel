import Keycloak from "keycloak-js";

/*const keycloak = new Keycloak({
    url: "https://auth.hgsoft.me/",
    realm: "keycloak-react-auth",
    clientId: "react-client-panel",
});*/
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",
    realm: "test_realm",
    clientId: "react-client-auth",
});
export default keycloak;