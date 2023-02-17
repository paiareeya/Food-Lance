import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import '../../styles/Admin-Booking.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import Constants from '../../constants';

class AdminBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddBooking: false,
            showUpdate: false,
            showSuccess: false,
            showFaill: false,
            admin_bookings: '',
            // admin_amount_cus: '',
            // check_in: '',
            // check_out: '',
            // status_booking: '',
            dataBooking: [],
            booking_name: '',
            booking_amount: '',
            dateName: '',
            datePhone: '',
            dateAmount: '',
            time: '',
            dateTime: '',
            dateTimeCheckIn: '',
            list_bookings: [],
            get_dataBooking: [],
            list_time: [],
            id_status: '',
            status_booking: [
                {
                    id: 1,
                    name: 'จอง',
                    bkstatus: true
                },
                {
                    id: 2,
                    name: 'Check In',
                    isCheckIn: true,
                    isCheckOut: false
                },
                {
                    id: 3,
                    name: 'Check Out',
                    isCheckIn: false,
                    isCheckOut: true
                },
                {
                    id: 4,
                    name: 'Late',
                    isCheckIn: false,
                    isCheckOut: false
                }
            ]
        }
    }

    componentDidMount() {
        this.onFindBooking();
    }

    handleClose = () => {
        this.setState({
            showAddBooking: false,
            showUpdate: false,
            showSuccess: false,
            showFaill: false,
        })
    }
    onChangeBooking = (e) => {
        this.setState({ admin_bookings: e.target.value });

        if (e.target.value === " " || this.state.time === " ") {
            return
        }
        axios.post(Constants.URL + Constants.API.BOOKING.FIND_ONE_BOOKING, {
            "bktable": e.target.value,
            "bktime": this.state.time,
        }).then(response => {
            console.log('response:', response.data);
            const getlist = response.data
            const name = response.data.map(({ bkname }) => bkname)
            const phone = response.data.map(({ bknumber }) => bknumber)
            const amount = response.data.map(({ bkcustomer }) => bkcustomer)
            const time = response.data.map(({ bktime }) => bktime)
            const time_checkIn = response.data.map(({ checkin }) => checkin)

            const Moment = require("moment-timezone")
            console.log('time_checkIn', time_checkIn);
            const checkIn = time_checkIn[0] == undefined ? "" : Moment(time_checkIn, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm"); //format("DD/MM/yyyy HH:mm") สิ่งที่เราต้องการที่จะได้ ถ้าอยากได้แค่เวลา ใส่แค่ HH:mm

            console.log('name:', name, 'phone:', phone, 'amount:', amount);
            this.setState({
                get_dataBooking: getlist,
                dateTime: time,
                dateTimeCheckIn: checkIn,
                dateName: name,
                datePhone: phone,
                dateAmount: amount,
            })
        });
    }
    onChangeAmountCus = (e) => {
        this.setState({ admin_amount_cus: e.target.value });
    }
    onChangeCheckIn = (e) => {
        this.setState({ check_in: e.target.value });
    }
    onChangeCheckOut = (e) => {
        this.setState({ check_out: e.target.value });
    }
    onChangeStatusBooking = (e) => {
        this.setState({ id_status: e.target.value });
    }
    onChangeAddBookingName = (e) => {
        this.setState({ booking_name: e.target.value });
    }
    onChangeAddBookingAmount = (e) => {
        this.setState({ booking_amount: e.target.value });
    }
    handleAddBooking = () => {
        this.setState({ showAddBooking: true })
    }
    onChangeNameCus = (e) => {
        this.setState({ dateName: e.target.value });
    }
    onChangePhoneCus = (e) => {
        this.setState({ datePhone: e.target.value });
    }
    onChangeAmountCus = (e) => {
        this.setState({ dateAmount: e.target.value });
    }
    onChangeTime = (e) => {
        this.setState({ time: e.target.value });

        const get_time = e.target.value
        console.log('get_time:', get_time);

        if (this.state.admin_bookings === " " || get_time === " ") {
            return
        }

        axios.post(Constants.URL + Constants.API.BOOKING.FIND_ONE_BOOKING, {
            "bktable": this.state.admin_bookings,
            "bktime": get_time,
        }).then(response => {
            console.log('response:', response.data);
            const getlist = response.data
            const name = response.data.map(({ bkname }) => bkname)
            const phone = response.data.map(({ bknumber }) => bknumber)
            const amount = response.data.map(({ bkcustomer }) => bkcustomer)
            const time = response.data.map(({ bktime }) => bktime)
            const time_checkIn = response.data.map(({ checkin }) => checkin)

            const Moment = require("moment-timezone")
            console.log('time_checkIn', time_checkIn);
            const checkIn = time_checkIn[0] == undefined ? "" : Moment(time_checkIn, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm"); //format("DD/MM/yyyy HH:mm") สิ่งที่เราต้องการที่จะได้ ถ้าอยากได้แค่เวลา ใส่แค่ HH:mm

            console.log('name:', name, 'phone:', phone, 'amount:', amount);
            this.setState({
                get_dataBooking: getlist,
                dateTime: time,
                dateTimeCheckIn: checkIn,
                dateName: name,
                datePhone: phone,
                dateAmount: amount,
            })
        });
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

    onClickAddBooking = () => {

        axios.post(Constants.URL + Constants.API.BOOKING.ADMIN_CREATE_BOOKING, {
            "name": this.state.booking_name,
            "chair": this.state.booking_amount
        }).then(response => {
            console.log(response.data);
            this.setState({
                showAddBooking: false,
                booking_name: '',
                booking_amount: ''
            })
            this.onFindBooking();
        });
    }

    UploadBooking = () => {
        const get = this.state.get_dataBooking;
        const getId = get.map(item => item._id);
        const getBktable = get.map(item => item.bktable);

        const getList_booking = this.state.list_bookings.filter(item => item.name == this.state.admin_bookings)

        const getStatus = this.state.status_booking.filter(item => item.id == this.state.id_status);

        // customer Create Booking to isBooking
        if (getStatus[0].id === 1) {
            const BK_name = this.state.admin_bookings;
            console.log('BK_name:', BK_name);
            if (BK_name === "") {
                this.setState({
                    showFaill: true
                })
                return
            }
            axios.post(Constants.URL + Constants.API.BOOKING.CREATE_BOOKING, {
                "bktable": getList_booking[0].name,
                "bkname": this.state.dateName,
                "bknumber": this.state.datePhone,
                "bkcustomer": this.state.dateAmount,
                "bktime": this.state.time,
                "isBooking": true
            }).then(response => {
                console.log(response.data);
            });
            this.setState({
                showSuccess: true,
                booking_bookings: '',
                cus_name: '',
                cus_phone: '',
                cus_amounts: '',
            })
        }
        // Admin Uodate Booking to Check In or Check Out
        else if (getStatus[0].id === 2 || getStatus[0].id === 3) {
            axios.post(Constants.URL + Constants.API.BOOKING.UPDATE_BOOKING, {
                "_id": getId,
                "bktable": getBktable,
                "isCheckIn": getStatus[0].isCheckIn,
                "isCheckOut": getStatus[0].isCheckOut
            }).then(response => {
                console.log(response.data);
                this.setState({
                    showUpdate: true
                })
                this.setState({
                    dateName: '',
                    datePhone: '',
                    dateAmount: '',
                    dateTime: '',
                    admin_bookings: '',
                    time: '',
                    id_status: ''
                })
                this.onFindBooking();
            });
        }
        // Admin Update Time late Booking
        else {
            axios.post(Constants.URL + Constants.API.BOOKING.UPDATE_STATUS_LATE, {
                "_id": getId,
                "bktable": getBktable
            }).then(response => {
                console.log(response.data);
                this.setState({
                    showUpdate: true
                })
                this.setState({
                    dateName: '',
                    datePhone: '',
                    dateAmount: '',
                    dateTime: '',
                    dateTimeCheckIn: ''
                })
                this.onFindBooking();
            });
        }

    }

    render() {
        return (
            <div className="from-admin-booking">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="col">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-add-booking"
                                            onClick={() => { this.handleAddBooking() }}>
                                            <b>Add</b>
                                        </button>
                                    </div>
                                    {/* <div className="col-sm-10">
                                        <button type="button" className="btn btn-delete-booking"
                                            onClick={() => { this.handleDeleteBooking() }}>
                                            <b>Delete</b>
                                        </button>
                                    </div> */}
                                </div>
                                <h1>Images Booking</h1>
                            </div>
                        </div>
                        <div className="col-7 col-md-4">
                            <div className="col">
                                <div className="from-admin-booking-center">
                                    <div className="row row-cols-1">
                                        <div className="col dropdown-booking">
                                            <div className="select-style-admin-booking">
                                                <select value={this.state.admin_bookings}
                                                    onChange={(e) => { this.onChangeBooking(e) }} >
                                                    <option id="dr" value={' '}>
                                                        เลือกโต๊ะ
                                                    </option>
                                                    {this.state.list_bookings.map((item, i) => (
                                                        <option id="dr" key={'brand' + i} value={item.name} style={{ fontFamily: 'Chivo Mono' }}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="cun-bk">{'|'}</div>
                                            <div className="select-style-admin-booking" style={{ marginLeft: '10px' }}>
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
                                            <div className="from-admin-booking-center">
                                                <div className="row row-cols-1">
                                                    <div className="col">
                                                        <div className="booking-name">
                                                            <form className="from-amount-cus-input">
                                                                <p>
                                                                    <label className="text-booking">ชื่อผู้จอง :</label>
                                                                    <input className="w3-input" style={{ color: 'white' }} type="text" id="amount-cus"
                                                                        value={this.state.dateName}
                                                                        onChange={(e) => { this.onChangeNameCus(e) }} />
                                                                </p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-phone">
                                                            <form className="from-amount-cus-input">
                                                                <p>
                                                                    <label className="text-booking">เบอร์ :</label>
                                                                    <input className="w3-input" style={{ color: 'white' }} type="text" id="amount-cus"
                                                                        value={this.state.datePhone}
                                                                        onChange={(e) => { this.onChangePhoneCus(e) }} />
                                                                </p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-time">
                                                            <p className="text-booking">เวลาจอง : {this.state.dateTime}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-time">
                                                            <p className="text-booking-time">เวลา
                                                                <span style={{ fontFamily: 'Chivo Mono', marginLeft: '10px' }}>Check In :</span>
                                                                {this.state.dateTimeCheckIn}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-amount-cus">
                                                            <form className="from-amount-cus-input">
                                                                <p>
                                                                    <label className="text-booking">จำนวนลูกค้า :</label>
                                                                    <input className="w3-input" style={{ color: 'white' }} type="text" id="amount-cus"
                                                                        value={this.state.dateAmount}
                                                                        onChange={(e) => { this.onChangeAmountCus(e) }} />
                                                                </p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-status">
                                                            <p className="text-booking-status">สถานะ
                                                                <span style={{ fontFamily: 'Chivo Mono', marginLeft: '10px' }}>Booking : </span>
                                                            </p>
                                                            <div className="select-style-admin-booking">
                                                                <select value={this.state.id_status}
                                                                    onChange={(e) => { this.onChangeStatusBooking(e) }} >
                                                                    <option id="dr">
                                                                        เลือก
                                                                    </option>
                                                                    {this.state.status_booking.map((item, i) => (
                                                                        <option id="dr" key={'brand' + i} value={item.id} style={{ fontFamily: 'Chivo Mono' }}>
                                                                            {item.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-btn-footer">
                                                            <Button className="btn-footer-booking" variant="primary"
                                                                onClick={() => { this.UploadBooking() }}>
                                                                ตกลง
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal className="from-popup-add-category" show={this.state.showAddBooking} onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-add">
                                    <Modal.Header closeButton className="from-popup-style-add">
                                        <Modal.Title><b style={{ fontFamily: 'Noto Serif Thai' }}>เพิ่มโต๊ะ</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="popup-body-category">
                                            <div className="container">
                                                <div className="row row-cols-1">
                                                    <div className="col">
                                                        <div className="body-text-add">
                                                            <form className="from-add-category-input">
                                                                <label style={{ fontFamily: 'Noto Serif Thai' }}>เลขโต๊ะ</label>
                                                                <input className="w3-input" type="text" id="id"
                                                                    value={this.state.booking_name}
                                                                    onChange={(e) => { this.onChangeAddBookingName(e) }} />
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="body-text-add">
                                                            <form className="from-add-category-input">
                                                                <label style={{ fontFamily: 'Noto Serif Thai' }}>จำนวนที่นั่ง</label>
                                                                <input className="w3-input" type="text" id="name"
                                                                    value={this.state.booking_amount}
                                                                    onChange={(e) => { this.onChangeAddBookingAmount(e) }} />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="from-popup-style">
                                        <Button className="btn-footer" variant="primary"
                                            onClick={() => { this.onClickAddBooking() }}>
                                            ยืนยัน
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            </Modal>

                            <Modal className="from-popup-booking-Update" show={this.state.showUpdate}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-booking-Update">
                                    <Modal.Header closeButton className="from-popup-style-Update-booking">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Update Complete</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="body-text-booking-Update">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-booking"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Chivo Mono' }}>Congats! Your Update successfully done</b>
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

                            <Modal className="from-popup-success" show={this.state.showSuccess}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-success">
                                    <Modal.Header closeButton className="from-popup-style-add">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Success</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="body-text-success">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-booking"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Noto Serif Thai' }}>จองโต๊ะสำเร็จ</b>
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
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Faill</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="body-text-success">
                                            <FontAwesomeIcon icon={faCircleExclamation} className="CircleExclamation"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Noto Serif Thai' }}>กรุณาเลือกโต๊ะ</b>
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
                </div>
            </div >
        );
    }
}

export default AdminBooking;