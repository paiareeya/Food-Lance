import { Component } from "react";
import '../styles/Booking.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { Modal } from "react-bootstrap";
import Constants from '../constants'; import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation, faSquareFull, faStop } from '@fortawesome/free-solid-svg-icons'


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
            id: "",
            name: '',
            id_teble: '',
            name_table: '',
            status_bk: '',
            status_checkin: '',
            status_walkin: '',
            datalist: [],
            selectOptions: [],
            list_bookings: [],
            list_time: [],
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

        const set_time = this.state.list_time.filter(item => item.bktime === e.target.value)
        console.log('set_time', set_time[0].bktime);

        axios.post(Constants.URL + Constants.API.BOOKING.FIND_ONE_BOOKING, {
            "bktable": this.state.name_table,
            "bktime": e.target.value,
        }).then(response => {

            if (response.data[0] && response.data[0].bkstatus !== undefined) {
                this.setState({
                    status_bk: response.data[0].bkstatus,
                    status_checkin: response.data[0].checkin
                })
            } else {
                this.setState({
                    status_bk: '',
                    status_checkin: ''
                })
            }
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
            id_teble: bktable,
            status_walkin: '',
            status_bk: '',
            time: ''
        });
        console.log('bktable', bktable);

        axios.post(Constants.URL + Constants.API.BOOKING.FIND_WALKIN, {
            "bktable": bktable
        }).then(response => {
            const BK = response.data
            console.log('BK', BK.walkin);

            if (BK && BK.walkin !== undefined) {
                this.setState({
                    status_walkin: BK.walkin,
                })
            } else {
                this.setState({
                    status_bk: '',
                    status_checkin: '',
                    status_walkin: ''
                })
            }
        });
    }

    onGetBooking = () => {
        console.log(this.state.time);
        const BK_name = this.state.name_table;
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
            status_bk: '',
        })
        this.onFindBooking();
    }

    render() {
        return (
            <div className="from-booking">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="col">
                                <div className="row-table">
                                    <div className="col-table-top">
                                        <div onClick={() => { this.ClickTeble('A1') }}
                                            className={this.state.id_teble === 'A1' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A1</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A1' || this.state.status_walkin && this.state.id_teble === 'A1' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A1' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                            </div>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A2') }}
                                            className={this.state.id_teble === 'A2' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A2</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A2' || this.state.status_walkin && this.state.id_teble === 'A2' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A2' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                            </div>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A3') }}
                                            className={this.state.id_teble === 'A3' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A3</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A3' || this.state.status_walkin && this.state.id_teble === 'A3' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A3' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faSquareFull} className="icon-faSquareFull-1-3"></FontAwesomeIcon>
                                                            </div>
                                                            <div className="col-icons1-3">
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                                <FontAwesomeIcon icon={faStop} className="icon-faStop-1-3"></FontAwesomeIcon>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A4') }}
                                            className={this.state.id_teble === 'A4' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A4</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A4' || this.state.status_walkin && this.state.id_teble === 'A4' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A4' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A5') }}
                                            className={this.state.id_teble === 'A5' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A5</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A5' || this.state.status_walkin && this.state.id_teble === 'A5' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A5' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A6') }}
                                            className={this.state.id_teble === 'A6' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A6</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A6' || this.state.status_walkin && this.state.id_teble === 'A6' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A6' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
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
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A7'
                                                        || this.state.status_walkin && this.state.id_teble === 'A7' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A7' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A8') }}
                                                className={this.state.id_teble === 'A8' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A8</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A8'
                                                        || this.state.status_walkin && this.state.id_teble === 'A8' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A8' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A9') }}
                                                className={this.state.id_teble === 'A9' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A9</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A9'
                                                        || this.state.status_walkin && this.state.id_teble === 'A9' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A9' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A10') }}
                                                className={this.state.id_teble === 'A10' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                                <div className="card-body body-table">
                                                    <label>A10</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A10'
                                                        || this.state.status_walkin && this.state.id_teble === 'A10' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A10' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-col-table">
                                            <div onClick={() => { this.ClickTeble('A11') }}
                                                className={this.state.id_teble === 'A11' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A11</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A11'
                                                        || this.state.status_walkin && this.state.id_teble === 'A11' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A11' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A12') }}
                                                className={this.state.id_teble === 'A12' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A12</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A12'
                                                        || this.state.status_walkin && this.state.id_teble === 'A12' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A12' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A13') }}
                                                className={this.state.id_teble === 'A13' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A13</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A13'
                                                        || this.state.status_walkin && this.state.id_teble === 'A13' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A13' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => { this.ClickTeble('A14') }}
                                                className={this.state.id_teble === 'A14' ? "card card-table-top active-teble" : "card card-table-top"}>
                                                <div className="card-body body-table">
                                                    <label>A14</label>
                                                    {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A14'
                                                        || this.state.status_walkin && this.state.id_teble === 'A14' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                        </> :
                                                        this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A14' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                            <>
                                                                <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                            </> : //ถ้าไม่มีรูปจะทำ ull
                                                            <>
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
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-table-bottom">
                                        <div onClick={() => { this.ClickTeble('A15') }}
                                            className={this.state.id_teble === 'A15' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A15</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A15'
                                                    || this.state.status_walkin && this.state.id_teble === 'A15' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A15' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A16') }}
                                            className={this.state.id_teble === 'A16' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A16</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A16'
                                                    || this.state.status_walkin && this.state.id_teble === 'A16' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A16' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A17') }}
                                            className={this.state.id_teble === 'A17' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table card-17-18">
                                                <label>A17</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A17'
                                                    || this.state.status_walkin && this.state.id_teble === 'A17' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A17' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A18') }}
                                            className={this.state.id_teble === 'A18' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A18</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A18'
                                                    || this.state.status_walkin && this.state.id_teble === 'A18' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A18' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A19') }}
                                            className={this.state.id_teble === 'A19' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A19</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A19'
                                                    || this.state.status_walkin && this.state.id_teble === 'A19' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A19' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={() => { this.ClickTeble('A20') }}
                                            className={this.state.id_teble === 'A20' ? "card card-table-center-top active-teble" : "card card-table-center-top"}>
                                            <div className="card-body body-table">
                                                <label>A20</label>
                                                {this.state.status_bk && this.state.status_checkin && this.state.id_teble === 'A20'
                                                    || this.state.status_walkin && this.state.id_teble === 'A20' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
                                                    </> :
                                                    this.state.status_bk && this.state.status_checkin === undefined && this.state.id_teble === 'A20' ? // ถ้ามีรูป จะมาทำ tag <></> ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>จองแล้ว</b>
                                                        </> : //ถ้าไม่มีรูปจะทำ ull
                                                        <>
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
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="container">
                                <div className="row row-cols-1">
                                    <div className="col dropdown">
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
                                            <p style={{ fontFamily: 'Noto Serif Thai' }}>* มาช้าเกิน 20 นาที โต๊ะจะทำการยกเลิก</p>
                                            <Button className="booking-btn" variant="warning"
                                                onClick={(e) => this.onGetBooking()}>
                                                <b style={{ fontFamily: 'Noto Serif Thai' }}>ยืนยันการจอง</b>
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
        )
    }
}

export default Booking;