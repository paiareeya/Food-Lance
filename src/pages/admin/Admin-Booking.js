import { Component } from "react";
import '../../styles/Admin-Booking.css';

class AdminBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin_bookings: '',
            admin_amount_cus: '',
            admin_check_in: '',
            status_booking: '',
            dropdown: [
                {
                    id: 1,
                    name: 'A1'
                },
                {
                    id: 2,
                    name: 'A2'
                }
            ],
            booking: [
                {
                    id: 1,
                    name: 'ว่าง'
                },
                {
                    id: 2,
                    name: 'จอง'
                },
                {
                    id: 3,
                    name: 'มาแล้ว'
                }
            ]
        }
    }

    onChangeBooking = (e) => {
        this.setState({ admin_bookings: e.target.value });
        console.log(e.target.value);
    }
    onChangeAmountCus = (e) => {
        this.setState({ admin_amount_cus: e.target.value });
    }
    onChangeCheckIn = (e) => {
        this.setState({ admin_check_in: e.target.value });
    }
    onChangeStatusBooking = (e) => {
        this.setState({ status_booking: e.target.value });
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="from-admin-booking">
                <div className="container">
                    <div className="row row-cols-2">
                        <div className="col-sm-7"><h1>Images Booking</h1></div>
                        <div className="col-sm-5">
                            <div className="from-admin-booking-right">
                                <div className="row row-cols-1">
                                    <div className="col">
                                        <div className="select-style-admin-booking">
                                            <select value={this.state.admin_bookings}
                                                onChange={(e) => { this.onChangeBooking(e) }} >
                                                {this.state.dropdown.map((val, i) => (
                                                    <option id="dr" key={'brand' + i} value={val.id}>
                                                        {val.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="select-status">สถานะ Booking : </p>
                                    </div>
                                    <div className="col">
                                        <div className="from-admin-booking-right">
                                            <div className="row row-cols-1">
                                                <div className="col">
                                                    <div className="booking-name">
                                                        <p>ชื่อผู้จอง : </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="booking-phone">
                                                        <p>เบอร์ : </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="booking-time">
                                                        <p>เวลาจอง : </p>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="booking-amount-cus">
                                                        <form className="from-amount-cus-input">
                                                            <p>
                                                                <label>จำนวนลูกค้า :</label>
                                                                <input className="w3-input" type="text" id="amount-cus"
                                                                    value={this.state.password}
                                                                    onChange={(e) => { this.onChangeAmountCus(e) }} />
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="booking-checkIn">
                                                        <form className="from-checkIn-input">
                                                            <p>
                                                                <label>เวลา check in :</label>
                                                                <input className="w3-input" type="text" id="checkin"
                                                                    value={this.state.password}
                                                                    onChange={(e) => { this.onChangeCheckIn(e) }} />
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="booking-status">
                                                        <p>สถานะ booking : </p>
                                                        <div className="select-style-admin-booking">
                                                            <select value={this.state.status_booking}
                                                                onChange={(e) => { this.onChangeStatusBooking(e) }} >
                                                                {this.state.booking.map((val, i) => (
                                                                    <option id="dr" key={'brand' + i} value={val.id}>
                                                                        {val.name}
                                                                    </option>
                                                                ))}
                                                            </select>
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
            </div>
        );
    }
}

export default AdminBooking;