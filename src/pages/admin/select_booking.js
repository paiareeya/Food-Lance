import { Component } from "react";
import { NavLink } from "react-bootstrap";
import '../../styles/select_booking.css';
import Constants from '../../constants';
import axios from 'axios';

class SelectBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPage: 'menu',
            list_bookings: [],
            list_table: [],
            time_walkin: '',
            boxs: 0,
        }
    }

    componentDidMount() {
        this.onFindBooking();
        this.onFindTable()
    }

    onFindBooking = (table) => {
        axios.post(Constants.URL + Constants.API.BOOKING.BOOKINGS, {
            "bktable": table
        }).then(response => {
            console.log('response', response.data);
            const time_walkin = response.data.map(({ walkin }) => walkin)

            const Moment = require("moment-timezone")
            const walkIn = time_walkin[0] == undefined ? "" : Moment(time_walkin, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm");

            const send_time = response.data.map((val) => {
                const get_checkIn = val.checkin == undefined ? "" : Moment(val.checkin, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm");

                return {
                    ...val,
                    checkin: get_checkIn,
                }
            })
            this.setState({
                list_bookings: send_time,
                time_walkin: walkIn
            })
        });
    }

    onFindTable = () => {
        axios.post(Constants.URL + Constants.API.BOOKING.FIND_BOOKING
        ).then(response => {
            const BK = response.data
            this.setState({
                list_table: BK
            })
            this.onFindBooking(BK[0].name)
        });
    }

    ClickTime = (status, index) => {
        const table = status.name
        this.onFindBooking(table)
        console.log('time:', table);
        this.setState({
            boxs: index,
        })
    }

    render() {
        return (
            <div className='form-select-booking'>
                <h3>เวลา สถานะโต๊ะ</h3>
                <div className="card card-select-booking">
                    <div className="container card-header">
                        <div className="row row-cols-auto">
                            {this.state.list_table.map((item, i) => (
                                <div className="col header-time" key={'times' + i} >
                                    <NavLink
                                        onClick={() => { this.ClickTime(item, i) }}
                                        className={this.state.boxs === i ? 'active-bk' : 'box'}
                                    >
                                        <span style={{ fontFamily: 'Chivo Mono' }}>{item.name}</span>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <div className="header-data-booking">
                                        <b>Table</b>
                                        <b>Name</b>
                                        <b>Phone</b>
                                        <b>Time</b>
                                        <b>Check In</b>
                                        <b>Status</b>
                                    </div>
                                    {this.state.list_bookings.map((item, i) => (
                                        <li className="list-group-item data-booking" key={'bk' + i} >
                                            <span>{item.bktable}</span>
                                            <span>{item.bkname}</span>
                                            <span>{item.bknumber}</span>
                                            <span>{item.bktime}{this.state.time_walkin}</span>
                                            <span>{item.checkin}</span>
                                            <span>{item.customerType}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectBooking;
