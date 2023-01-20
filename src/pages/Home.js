import { Component } from "react";
import '../styles/Home.css';
import { NavLink } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="from-home">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="row row-cols-2">
                                <div className="col label-home">
                                    <h1>Food lance!</h1>
                                    <p>that meets your needs</p>
                                    <div className="btn-booking">
                                        <NavLink to='/booking' className={({ isActive }) =>
                                            isActive ? 'link-booking active' : 'link-booking'
                                        }><p>Booking</p> </NavLink>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="from-slid">
                                        img-slid
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="from-category">
                                <div class="container">
                                    <div class="row row-cols-4">
                                        <div class="col">
                                            <div class="card group">
                                                <div class="card-body">
                                                    <p>Meat dish</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card group">
                                                <div class="card-body">
                                                    <p>Seafood</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card group">
                                                <div class="card-body">
                                                    <p>Dessert</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card group">
                                                <div class="card-body">
                                                    <p>Drink</p>
                                                </div>
                                            </div>
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

export default Home;