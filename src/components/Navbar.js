import { Component } from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBell, faMoneyBill, faPersonCircleQuestion, faBasketShopping } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
    render() {
        return (
            <div className="from-navbar">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <div className="row row-cols-1">
                                    <div className="col"><h3>Food lance</h3></div>
                                    <div className="col">
                                        <div className="buffet">
                                            <h6>Buffet</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <nav className="navbar">
                                <NavLink to='/' className={({ isActive }) =>
                                    isActive ? 'link active' : 'link'
                                }>Home</NavLink>

                                <NavLink to='/menu' className={({ isActive }) =>
                                    isActive ? 'link active' : 'link'
                                }>Menu</NavLink>

                                <NavLink to='/booking' className={({ isActive }) =>
                                    isActive ? 'link active' : 'link'
                                }>Booking</NavLink>

                                <NavLink to='/about' className={({ isActive }) =>
                                    isActive ? 'link active' : 'link'
                                }>About</NavLink>
                            </nav>
                        </div>
                        <div className="col">
                            <div className="from-assist">
                                <div className="container">
                                    <div className="row row-cols-5">
                                        <div className="col icon">
                                            <NavLink to='/about' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                                <FontAwesomeIcon icon={faPersonCircleQuestion}></FontAwesomeIcon>
                                            </NavLink>
                                        </div>
                                        <div className="col icon">
                                            <NavLink to='/about' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                                <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
                                            </NavLink>
                                        </div>
                                        <div className="col icon">
                                            <NavLink to='/basket' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                                <FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon>
                                            </NavLink>
                                        </div>
                                        <div className="col icon">
                                            <NavLink to='/about' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                                <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                                            </NavLink>
                                        </div>
                                        <div className="col icon">
                                            <NavLink to='/login' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                                <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Navbar;