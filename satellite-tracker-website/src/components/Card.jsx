import React from "react";
import "./Card.css"

export const Card = ({
    title,
    duration,
    direction,
    sat,
    buttonText,
    link
}) => {
    return (
        <div className="card-container">
            <h2 className="card-title">{title}</h2>
            <p className="card-sat"> <b>Satellite: </b> {sat}</p>
            <p className="card-duration"><b>Duration: </b>{duration}</p>
            <p className="card-direction"><b>Direction: </b>{direction}</p>
            {buttonText && link && <a href={link} className="card-btn" target="_blank">{buttonText}</a>}
        </div>
    );
};