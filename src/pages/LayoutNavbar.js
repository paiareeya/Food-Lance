import { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

class LayoutNavbar extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        )
    }
}

export default LayoutNavbar;