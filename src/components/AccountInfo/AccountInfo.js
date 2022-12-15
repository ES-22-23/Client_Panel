import Row from "react-bootstrap/Row";
import {BsEnvelopeFill} from "react-icons/bs";

const AccountInfo = (props) => {

    return (
        <div className="account-card">
              <Row>
                  <div className="d-flex justify-content-center mt-5">
                      <img className="profile-picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="Profile Picture"/>
                  </div>
                  <div className="text-center my-3">
                      <h4 className="fs-5 fw-normal p-0 my-0">{props.name}</h4>
                      <small className="fw-normal text-muted">{props.username}</small>
                  </div>
              </Row>
              <div className="d-flex justify-content-center align-content-center mt-3">
                  <BsEnvelopeFill className="align-self-center" size={20}/>
                  <p className="align-self-center mt-0 mb-0 p-0 fw-light" style={{marginLeft: "10px"}}>{props.email}</p>
              </div>
              <div className="d-flex justify-content-center mt-5">
                  <a className="btn btn-outline-primary mb-5" role="button" aria-pressed="true" href="https://auth.hgsoft.me/realms/keycloak-react-auth/account/#/personal-info">
                      Change Info.
                  </a>
              </div>
        </div>
    );

};

export default AccountInfo;