import { Component } from "react";
import '../styles/Booking.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { Modal } from "react-bootstrap";
import Constants from '../constants';

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSuccess: false,
            showFaill: false,
            booking_id: '',
            cus_name: '',
            cus_phone: '',
            cus_amounts: '',
            booking_bookings: '',
            time: '',
            datalist: [],
            selectOptions: [],
            list_bookings: [],
            list_time: [],
            id: "",
            name: '',
        }
    }

    componentDidMount() {
        if (this.state.list_bookings.length === 0) {
            this.onFindBooking();
        }
    }

    handleClose = () => {
        this.setState({
            showSuccess: false,
            showFaill: false
        });
    }
    onChangeName = (e) => {
        this.setState({ cus_name: e.target.value });
    }
    onChangePhone = (e) => {
        this.setState({ cus_phone: e.target.value });
    }
    onChangeBooking = (e) => {
        this.setState({ booking_bookings: e.target.value });

        const name = e.target.value
        axios.post(Constants.URL + Constants.API.BOOKING.BOOKING_TIME, {
            "bktable": name,
        }).then(response => {
            this.setState({
                list_time: response.data
            })
        });
    }
    onChangeAmount = (e) => {
        this.setState({ cus_amounts: e.target.value });
    }
    onChangeTime = (e) => {
        this.setState({ time: e.target.value });
    }

    onFindBooking = () => {
        axios.post(Constants.URL + Constants.API.BOOKING.FIND_BOOKING)
            .then(response => {
                const BK = response.data
                this.setState({
                    list_bookings: BK
                })
            });

        axios.post(Constants.URL + Constants.API.TIMES.FIND_TIME)
            .then(response => {
                this.setState({
                    list_time: response.data
                })
            });
    }


    onGetBooking = () => {
        console.log(this.state.time);
        const BK_name = this.state.booking_bookings;
        console.log('BK_name:', BK_name);
        if (BK_name === "") {
            this.setState({
                showFaill: true
            })
            return
        }

        axios.post(Constants.URL + Constants.API.BOOKING.CREATE_BOOKING, {
            "bktable": BK_name,
            "bkname": this.state.cus_name,
            "bknumber": this.state.cus_phone,
            "bkcustomer": this.state.cus_amounts,
            "bktime": this.state.time,
            "isBooking": true,
        }).then(response => {
            console.log(response.data);
        });
        this.setState({
            showSuccess: true,
            booking_bookings: '',
            time: '',
            cus_name: '',
            cus_phone: '',
            cus_amounts: '',
        })
        this.onFindBooking();
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
                                    <div className="col dropdown">
                                        <div className="select-style">
                                            <select value={this.state.booking_bookings}
                                                onChange={(e) => { this.onChangeBooking(e) }} >
                                                <option id="dr" value={' '} >
                                                    เลือกโต๊ะ
                                                </option>
                                                {this.state.list_bookings.map((item, i) => (
                                                    <option id="dr" key={'brand' + i} value={item.name} style={{ fontFamily: 'Chivo Mono' }}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="cun">{'|'}</div>
                                        <div className="select-style">
                                            <select value={this.state.time}
                                                onChange={(e) => { this.onChangeTime(e) }} >
                                                <option id="dr" value={' '} >
                                                    เลือกเวลา
                                                </option>
                                                {this.state.list_time.map((item, i) => (
                                                    <option id="dr" key={'brand' + i} value={item.bktime} style={{ fontFamily: 'Chivo Mono' }}>
                                                        {item.bktime}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <form className="from-booking-input">
                                            <p>
                                                <b>ชื่อผู้จอง</b>
                                                <input className="w3-input" style={{ color: 'white' }} type="text" id="name"
                                                    value={this.state.cus_name}
                                                    onChange={(e) => { this.onChangeName(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <form className="from-booking-input">
                                            <p>
                                                <b>เบอร์</b>
                                                <input className="w3-input" style={{ color: 'white' }} type="text" id="phone"
                                                    value={this.state.cus_phone}
                                                    onChange={(e) => { this.onChangePhone(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <form className="from-booking-input">
                                            <p>
                                                <b>จำนวนคนที่มา</b>
                                                <input className="w3-input" style={{ color: 'white' }} type="text" id="amount"
                                                    value={this.state.cus_amounts}
                                                    onChange={(e) => { this.onChangeAmount(e) }} />
                                            </p>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <div className="from-booking-btn">
                                            <p>* มาช้าเกิน 20 นาที โต๊ะจะทำการยกเลิก</p>
                                            <Button className="booking-btn" variant="warning"
                                                onClick={(e) => this.onGetBooking()}><b>ยืนยันการจอง</b>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal className="from-popup-success" show={this.state.showSuccess}
                        onHide={() => { this.handleClose() }}>
                        <div className="from-popup-style-success">
                            <Modal.Header closeButton className="from-popup-style-add">
                                <Modal.Title><b>Success</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="from-popup-style">
                                <div className="body-text-success">
                                    <b>จองโต๊ะสำเร็จ</b>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="from-popup-style">
                                <Button className="btn-footer" variant="primary"
                                    onClick={() => { this.handleClose() }}>
                                    ตกลง
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>

                    <Modal className="from-popup-booking-faill" show={this.state.showFaill}
                        onHide={() => { this.handleClose() }}>
                        <div className="from-popup-style-booking-faill">
                            <Modal.Header closeButton className="from-popup-style-add-booking-faill">
                                <Modal.Title><b>Faill</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="from-popup-style">
                                <div className="body-text-success">
                                    <b>กรุณาเลือกโต๊ะ</b>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="from-popup-style">
                                <Button className="btn-footer" variant="primary"
                                    onClick={() => { this.handleClose() }}>
                                    ตกลง
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Booking;