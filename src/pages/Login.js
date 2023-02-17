import { Component } from "react";
import '../styles/Login.css';
import axios from 'axios';
import { Navigate, NavLink } from "react-router-dom";
import Constants from '../constants';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            datalist: [],
            loginsucces: false
        }
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onGetData = () => {
        axios.post(Constants.URL + Constants.API.LOGIN.AUTH_ADMIN, {
            "username": this.state.username,
            "password": this.state.password
        }).then(response => {
            console.log(response.data);

            if (response.data.auth) {
                this.setState({
                    loginsucces: true
                })
            }
        });

    }

    render() {
        return (
            <div className="from-login">
                {this.state.loginsucces && <Navigate to="/admin" />}
                <div className="container">
                    <div className="col-md">
                        <div className="row row-cols-2">
                            <div className="col">
                                <div className="login-logo">
                                    <img src="https://i.pinimg.com/564x/e2/79/18/e2791866602f193c1c92b6aeb164c18c.jpg" className="login-img" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="row row-cols-1">
                                    <div className="col-login">
                                        <div className="col">
                                            <div className="login-header">
                                                <h1>Wellcom</h1>
                                                <label>Sign in with your Username and Password. </label>
                                            </div>
                                        </div>
                                        <div className="login-label">
                                            <div className="col">
                                                <form className="from-login-input">
                                                    <p>
                                                        <label className="login-text">Username</label>
                                                        <input className="w3-input" type="text" id="username" style={{ color: 'white' }}
                                                            value={this.state.username}
                                                            onChange={(e) => { this.onChangeUsername(e) }} />
                                                    </p>
                                                </form>
                                            </div>
                                            <div className="col">
                                                <form className="from-login-input">
                                                    <p>
                                                        <label className="login-text">Password</label>
                                                        <input className="w3-input" type="text" id="password" style={{ color: 'white' }}
                                                            value={this.state.password}
                                                            onChange={(e) => { this.onChangePassword(e) }} />
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="from-btn-sigin">
                                                <NavLink className={({ isActive }) =>
                                                    isActive ? 'link-signIn active' : 'link-signIn'}>
                                                    <button type="button" className="btn btn-dark btn-sigin"
                                                        onClick={() => { this.onGetData() }}><b>Sign In</b></button>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="signUp">
                                            <p>Dont'n have an account?</p><label></label>
                                            <NavLink to='/register' className={({ isActive }) =>
                                                isActive ? 'link-signup active' : 'link-signup'
                                            }>Sign Up</NavLink>
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

export default Login;