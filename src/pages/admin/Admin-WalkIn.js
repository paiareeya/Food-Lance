import { Component } from "react";
import '../../styles/Admin-WalkIn.css';
import { Button, Modal } from "react-bootstrap";
import Constants from '../../constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

class AdminWalkIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddBooking: false,
            showUpdate: false,
            showSuccess: false,
            showWalkIn: false,
            showFaill: false,
            admin_bookings: '',
            dateName: '',
            datePhone: '',
            dateAmount: '',
            time: '',
            dateTime: '',
            list_bookings: [],
            get_dataBooking: [],
            walkin_bookings: [],
            dataBooking: [],
            id_status: '',
            status_booking: [
                {
                    id: 1,
                    name: 'Walk In',
                    isWalkIn: true
                },
                {
                    id: 2,
                    name: 'Check Out',
                    isCheckIn: false,
                    isCheckOut: true
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
            showWalkIn: false,
            showSuccess: false,
            showFaill: false
        })
    }
    onChangeBooking = (e) => {
        this.setState({ admin_bookings: e.target.value });

        if (e.target.value === " ") {
            return
        }
        axios.post(Constants.URL + Constants.API.BOOKING.FIND_WALKIN, {
            "bktable": e.target.value
        })
            .then(response => {
                // console.log(response.data);
                const BK = response.data

                this.setState({
                    get_dataBooking: BK,
                    walkin_bookings: BK,
                    dateName: response.data.bkname,
                    datePhone: response.data.bknumber,
                    dateAmount: response.data.bkcustomer
                })
            });

    }
    onChangeStatusBooking = (e) => {
        this.setState({ id_status: e.target.value });
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

    onFindBooking = () => {
        axios.post(Constants.URL + Constants.API.BOOKING.FIND_BOOKING)
            .then(response => {
                const BK = response.data
                this.setState({
                    list_bookings: BK
                })
            });
    }


    UploadBooking = () => {
        const get = this.state.get_dataBooking;
        const getList_booking = this.state.list_bookings.filter(item => item.name == this.state.admin_bookings)
        const getId = get._id
        const getBktable = get.bktable
        console.log('getId', getId);
        console.log('getBktable', getBktable);
        // console.log('this.state.status_booking', this.state.status_booking[0].id);
        const getStatus = this.state.status_booking.filter(item => item.id == this.state.id_status);
        console.log(getStatus);

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
                "isWalkIn": getStatus[0].isWalkIn,
            }).then(response => {
                console.log(response.data);
            });
            this.setState({
                showWalkIn: true,
                booking_bookings: '',
                cus_name: '',
                cus_phone: '',
                cus_amounts: '',
            })
        }
        // Admin Uodate Booking to Check Out
        else if (getStatus[0].id === 2) {
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
                    admin_bookings: '',
                    dateName: '',
                    datePhone: '',
                    dateAmount: '',
                    dateTime: '',
                    id_status: ''
                })
                this.onFindBooking();
            });
        }

    }

    render() {
        return (
            <div className="form-admin-walkIn">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="col">
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
                                                        <option id="dr" key={'brand' + i} value={item.name}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="cun-bk">{'|'}</div>
                                            <div className="select-style-walkIn" style={{ marginLeft: '10px' }}>
                                                <b>Walk In</b>
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
                                                                        value={this.state.dateName || ''}
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
                                                                        value={this.state.datePhone || ''}
                                                                        onChange={(e) => { this.onChangePhoneCus(e) }} />
                                                                </p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="booking-amount-cus">
                                                            <form className="from-amount-cus-input">
                                                                <p>
                                                                    <label className="text-booking">จำนวนลูกค้า :</label>
                                                                    <input className="w3-input" style={{ color: 'white' }} type="text" id="amount-cus"
                                                                        value={this.state.dateAmount || ''}
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

                            <Modal className="from-popup-booking-Update" show={this.state.showUpdate}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-booking-Update">
                                    <Modal.Header closeButton className="from-popup-style-Update-booking">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Update Complete</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="body-text-booking-Update">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-Walk"></FontAwesomeIcon> <br />
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

                            <Modal className="from-popup-success" show={this.state.showWalkIn}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-success">
                                    <Modal.Header closeButton className="from-popup-style-add">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Success</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style">
                                        <div className="body-text-success">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-Walk"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Chivo Mono' }}>Walk In
                                                <b style={{ fontFamily: 'Noto Serif Thai', marginLeft: '10px' }}>สำเร็จ</b>
                                            </b>
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
            </div>
        );
    }
}

export default AdminWalkIn;
