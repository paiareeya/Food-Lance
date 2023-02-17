import { Component } from "react";
import '../styles/Home.css';
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

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
                                        <Carousel fade>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/e2/79/18/e2791866602f193c1c92b6aeb164c18c.jpg"
                                                        alt="First slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/e5/c4/52/e5c4527c6105e4fe38e14401e7b979a2.jpg"
                                                        alt="Second slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/d3/e3/56/d3e356a9a4ba559afe7dd3924b0c8b29.jpg"
                                                        alt="Third slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="from-category">
                                <div className="container">
                                    <div className="row row-cols-4">
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Meat dish</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Seafood</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Dessert</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Drink</p>
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