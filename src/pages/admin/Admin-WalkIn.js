import { Component } from "react";
import '../../styles/Admin-WalkIn.css';
import { Button, Modal } from "react-bootstrap";
import Constants from '../../constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation, faSquareFull, faStop } from '@fortawesome/free-solid-svg-icons'

class AdminWalkIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddBooking: false,
            showUpdate: false,
            showSuccess: false,
            showWalkIn: false,
            showFaill: false,
            showQr: false,
            admin_bookings: '',
            dateName: '',
            datePhone: '',
            dateAmount: '',
            time: '',
            dateTime: '',
            id_teble: '',
            name_table: '',
            status_walkin: '',
            QR: '',
            list_bookings: [],
            get_dataBooking: [],
            walkin_bookings: [],
            dataBooking: [],
            data_qr: [],
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
            ],

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
            showFaill: false,
            showQr: false,
        })
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

    ClickTeble = (bktable) => {
        this.setState({
            name_table: bktable,
            id_teble: bktable,
            status_walkin: ''
        });

        axios.post(Constants.URL + Constants.API.BOOKING.FIND_WALKIN, {
            "bktable": bktable
        })
            .then(response => {
                const BK = response.data
                console.log('BK', BK);
                console.log('id_teble', this.state.id_teble);

                if (BK !== undefined) {
                    this.setState({
                        status_walkin: BK,
                        get_dataBooking: BK,
                        walkin_bookings: BK,
                        dateName: BK.bkname,
                        datePhone: BK.bknumber,
                        dateAmount: BK.bkcustomer
                    })
                }
            });
    }

    UploadBooking = () => {
        const get = this.state.get_dataBooking;
        const getList_booking = this.state.list_bookings.filter(item => item.name == this.state.name_table)
        const getId = get._id
        const getBktable = get.bktable
        console.log('getId', getId);
        console.log('getBktable', getBktable);
        // console.log('this.state.status_booking', this.state.status_booking[0].id);
        const getStatus = this.state.status_booking.filter(item => item.id == this.state.id_status);
        console.log(getStatus);

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
                "isWalkIn": getStatus[0].isWalkIn,
            }).then(response => {
                console.log(response.data);

                const data = response.data
                console.log('data', data);
                console.log('QR_id', data._id);
                console.log('QR_name', data.bktable);


                axios.post(Constants.URL + Constants.API.QR.CREATE_QR, {
                    "id": data._id,
                    "tbname": data.bktable,
                }).then(response => {
                    console.log('qr', response.data);
                    this.setState({
                        QR: response.data,
                        // showQr: true
                    })
                });

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
                            <h1 className="header-text">Walk In</h1>
                            <div className="col">
                                <div className="row-table">
                                    <div className="col-table-top">
                                        <div onClick={() => { this.ClickTeble('A1') }}
                                            className={this.state.id_teble === 'A1' ? "card card-table-top active-teble" : "card card-table-top"}>
                                            <div className="card-body body-table">
                                                <label>A1</label>
                                                {this.state.status_walkin && this.state.id_teble === 'A1' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A2' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A3' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A4' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A5' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A6' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A7' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A8' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A9' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A10' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A11' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A12' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A13' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                    {this.state.status_walkin && this.state.id_teble === 'A14' ?
                                                        <>
                                                            <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A15' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A16' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A17' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A18' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A19' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                                                {this.state.status_walkin && this.state.id_teble === 'A20' ?
                                                    <>
                                                        <b style={{ fontFamily: 'Noto Serif Thai', fontSize: '13px', color: 'white' }}>กำลังใช้</b>
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
                        <div className="col-7 col-md-4">
                            <div className="col">
                                <div className="from-admin-booking-center">
                                    <div className="row row-cols-1">
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
                                    <Modal.Body className="from-popup-style-Update">
                                        <div className="body-text-booking-Update">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-Walk"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Chivo Mono' }}>Congats! Your Update successfully done</b>
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

                            <Modal className="from-popup-walkIn" show={this.state.showWalkIn}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-walkIn">
                                    <Modal.Header closeButton className="from-popup-style-walkIn">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>Success</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style-walkIn">
                                        <div className="body-text-success">
                                            <FontAwesomeIcon icon={faCircleCheck} className="icon-faCircleCheck-Walk"></FontAwesomeIcon> <br />

                                            <b className="text-walkIn" style={{ fontFamily: 'Chivo Mono' }}>Walk In
                                                <b style={{ fontFamily: 'Noto Serif Thai', marginLeft: '10px' }}>สำเร็จ</b>
                                            </b>
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
                                            <a className="download_qr" download="QR.png" href={this.state.QR}>Download QR</a>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="from-popup-style-walkIn">
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

                            <Modal className="from-popup-booking-qr" show={this.state.showQr}
                                onHide={() => { this.handleClose() }}>
                                <div className="from-popup-style-booking-qr">
                                    <Modal.Header closeButton className="from-popup-style-add-booking-qr">
                                        <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>QR</b></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="from-popup-style-qr">
                                        <div className="body-text-success">
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
                                                    <p>NO QR</p>
                                                </>)
                                            }
                                            {/* <FontAwesomeIcon icon={faCircleExclamation} className="CircleExclamation"></FontAwesomeIcon> <br />
                                            <b style={{ fontFamily: 'Noto Serif Thai' }}>กรุณาเลือกโต๊ะ</b> */}
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="from-popup-style-qr">
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
