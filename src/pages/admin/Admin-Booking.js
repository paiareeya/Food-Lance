import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import '../../styles/Admin-Booking.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation, faSquareFull, faStop } from '@fortawesome/free-solid-svg-icons'
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
            dataBooking: [],
            data_qr: [],
            QR: '',
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
            ],
            table: [
                { name: 'A1' }, { name: 'A2' }, { name: 'A3' }, { name: 'A4' }, { name: 'A5' }, { name: 'A6' },
                { name: 'A7' }, { name: 'A8' }, { name: 'A9' }, { name: 'A10' },
                { name: 'A11' }, { name: 'A12' }, { name: 'A13' }, { name: 'A14' },
                { name: 'A15' }, { name: 'A16' }, { name: 'A17' }, { name: 'A18' }, { name: 'A18' }, { name: 'A20' },
            ],
            id_teble: '',
            name_table: ''
        }
    }

    componentDidMount() {
        this.onFindBooking();
        // this.qrCode();
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
        // console.log('get_time:', get_time);
        // console.log("name_table", this.state.name_table);

        if (this.state.admin_bookings === " " || get_time === " ") {
            return
        }

        axios.post(Constants.URL + Constants.API.BOOKING.FIND_ONE_BOOKING, {
            "bktable": this.state.name_table,
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
                data_qr: response.data,
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

    ClickTeble = (bktable) => {
        this.setState({
            name_table: bktable,
            id_teble: bktable
        });
        // console.log('bktable', bktable);

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

        const getList_booking = this.state.list_bookings.filter(item => item.name == this.state.name_table)

        const getStatus = this.state.status_booking.filter(item => item.id == this.state.id_status);

        // customer Create Booking to isBooking
        if (getStatus[0].id === 1) {
            const BK_name = this.state.name_table;
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
        // Admin Uodate Booking to Check In 
        else if (getStatus[0].id === 2) {
            axios.post(Constants.URL + Constants.API.BOOKING.UPDATE_BOOKING, {
                "_id": getId,
                "bktable": getBktable,
                "isCheckIn": getStatus[0].isCheckIn,
                "isCheckOut": getStatus[0].isCheckOut
            }).then(response => {
                console.log(response.data);

                const data = this.state.data_qr

                axios.post(Constants.URL + Constants.API.QR.CREATE_QR, {
                    "id": data[0]._id,
                    "tbname": data[0].bktable,
                }).then(response => {
                    console.log('qr', response.data);
                    this.setState({
                        QR: response.data,
                    })
                });

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
        // Admin Uodate Booking to Check Out
        else if (getStatus[0].id === 3) {
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
                    id_status: '',
                    dateTimeCheckIn: ''
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

    qrCode = (e) => {
        axios.post(Constants.URL + Constants.API.QR.CREATE_QR, {
            "id": "63e49a046b66738c02d6a1cf",
            "tbname": "A1"

        })
            .then(response => {
                console.log('qr', response.data);
                // this.setState({
                //     list_menu_moblie: response.data
                // })
            });
    }

    render() {
        return (
            <div className="from-admin-booking">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className="header-text">Booking</h1>
                            <div className="col">
                                <div className="row-table">
                                    <div className="col-table-top">
                                        <div onClick={() => { this.ClickTeble('A1') }}
                                            className={this.state.id_teble === 'A1' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A1</label>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                </div>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A2') }}
                                            className={this.state.id_teble === 'A2' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A2</label>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                </div>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A3') }}
                                            className={this.state.id_teble === 'A3' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A3</label>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                </div>
                                                <div className="col-icons1-3">
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A4') }}
                                            className={this.state.id_teble === 'A4' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A4</label>
                                                <div className="row-icons">
                                                    <div className="icon-left-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons4-6">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A5') }}
                                            className={this.state.id_teble === 'A5' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A5</label>
                                                <div className="row-icons">
                                                    <div className="icon-left-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons4-6">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A6') }}
                                            className={this.state.id_teble === 'A6' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A6</label>
                                                <div className="row-icons">
                                                    <div className="icon-left-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons4-6">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-4-6"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-4-6">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-4-6"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card card-toilet">
                                            <div className="card-body body-table">
                                                <label>Toilet</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-table-center">
                                        <div className="row-col-table">
                                            <div onClick={() => { this.ClickTeble('A7') }}
                                                className={this.state.id_teble === 'A7' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A7</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A8') }}
                                                className={this.state.id_teble === 'A8' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A8</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A9') }}
                                                className={this.state.id_teble === 'A9' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A9</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A10') }}
                                                className={this.state.id_teble === 'A10' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A10</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-col-table">
                                            <div onClick={() => { this.ClickTeble('A11') }}
                                                className={this.state.id_teble === 'A11' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A11</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A12') }}
                                                className={this.state.id_teble === 'A12' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A12</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A13') }}
                                                className={this.state.id_teble === 'A13' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A13</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A14') }}
                                                className={this.state.id_teble === 'A14' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A14</label>
                                                    <div className="row-icons">
                                                        <div className="icon-left-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-left-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-7-10">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-7-10"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="icon-rigth-7-10">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-7-10"></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-table-bottom">
                                        <div onClick={() => { this.ClickTeble('A15') }}
                                            className={this.state.id_teble === 'A15' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A15</label>
                                                <div className="row-icons">
                                                    <div className="icon-left-15-16">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-15-16"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons-15-16">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-15-16"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-15-16">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-15-16"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A16') }}
                                            className={this.state.id_teble === 'A16' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A16</label>
                                                <div className="row-icons">
                                                    <div className="icon-left-15-16">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-15-16"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons-15-16">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-15-16"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-15-16">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-15-16"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-15-16"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A17') }}
                                            className={this.state.id_teble === 'A17' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table card-17-18">
                                                <label>A17</label>
                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                <div className="row-icons">
                                                    <div className="icon-left-17-18">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons-17-18">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-17-18"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-17-18">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-17-18"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A18') }}
                                            className={this.state.id_teble === 'A18' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A18</label>
                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                <div className="row-icons">
                                                    <div className="icon-left-17-18">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="col-icons-17-18">
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-17-18"></FontAwesomeIcon>
                                                    </div>
                                                    <div className="icon-rigth-17-18">
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-17-18"></FontAwesomeIcon>
                                                        <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-17-18"></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-left-17-18"></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A19') }}
                                            className={this.state.id_teble === 'A19' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A19</label>
                                                <div className="row-icons">
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-left-19-20"></FontAwesomeIcon>
                                                    <span>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-19-20"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                        </div>
                                                    </span>
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-19-20"></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A20') }}
                                            className={this.state.id_teble === 'A20' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A20</label>
                                                <div className="row-icons">
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-left-19-20"></FontAwesomeIcon>
                                                    <span>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-19-20"></FontAwesomeIcon>
                                                        </div>
                                                        <div className="col-icons-19-20">
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                            <FontAwesomeIcon icon={faStop} className="icon-faStop-19-20"></FontAwesomeIcon>
                                                        </div>
                                                    </span>
                                                    <FontAwesomeIcon icon={faStop} className="icon-faStop-rigth-19-20"></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-7 col-md-4">
                            <div className="col">
                                <div className="from-admin-booking-center">
                                    <div className="row row-cols-1">
                                        <div className="col dropdown-booking">
                                            <div className="select-style-admin-booking">
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
                                    <Modal.Body className="from-popup-style-Update">
                                        <div className="body-text-booking-Update">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-booking"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Chivo Mono' }}>Congats! Your Update successfully done</b>
                                            {this.state.QR ?
                                                (<>
                                                    <p>QR CODE</p>
                                                    {this.state.QR ?
                                                        (<>
                                                            <img
                                                                id="imgMenuDetail"
                                                                src={this.state.QR}
                                                                alt="QR"
                                                                className="li-image-qr"
                                                            />
                                                        </>) :
                                                        (<>
                                                            <span className="text-qr">
                                                                <p>NO QR</p>
                                                            </span>
                                                        </>)
                                                    }
                                                </>) : null}
                                            <a className="download_qr" download="QR.png" href={this.state.QR}>Download QR</a>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="from-popup-style-Update">
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