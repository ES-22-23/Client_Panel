import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import {createBrowserHistory} from "history";

import Container from "react-bootstrap/Container";

import SecComNavbar from "./components/SecComNavbar/SecComNavbar";
import Authentication from "./components/Authentication/Authentication";

import PrivateRoute from "./helpers/PrivateRoute";
import {useKeycloak} from "@react-keycloak/web";
import {Spinner} from "react-bootstrap";
import AccountPage from "./pages/Account/AccountPage";
import PropertiesPage from "./pages/PropertiesPage";

import {Flip, ToastContainer} from "react-toastify";
import DashboardPage from "./pages/DashboardPage";
import IntrusionsPage from "./pages/IntrusionsPage";


function App() {

    const customHistory = createBrowserHistory();

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return (
            <Container className="p-0 text-center align-items-center justify-content-center d-flex" style={{
                backgroundImage: "url(./images/Background2.jpg)",
                backgroundSize: "cover",
                minHeight: "100vh",
                minWidth: "100vw"
            }}>
                <Spinner animation="border" role="status"/>
            </Container>
        );
    }

    if (!keycloak.authenticated) {
        return (
            <Container className="p-0" style={{
                backgroundImage: "url(/Background2.jpg)",
                backgroundSize: "cover",
                minHeight: "100vh",
                maxWidth: "100vw"
            }}>
                <Router history={customHistory}>
                    <SecComNavbar/>
                    <Container className="text-center justify-content-center d-flex py-5">
                        <Routes>
                            <Route path="/" element={<Authentication/>}></Route>
                            <Route path="*" element={<Authentication/>}></Route>
                        </Routes>
                    </Container>
                </Router>
            </Container>
        );
    }

    let toastContainer = <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme={"light"}
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        style={{color: "#000000"}}/>;

    return (
        <Container className="p-0" style={{
            backgroundColor: "rgb(250, 250, 250)",
            backgroundSize: "cover",
            minHeight: "100vh",
            maxWidth: "100vw"
        }}>
            <Router history={customHistory}>
                <SecComNavbar keycloak={keycloak}/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><DashboardPage/></PrivateRoute>}></Route>
                    <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>}></Route>
                    <Route path="/properties" element={<PrivateRoute><PropertiesPage/></PrivateRoute>}></Route>
                    <Route path="/intrusions" element={<PrivateRoute><IntrusionsPage/></PrivateRoute>}></Route>
                    <Route path="*" element={<PrivateRoute><DashboardPage/></PrivateRoute>}></Route>
                </Routes>
            </Router>
            {toastContainer}
        </Container>
    );
}

export default App;
