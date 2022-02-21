import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";


const NavAuth = ({ notifications, loaded }) => {
    const user = useSelector(state => state.session.user)

    let sessionLinks;
    if (user) {
        sessionLinks = (
            <>
                <NavBar notifications={notifications} />
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
