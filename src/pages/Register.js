import { Component } from "react";
import '../styles/Register.css';
import axios from 'axios';
import { Navigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Constants from '../constants';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            position: '',
            datalist: [],
            grouplist: [
                {
                    name: 'Cashier',
                    value: 'cashier'
                },
                {
                    name: 'Kitchen',
                    value: 'kitchen'
                }
            ],
            registersucces: false
        }
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    onChangePosition = (e) => {
        this.setState({ position: e.target.value });
    }

    onGetData = () => {

        axios.post(Constants.URL + Constants.API.LOGIN.CREATE_ADMIN, {
            "username": this.state.username,
            "password": this.state.password,
            "name": this.state.name,
            "position": this.state.position
        }).then(response => {
            console.log(response.data);

            if (response.data.regis) {
                this.setState({
                    registersucces: true
                })
            }
        });
    }

    render() {
        return (
            <div className="from-register">
                {this.state.registersucces && <Navigate to="/admin" />}
                <div className="container">
                    <div className="row row-cols-2">
                        <div className="col">
                            <div className="register-back">
                                <NavLink to='/login' className={({ isActive }) =>
                                    isActive ? 'link-back active' : 'link-back'}>
                                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                </NavLink>
                            </div>
                            <div className="register-logo">
                                <img src="https://i.pinimg.com/564x/e2/79/18/e2791866602f193c1c92b6aeb164c18c.jpg" className="register-img" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="row row-cols-1">
                                <div className="col-register">
                                    <div className="col">
                                        <div className="register-header">
                                            <h1>Wellcom</h1>
                                            <label>Sign up with your in account. </label>
                                        </div>
                                    </div>
                                    <div className="register-label">
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p>
                                                    <label className="login-text">Username</label>
                                                    <input className="w3-input" type="text" id="username"
                                                        value={this.state.username}
                                                        onChange={(e) => { this.onChangeUsername(e) }} />
                                                </p>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p>
                                                    <label className="login-text">Password</label>
                                                    <input className="w3-input" type="text" id="password"
                                                        value={this.state.password}
                                                        onChange={(e) => { this.onChangePassword(e) }} />
                                                </p>
                                                <h6>* password 5 ตัวขึ้นไป</h6>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p>
                                                    <label className="login-text">Name</label>
                                                    <input className="w3-input" type="text" id="password"
                                                        value={this.state.name}
                                                        onChange={(e) => { this.onChangeName(e) }} />
                                                </p>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <label className="login-text">Position</label>
                                            <div className="select-style-position" style={{ marginTop: '10px' }}>
                                                <select value={this.state.position}
                                                    onChange={(e) => { this.onChangePosition(e) }} >
                                                    <option id="dr" value={' '} >
                                                        เลือก
                                                    </option>
                                                    {this.state.grouplist.map((item, i) => (
                                                        <option id="dr" key={'brand' + i} value={item.name} style={{ fontFamily: 'Chivo Mono' }}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="from-btn-sigUp">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? 'link-sigUp active' : 'link-sigUp'}>
                                            <button type="button" className="btn btn-dark btn-sigUp"
                                                onClick={() => { this.onGetData() }}>Sign Up</button>
                                        </NavLink>
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

export default Register;