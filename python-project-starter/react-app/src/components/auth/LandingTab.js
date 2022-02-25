import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import fishMarble from "./fish-marbles.jpg";
import fallingMarble from "./falling-marbles.jpg";
import combinedMarble from "./marbles-combined.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./LandingTab.css";

function LandingTab() {
    const [tab, setTab] = useState(0);
    const [aboutTab, setAboutTab] = useState(0);

    useEffect(() => {
        document.title = "Login Page";
    });

    const handleAbout = (e) => {
        e.preventDefault();
        setAboutTab(1);
    };

    const handleAboutClose = (e) => {
        e.preventDefault();
        setAboutTab(0);
    };

    let about = (
        <div className="about-tab">
            <span className="about-text" onClick={handleAbout}>
                About
            </span>
        </div>
    );
    if (aboutTab === 1) {
        about = (
            <div className="about-tab-expanded">
                <span className="about-text-expanded">
                    For All The Marbles is a project I created that allows
                    user's to be able to buy and sell stocks without having to
                    risk anything real.
                    <p className="close-tab" onClick={handleAboutClose}>
                        Close
                    </p>
                </span>
            </div>
        );
    }

    let page;
    if (tab === 1) {
        page = <SignUpForm setTab={setTab} />;
    } else {
        page = <LoginForm setTab={setTab} />;
    }
    return (
        <>
            <div className="marble-container">
                <img
                    className="combined-marble"
                    src={combinedMarble}
                    alt="marlbe login logo"
                />
            </div>
            <h2 className="fatm-h2">For All The Marbles</h2>
            {about}
            {page}
        </>
    );
}

export default LandingTab;
