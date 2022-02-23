import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import fishMarble from "./fish-marbles.jpg";
import fallingMarble from "./falling-marbles.jpg";
import "./LandingTab.css";

function LandingTab() {
    const [tab, setTab] = useState(0);
    // const history = useHistory()
    

    let page;
    if (tab === 1) {
        page = <SignUpForm setTab={setTab} />;
    } else {
        page = <LoginForm setTab={setTab} />;
    }
    return (
        <>
            <div className="marble-container">
                <img className="fish-marble" src={fishMarble} alt="marbles-with-fish" />
                <img className="falling-marble" src={fallingMarble} alt="marbles-falling-from-jar" />
            </div>
            <h2 className="fotm-h2">For All The Marbles</h2>
            {page}
        </>
    );
}

export default LandingTab;
