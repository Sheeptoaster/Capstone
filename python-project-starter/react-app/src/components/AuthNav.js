import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";


const NavAuth = ({ notifications, loaded, setNotifications }) => {
    const user = useSelector(state => state.session.user)

    let sessionLinks;
    if (user) {
        sessionLinks = (
            <>
                <NavBar notifications={notifications} setNotifications={setNotifications} />
            </>
        )
    } else {
        sessionLinks = (
            <>
            </>
        )
    }

    return (
        <>
            {loaded && sessionLinks}
        </>
    );
}

export default NavAuth
