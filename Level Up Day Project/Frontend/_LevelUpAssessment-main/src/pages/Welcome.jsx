import React from "react";

import '../App.css';
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="starry-background">
                <div className="logo-div">
                    {/* div for softserve logo */}
                    <img src=".\assets\logos\softserve-logo.webp" alt="staryy-background"></img>
                </div>

                <div className="welcome-content-container">
                    {/* left div should contain text and button */}
                    <div className="welcome-left-container">
                        {/* Contain the text at the upper div */}
                        <div>
                            <p className="welcome-left-p1">Time to</p>
                            <p className="welcome-left-p1">level up!</p>
                            <p className="welcome-left-p2">The Graduate Experience </p>
                        </div>

                        {/* Contain the button */}
                        <button className="red-button" onClick={() => navigate("/viewall")}>
                            <div>
                                <p>View graduate</p>
                                <img src=".\assets\icons\rocket_white.webp" alt="white-rocket"></img>
                            </div>
                        </button>

                        {/* Container for the 4 stripes */}
                        <div className="stripes-div">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                        </div>
                    </div>

                    {/* right div should contain the cover */}
                    <div className="welcome-right-container" >
                        <img src=".\assets\illustrations\cover.webp" alt="illustration"></img>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Welcome;