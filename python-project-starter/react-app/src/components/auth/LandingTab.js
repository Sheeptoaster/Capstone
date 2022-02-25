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
            <div className="about-tab-expanded">
                <span className="about-text-expanded">
                    For All The Marbles is a project I created that allows
                user's to be able to simulate investing in the stock market without having to risk anything of their own. This project is based on the site <a href="https://www.robinhood.com" target="_#">Robinhood</a>. Signup or test out the site using our Demo account.
                </span>
            </div>
            {page}
        </>
    );
}

export default LandingTab;
