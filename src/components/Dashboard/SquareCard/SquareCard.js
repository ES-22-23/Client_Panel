import "./SquareCard.css"
import Row from "react-bootstrap/Row";
import {useEffect, useState} from "react";


const SquareCard = (props) => {

    let styleForMainDiv = "rounded-2 my-2 d-flex justify-content-center";

    if (!props.last) {
        styleForMainDiv = "square-card-no-border " + styleForMainDiv;
    } else {
        styleForMainDiv = "square-card-last " + styleForMainDiv;
    }

    return (

        <div className={styleForMainDiv} style={{width: `${props.width}`, height: `${props.height}`}}>
            <div className="align-self-center">
                <div className="flex-row text-center">
                    <p className="title-text fs-2 fw-bold p-0 m-0">{props.value}</p>
                </div>
                <div className="flex-row text-center">
                    <p className="fs-6 fw-normal p-0 m-0">{props.title}</p>
                </div>
                {(props.showProgress || props.showProgress === undefined) && <div className="progress progress-sm mt-2" style={{width: "90px", height: "5px"}}>
                    <div className="progress-bar bg-green" style={{width: "84%"}}></div>
                </div>}
            </div>
        </div>
    );

}

export default SquareCard;
