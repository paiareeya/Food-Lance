import { Component } from "react";
import '../../styles/setting_store.css';
import axios from 'axios';
import Constants from '../../constants';

class SettingStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            facebook: '',
            line: '',
            data_store: [],
            loginsucces: false
        }
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value });
    }
    onChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    }
    onChangeFacebook = (e) => {
        this.setState({ facebook: e.target.value });
    }
    onChangeLine = (e) => {
        this.setState({ line: e.target.value });
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

    onConfirmStore = () => {
        axios.post(Constants.URL + Constants.API.STORES.CREATE_STORE, {
            "name": this.state.name,
            "phonenumber": this.state.phone,
            "facebook": this.state.facebook,
            "line": this.state.line
        }).then(response => {
            console.log(response.data);
            // if (response.data.auth) {
            //     this.setState({
            //         loginsucces: true
            //     })
            // }
        });
    }

    render() {
        return (
            <div className="form-setting-store">
                <div className="card crad-setting-store">
                    <div className="card-header header-text-store">
                        Store Information
                    </div>
                    <div className="card-body">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="row row-cols-auto">
                                    <div className="col" style={{ fontWeight: 'bold' }}>Imsges</div>
                                    <div className="col">
                                        <form className="from-store-input">
                                            <p>
                                                <label className="store-text">Name Store</label>
                                                <input className="w3-input" type="text" id="name"
                                                    value={this.state.name}
                                                    onChange={(e) => { this.onChangeName(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <form className="from-store-input">
                                    <p>
                                        <label className="store-text">Phone Store</label>
                                        <input className="w3-input" type="text" id="name"
                                            value={this.state.phone}
                                            onChange={(e) => { this.onChangePhone(e) }} />
                                    </p>
                                </form>
                            </div>
                            <div className="col">
                                <form className="from-store-input">
                                    <p>
                                        <label className="store-text">Facebook Store</label>
                                        <input className="w3-input" type="text" id="name"
                                            value={this.state.facebook}
                                            onChange={(e) => { this.onChangeFacebook(e) }} />
                                    </p>
                                </form>
                            </div>
                            <div className="col">
                                <form className="from-store-input">
                                    <p>
                                        <label className="store-text">Line Store</label>
                                        <input className="w3-input" type="text" id="name"
                                            value={this.state.line}
                                            onChange={(e) => { this.onChangeLine(e) }} />
                                    </p>
                                </form>
                            </div>
                            <button type="button" className="btn btn-dark btn-confirm-store"
                                onClick={() => { this.onConfirmStore() }}>ยืนยัน</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SettingStore;