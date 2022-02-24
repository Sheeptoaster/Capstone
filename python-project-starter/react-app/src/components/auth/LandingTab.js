import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import fishMarble from "./fish-marbles.jpg";
import fallingMarble from "./falling-marbles.jpg";
import combinedMarble from './marbles-combined.png'
import "./LandingTab.css";

function LandingTab() {
    const [tab, setTab] = useState(0);
    // const history = useHistory()

    useEffect(() => {
        document.title = "Login Page"
    })

    let page;
    if (tab === 1) {
        page = <SignUpForm setTab={setTab} />;
    } else {
        page = <LoginForm setTab={setTab} />;
    }
    return (
        <>
            <div className="marble-container">
                <img className="combined-marble" src={combinedMarble} alt="marlbe login logo" />
            </div>
            <h2 className="fatm-h2">For All The Marbles</h2>
            {page}
        </>
    );
}

export default LandingTab;
