import { Component } from "react";
import '../../styles/Admin.css'
import { NavLink } from "react-router-dom";
import AdminMenu from "./Admin-Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faNotesMedical, faFileLines, faGear, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import AdminBooking from "./Admin-Booking";
import AdminReport from "./Admin-Report";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPage: 'menu'
        }
    }

    ClickMenu = (page) => {
        this.setState({
            showPage: page
        })
        console.log("show");
    }

    render() {
        const {
            showPage
        } = this.state;

        return (
            <div className="from-admin">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <div className="from-menu">
                                <div className="container">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <div className="teble-menu">
                                                <NavLink
                                                    className={showPage === 'menu' ? 'link-menu active-menu' : 'link-menu'}
                                                    onClick={() => { this.ClickMenu('menu') }}>
                                                    <p>
                                                        <FontAwesomeIcon icon={faUtensils}
                                                            style={{ marginTop: '3px' }}>
                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Menu</label>
                                                    </p>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="col">
                                            {/* <div className="teble-menu">
                                                <NavLink to='/' className={({ isActive }) =>
                                                    isActive ? 'link-menu active-menu' : 'link-menu'
                                                }><p>food categories</p></NavLink>
                                            </div> */}
                                        </div>
                                        <div className="col">
                                            <div className="teble-menu">
                                                <NavLink
                                                    className={showPage === 'booking' ? 'link-menu active-menu' : 'link-menu'}
                                                    onClick={() => { this.ClickMenu('booking') }}>
                                                    <p>
                                                        <FontAwesomeIcon icon={faNotesMedical}
                                                            style={{ marginTop: '3px' }}>
                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Booking</label>
                                                    </p>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="teble-menu">
                                                <NavLink
                                                    className={showPage === 'report' ? 'link-menu active-menu' : 'link-menu'}
                                                    onClick={() => { this.ClickMenu('report') }}>
                                                    <p>
                                                        <FontAwesomeIcon icon={faFileLines}
                                                            style={{ marginTop: '3px' }}>
                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Report</label>
                                                    </p>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="teble-menu">
                                                <NavLink to='/' className={({ isActive }) =>
                                                    isActive ? 'link-menu active-menu' : 'link-menu'}>
                                                    <p><FontAwesomeIcon icon={faGear}
                                                        style={{ marginTop: '3px' }}></FontAwesomeIcon>
                                                        <label className="label-menu">Settings</label>
                                                        <FontAwesomeIcon icon={faAngleDown}
                                                            style={{ marginTop: '3px', marginLeft: '15px' }}></FontAwesomeIcon>
                                                    </p>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="from-show-data">
                                {showPage === 'menu' && <AdminMenu />}
                                {showPage === 'booking' && <AdminBooking />}
                                {showPage === 'report' && <AdminReport />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;