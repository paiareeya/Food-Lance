import { Component } from "react";
import '../../styles/Admin.css'
import { NavLink } from "react-router-dom";
import AdminMenu from "./Admin-Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faNotesMedical, faFileLines, faGear, faAngleDown, faKitchenSet, faTable, faStore } from '@fortawesome/free-solid-svg-icons'
import AdminBooking from "./Admin-Booking";
import AdminReport from "./Admin-Report";
import AdminOrders from "./Admin-Orders";
import SelectBooking from "./select_booking";
import { Dropdown } from "react-bootstrap";
import SettingTime from "./setting_times";
import SettingStore from "./setting_store";
import AdminWalkIn from "./Admin-WalkIn";

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
                                            <div className="teble-menu dropdown-bk">
                                                <button className={showPage === 'booking' ? 'link-bk active-bk' : 'link-bk'}
                                                    data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                    <p style={{ fontSize: '13px' }}>
                                                        <FontAwesomeIcon icon={faNotesMedical}
                                                            style={{ marginTop: '10px' }}>
                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Booking</label>
                                                        <FontAwesomeIcon icon={faAngleDown}
                                                            style={{
                                                                marginTop: '3px',
                                                                marginLeft: '23px'
                                                            }}>
                                                        </FontAwesomeIcon>
                                                    </p>
                                                </button>
                                                <div className="collapse" id="collapseExample">
                                                    <div className="card card-body card-body-Dropdown">
                                                        <NavLink
                                                            className={showPage === 'booking' ? 'link-Dropdown active-Dropdown' : 'link-Dropdown'}
                                                            onClick={() => { this.ClickMenu('booking') }}>
                                                            <p style={{ fontSize: '11px' }}>
                                                                <FontAwesomeIcon icon={faNotesMedical}
                                                                    style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                </FontAwesomeIcon>
                                                                <label className="label-menu">Booking</label>
                                                            </p>
                                                        </NavLink>
                                                        <NavLink
                                                            className={showPage === 'walkIn' ? 'link-Dropdown active-Dropdown' : 'link-Dropdown'}
                                                            onClick={() => { this.ClickMenu('walkIn') }}>
                                                            <p style={{ fontSize: '11px' }}>
                                                                <FontAwesomeIcon icon={faNotesMedical}
                                                                    style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                </FontAwesomeIcon>
                                                                <label className="label-menu">Walk In</label>
                                                            </p>
                                                        </NavLink>
                                                        <NavLink
                                                            className={showPage === 'select' ? 'link-Dropdown active-Dropdown' : 'link-Dropdown'}
                                                            onClick={() => { this.ClickMenu('select') }}>
                                                            <p style={{ fontSize: '11px' }}>
                                                                <FontAwesomeIcon icon={faTable}
                                                                    style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                </FontAwesomeIcon>
                                                                <label className="label-menu" style={{ fontSize: '11px' }}>Status booking</label>
                                                            </p>
                                                        </NavLink>
                                                    </div>
                                                </div>
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
                                                <NavLink
                                                    className={showPage === 'kitchen' ? 'link-menu active-menu' : 'link-menu'}
                                                    onClick={() => { this.ClickMenu('kitchen') }}>
                                                    <p>
                                                        <FontAwesomeIcon icon={faKitchenSet}
                                                            style={{ marginTop: '3px' }}>
                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Orders</label>
                                                    </p>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="teble-menu dropdown-bk">
                                                <button className={showPage === 'setting' ? 'link-bk active-bk' : 'link-bk'}
                                                    data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                                                    <p style={{ fontSize: '13px' }}>
                                                        <FontAwesomeIcon icon={faGear}
                                                            style={{ marginTop: '10px' }}>

                                                        </FontAwesomeIcon>
                                                        <label className="label-menu">Settings</label>
                                                        <FontAwesomeIcon icon={faAngleDown}
                                                            style={{
                                                                marginTop: '3px',
                                                                marginLeft: '15px'
                                                            }}>
                                                        </FontAwesomeIcon>
                                                    </p>
                                                </button>
                                                <div className="collapse" id="collapseExample2">
                                                    <div className="card card-body card-body-Dropdown">
                                                        <NavLink
                                                            className={showPage === 'setting' ? 'link-Dropdown active-Dropdown' : 'link-Dropdown'}
                                                            onClick={() => { this.ClickMenu('setting') }}>
                                                            <p style={{ fontSize: '11px' }}>
                                                                <FontAwesomeIcon icon={faGear}
                                                                    style={{ marginTop: '10px', marginLeft: '10px' }}>

                                                                </FontAwesomeIcon>
                                                                <label className="label-menu">Setting</label>
                                                            </p>
                                                        </NavLink>
                                                        <NavLink
                                                            className={showPage === 'store' ? 'link-Dropdown active-Dropdown' : 'link-Dropdown'}
                                                            onClick={() => { this.ClickMenu('store') }}>
                                                            <p style={{ fontSize: '10px' }}>
                                                                <FontAwesomeIcon icon={faStore}
                                                                    style={{ marginTop: '10px', marginLeft: '10px' }}>
                                                                </FontAwesomeIcon>
                                                                <label className="label-menu">Store Information</label>
                                                            </p>
                                                        </NavLink>
                                                    </div>
                                                </div>
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
                                {showPage === 'kitchen' && <AdminOrders />}
                                {showPage === 'walkIn' && <AdminWalkIn />}
                                {showPage === 'select' && <SelectBooking />}
                                {showPage === 'setting' && <SettingTime />}
                                {showPage === 'store' && <SettingStore />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;