import { Component } from "react";
import '../styles/Booking.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import axios from 'axios'

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking_id: '',
            booking_name: '',
            booking_phone: '',
            booking_bookings: '',
            datalist: [],
            selectOptions: [],
            id: "",
            name: '',
            dropdown: [
                {
                    id: 1,
                    name: 'a'
                },
                {
                    id: 2,
                    name: 'b'
                }
            ]
        }
    }

    onChangeName = (e) => {
        this.setState({ booking_name: e.target.value });
    }

    onChangePhone = (e) => {
        this.setState({ booking_phone: e.target.value });
    }

    onChangeBooking = (e) => {
        this.setState({ booking_bookings: e.target.value });
    }


    handleChange(e) {
        this.setState({ id: e.value, name: e.label })
    }

    onGetData = () => {
        console.log("booking");

        const booking = this.state.datalist

        booking.push({
            booking_name: this.state.booking_name,
            booking_phone: this.state.booking_phone,
            booking_bookings: this.state.booking_bookings
        })
        this.setState({ datalist: booking })

        console.log(this.state.datalist);
    }

    render() {
        return (
            <div className="from-booking">
                <div className="container">
                    <div className="row">
                        <div className="col-8">col-8</div>
                        <div className="col-4">
                            <div className="container">
                                <div className="row row-cols-1">
                                    <div className="col">
                                        <div className="select-header">
                                            <b>เลือกโต๊ะ</b>
                                            <div className="select-style">
                                                <select value={this.state.booking_bookings}
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
                                    </div>
                                    <div className="col">
                                        <form className="from-booking-input">
                                            <p>
                                                <b>ชื่อผู้จอง</b>
                                                <input className="w3-input" type="text" id="name"
                                                    value={this.state.booking_name}
                                                    onChange={(e) => { this.onChangeName(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <form className="from-booking-input">
                                            <p>
                                                <b>เบอร์</b>
                                                <input className="w3-input" type="text" id="phone"
                                                    value={this.state.booking_phone}
                                                    onChange={(e) => { this.onChangePhone(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <div className="from-booking-btn">
                                            <p>* มาช้าเกิน 20 นาที โต๊ะจะทำการยกเลิก</p>
                                            <Button className="booking-btn" variant="warning"
                                                onClick={(e) => this.onGetData()}><b>ยืนยันการจอง</b>
                                            </Button>
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

export default Booking;