import { Component } from "react";
import '../../styles/setting_times.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Constants from '../../constants';
// import TimePicker from 'react-time-picker';
import { TimePicker } from 'react-ios-time-picker';

class SettingTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: '',
            dataTime: [],
            listTime: [],
            loginsucces: false,
            times: '10:00'
        }
    }

    handleChange = (newTime) => {
        this.setState({ times: newTime });
    };

    onChangeTime = (e) => {
        this.setState({ time: e.target.value });
    }

    componentDidMount() {
        this.onFindTime();
    }

    onFindTime = () => {
        axios.post(Constants.URL + Constants.API.TIMES.FIND_TIME
        ).then(response => {
            // console.log(response.data);
            this.setState({
                dataTime: response.data
            })
        });
    }

    onGetData = () => {
        axios.post(Constants.URL + Constants.API.TIMES.CREATE_TIME, {
            "bktime": this.state.time
        }).then(response => {
            // console.log(response.data);
            const get_time = this.state.dataTime
            this.setState({
                dataTime: [...get_time, response.data], //[...ค่าเดิม, ค่าใหม่] การเอาค่าเดิมมาต่อค่าใหม่
                time: ''
            })
            this.onFindTime();
        });
    }

    onClickCheckBoxTime = (index) => {
        const getListMenu = this.state.dataTime
        const item = getListMenu[index]
        const MenuStatus = !item.boxStatus
        getListMenu[index] = {
            ...item,
            boxStatus: MenuStatus
        }
        this.state.listTime = this.state.dataTime.filter(item => item.boxStatus === true);
    }

    DeleteTime = () => {
        const id = this.state.listTime.map(item => { return { _id: item._id } });
        // console.log('id:', id);

        const payload =
        {
            "data": id
        }
        console.log(payload);
        axios.post(Constants.URL + Constants.API.TIMES.DELETE_TIME, payload)
            .then(response => {
                console.log(response.data);
                this.onFindTime();
            });
    }

    render() {
        return (
            <div className="form-setting-times">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="card card-time-booking">
                                <a data-bs-toggle="collapse" href="#collapseExampleTimeBK" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <div className="card-header header-text">
                                        Booking Time
                                        <FontAwesomeIcon icon={faAngleDown}
                                            style={{
                                                marginTop: '3px',
                                                position: 'absolute',
                                                right: '12px',
                                            }}>
                                        </FontAwesomeIcon>
                                    </div>
                                </a>
                                <div className="collapse" id="collapseExampleTimeBK">
                                    <div className="card-body">
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title card-title-header">Time Booking</h5>
                                                        <ul className="list-group list-group-flush">
                                                            {this.state.dataTime.map((item, i) =>
                                                                <li className="list-group-item item-update-time"
                                                                    key={'time' + i}>
                                                                    <label>
                                                                        <input className="form-check-input me-1" type="checkbox" checked={item.status}
                                                                            onChange={() => { this.onClickCheckBoxTime(i) }} />
                                                                        <b className="text-category">{item.bktime}</b>
                                                                    </label>
                                                                </li>
                                                            )}
                                                        </ul>
                                                        <button type="button" className="btn btn-dark btn-delete-time"
                                                            onClick={() => { this.DeleteTime() }}>DELETE</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title card-title-header">Update Time Booking</h5>
                                                        {/* <form className="from-time-input">
                                                            <p>
                                                                <label className="time-text text-muted">Time</label>
                                                                <input className="w3-input" type="text" id="password"
                                                                    value={this.state.time}
                                                                    onChange={(e) => { this.onChangeTime(e) }} />
                                                            </p>
                                                        </form> */}

                                                        {/* <div>
                                                            <input
                                                                type="number"
                                                                value={this.state.times.hour}
                                                                onChange={(e) => { this.handleHourChange(e) }}
                                                                min="0"
                                                                max="23"
                                                                step="1"
                                                            />
                                                            :
                                                            <input
                                                                type="number"
                                                                value={this.state.times.minute}
                                                                onChange={(e) => { this.handleMinuteChange(e) }}
                                                                min="0"
                                                                max="59"
                                                                step="1"
                                                            />
                                                        </div> */}
                                                        {/* <div>
                                                            <TimePicker
                                                                onChange={(e) => { this.handleChange(e) }}
                                                                value={this.state.times}
                                                                clearIcon={null}
                                                                format="HH:mm"
                                                            />
                                                        </div> */}

                                                        <div>
                                                            <TimePicker onChange={(e) => { this.handleChange(e) }} value={this.state.times} />
                                                        </div>



                                                        <button type="button" className="btn btn-dark btn-confirm-time"
                                                            onClick={() => { this.onGetData() }}>ADD</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><br />
                        </div>
                        <div className="col">Column</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingTime;