import { Component } from "react";
import '../styles/Register.css';
import axios from 'axios';
import { Navigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            position: '',
            datalist: [],
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

    // Sigin = (username) => {
    //     console.log(username);

    //     const register = this.state.datalist

    //     register.push({
    //         username: this.state.username,
    //         password: this.state.password,
    //         name: this.state.name,
    //         position: this.state.position
    //     })
    //     this.setState({ datalist: register })

    //     console.log(this.state.datalist);
    // }

    onGetData = () => {

        axios.post('http://192.168.1.21:8080/create-admin', {
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
                                image Logo
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
                                                <p><label>Username</label>
                                                    <input className="w3-input" type="text" id="username"
                                                        value={this.state.username} onChange={(e) => { this.onChangeUsername(e) }} /></p>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p><label>Password</label>
                                                    <input className="w3-input" type="text" id="password"
                                                        value={this.state.password} onChange={(e) => { this.onChangePassword(e) }} /></p>
                                                <h6>* password 5 ตัวขึ้นไป</h6>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p><label>Name</label>
                                                    <input className="w3-input" type="text" id="password"
                                                        value={this.state.name} onChange={(e) => { this.onChangeName(e) }} /></p>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <form className="from-register-input">
                                                <p><label>Position</label>
                                                    <input className="w3-input" type="text" id="password"
                                                        value={this.state.position} onChange={(e) => { this.onChangePosition(e) }} /></p>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="from-btn-sigUp">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? 'link-sigUp active' : 'link-sigUp'}>
                                            <button type="button" className="btn btn-dark btn-sigUp"
                                                onClick={() => { this.onGetData() }}>Sign Up</button>
                                        </NavLink>
                                        {/* <button type="button" className="btn btn-dark btn-sigin"
                                            onClick={() => this.onGetData()}>Sign Up</button> */}
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