import { Component } from "react";
import '../styles/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faIceCream, faWhiskeyGlass, faBowlFood, faShrimp, faClock,
    fafacebook
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Constants from '../constants';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            facebook: '',
            line: '',
            data_store: [],
            time: [
                {
                    id: 1,
                    day: "Mon",
                    time_open: '10:00',
                    time_close: '22:00'

                },
                {
                    id: 2,
                    day: "Tues",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 3,
                    day: "Wed",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 4,
                    day: "Thu",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 5,
                    day: "Fri",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 6,
                    day: "Sat",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 7,
                    day: "Sun",
                    time_open: '10:00',
                    time_close: '22:00'
                }
            ]
        }
    }

    componentDidMount() {
        this.onGetData();
    }

    onGetData = () => {
        axios.post(Constants.URL + Constants.API.STORES.FIND_STORE
        ).then(response => {
            console.log(response.data);
            this.setState({
                data_store: response.data,
                name: response.data.name,
                phone: response.data.phonenumber,
                facebook: response.data.facebook,
                line: response.data.line
            })
        });
    }

    render() {
        return (
            <div className="from-about">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="row row-cols-2">
                                <div className="col about-image">
                                    <img src="https://i.pinimg.com/564x/e2/79/18/e2791866602f193c1c92b6aeb164c18c.jpg" className="about-img" />
                                </div>
                                <div className="col about-text">
                                    <h1>{this.state.name}.</h1>
                                    <p>delicious food is waiting for you</p>
                                    <div className="row row-cols-auto about-text-card">
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faBowlFood} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faShrimp} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faIceCream} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faWhiskeyGlass} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row row-cols-2 about-bottom">
                                <div className="col">
                                    <h6 style={{ fontSize: '20px', marginTop: '30px' }}>Contact Us</h6>
                                    <div className="contact-us">
                                        <div className="row row-cols-auto">
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/phone.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/facebook-new.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.facebook}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/line-me.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.line}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col about-time">
                                    <img src="https://i.pinimg.com/564x/8a/f2/de/8af2ded7c7df7af7166afa9dc8a94f20.jpg" className="about-img-bottom" />
                                    <div className="card card-about-time">
                                        <div className="card-body card-about-time-body">
                                            <div className="row row-cols-1">
                                                <div className="col about-time-header">
                                                    <FontAwesomeIcon icon={faClock} style={{ color: 'white', marginLeft: '10px' }}></FontAwesomeIcon>
                                                    <p style={{ marginLeft: '40px', fontFamily: 'Chivo Mono' }}>Open</p>
                                                    <p style={{ marginLeft: '45px', fontFamily: 'Chivo Mono' }}>Close</p>
                                                </div>
                                                <div className="col">
                                                    <div className="about-time-body">
                                                        <ul className="text-time-ul">
                                                            {this.state.time.map((item, index) =>
                                                                <li key={index} className="text-li">
                                                                    <span className="text-day-open">{item.day}</span>
                                                                    <span className="text-day-open">{item.time_open}</span>
                                                                    <span style={{ marginLeft: '10px' }}>{'-'}</span>
                                                                    <span className="text-day-open" style={{ marginRight: '20px' }}>{item.time_close}</span>
                                                                </li>
                                                            )}
                                                        </ul>
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
            </div>
        )
    }
}

export default About;