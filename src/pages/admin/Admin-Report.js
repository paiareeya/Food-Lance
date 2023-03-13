import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import '../../styles/Admin-Report.css';
import axios from 'axios';
import Constants from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation, faSquareFull, faStop } from '@fortawesome/free-solid-svg-icons'


class AdminReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showListMenu: false,
            testLists: [
                {
                    booking: 'A1',
                    amount_cus: 6,
                    list_menu: 'เนื้อ หมู',
                    price: 1200,
                    check_in: '18:30',
                    sum_prices: 1200
                },
                {
                    booking: 'A2',
                    amount_cus: 3,
                    list_menu: 'เนื้อ หมู ผัก',
                    price: 690,
                    check_in: '18:30',
                    sum_prices: 690
                },
                {
                    booking: 'A3',
                    amount_cus: 2,
                    list_menu: 'เนื้อ หมู ผัก ผลไม้',
                    price: 590,
                    check_in: '20:10',
                    sum_prices: 590
                }
            ],
            Totals: '',
            date: '',
            date_to: '',
            admin_bookings: '',
            // dateAmount: '',
            dateTimeCheckIn: '',
            list_bookings: [],
            get_dataBooking: [],
            list_orders: [],
            list_all_orders: [],
            list_report: [],
        }
    }

    componentDidMount() {
        this.onFindBooking();
    }
    handleClose = () => {
        this.setState({
            showListMenu: false
        })
    }
    onChangeDate = (e) => {
        this.setState({ date: e.target.value })
    }
    onChangeDateTo = (e) => {
        this.setState({ date_to: e.target.value })
    }
    onChangeBooking = (e) => {
        this.setState({ admin_bookings: e.target.value });
        // console.log(e.target.value);

        if (e.target.value === " ") {
            return
        }
        axios.post(Constants.URL + Constants.API.BOOKING.BOOKINGS, {
            "bktable": e.target.value
        }).then(response => {
            // console.log('response:', response.data);
            const getlist = response.data
            const name = response.data.map(({ bkname }) => bkname)
            const phone = response.data.map(({ bknumber }) => bknumber)
            const amount = response.data.map(({ bkcustomer }) => bkcustomer)
            const time = response.data.map(({ bktime }) => bktime)
            const time_checkIn = response.data.map(({ checkin }) => checkin)

            const Moment = require("moment-timezone")
            const checkIn = time_checkIn[0] == undefined ? "" : Moment(time_checkIn, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm"); //format("DD/MM/yyyy HH:mm") สิ่งที่เราต้องการที่จะได้ ถ้าอยากได้แค่เวลา ใส่แค่ HH:mm

            const send_time = response.data.map((val) => {
                const get_checkIn = val.checkin == undefined ? "" : Moment(val.checkin, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm");

                return {
                    ...val,
                    checkin: get_checkIn,
                }
            })

            // console.log('name:', name, 'phone:', phone, 'amount:', amount);
            this.setState({
                get_dataBooking: send_time,
                // dateTime: time,
                dateTimeCheckIn: checkIn,
                // dateName: name,
                // datePhone: phone,
                // dateAmount: amount,
            })
        });
    }

    onClickSearch = (e) => {
        this.setState({
            date: this.state.date,
            date_to: this.state.date_to
        })
        console.log(this.state.date);
        console.log(this.state.date_to);

        axios.post(Constants.URL + Constants.API.REPORT.FIND_REPORT, {
            "start": this.state.date,
            "end": this.state.date_to,
            "bktable": this.state.admin_bookings
        }).then(response => {
            console.log('FIND_REPORT:', response.data.bookingOrders)

            // const time_checkIn = response.data.bookingOrders.map(({ checkIn }) => checkIn)

            const Moment = require("moment-timezone")
            // const checkIn = time_checkIn[0] == undefined ? "" : Moment(time_checkIn, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm"); //format("DD/MM/yyyy HH:mm") สิ่งที่เราต้องการที่จะได้ ถ้าอยากได้แค่เวลา ใส่แค่ HH:mm
            // console.log('checkIn', checkIn);
            const send_time = response.data.bookingOrders.map((val) => {
                const get_checkIn = val.checkIn == undefined ? "" : Moment(val.checkIn, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm");
                const get_checkOut = val.checkOut == undefined ? "" : Moment(val.checkOut, "yyyy-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Bangkok").format("HH:mm");
                return {
                    ...val,
                    checkIn: get_checkIn,
                    checkOut: get_checkOut
                }
            })
            // console.log('send_time', send_time);
            this.setState({
                list_report: send_time,
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

        axios.post(Constants.URL + Constants.API.ORDERS.FIND_ALL_ORDER)
            .then(response => {
                // console.log('FIND_ALL_ORDER:', response.data)
                this.setState({
                    list_all_orders: response.data
                })

            });
    }



    onClickListMenu = () => {
        axios.post(Constants.URL + Constants.API.ORDERS.GET_ORDERS,
        ).then(response => {
            // console.log('response:', response.data)

            const BK = this.state.admin_bookings
            const getBK = this.state.list_all_orders.filter(item => item.tbname === BK)
            console.log('getBK:', getBK)
            // const name = response.data.map(({ bkname }) => bkname)

            // const getMenuTrue = response.data.map((item) => {
            //     const orders = item.order.map((order) => {
            //         return {
            //             ...order,
            //             getOrderStatus: false
            //         }
            //     })
            //     return {
            //         ...item,
            //         orders: orders
            //     }

            // })
            // console.log('getMenuTrue:', getMenuTrue)
            this.setState({
                list_orders: getBK
            })

        });
        this.setState({
            showListMenu: true
        })
    }
    // getTotal = () => {
    //     const totals = 0;
    //     this.state.testLists.map(item => {
    //         totals = totals + item.sum_prices;
    //     })
    //     this.setState({
    //         Totals: totals
    //     })
    // }

    render() {
        return (
            <div className="from-admin-report">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col report-header col-dates">
                            <form className="form-date">
                                <label htmlFor="date">Date:</label>
                                <input type="date" id="date" name="date"
                                    value={this.state.date}
                                    onChange={(e) => { this.onChangeDate(e) }} />
                            </form>
                            <form className="form-date-to">
                                <label htmlFor="date">To:</label>
                                <input type="date" id="date" name="date"
                                    value={this.state.date_to}
                                    onChange={(e) => { this.onChangeDateTo(e) }} />
                            </form>
                            <label className="text-bk">โต๊ะ:</label>
                            <div className="select-style-report" style={{ marginLeft: '10px' }}>
                                <select value={this.state.admin_bookings}
                                    onChange={(e) => { this.onChangeBooking(e) }} >
                                    <option id="list-bk" value={' '} >
                                        เลือกโต๊ะ
                                    </option>
                                    {this.state.list_bookings.map((item, i) => (
                                        <option id="list-bk" key={'brand' + i} value={item.name} style={{ fontFamily: 'Chivo Mono', backgroundColor: 'white' }}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Button className="btn-search-date" variant="primary"
                                onClick={() => { this.onClickSearch() }}>
                                ค้นหา
                            </Button>
                        </div>
                        <div className="col report-body">
                            <div className="card text-center card-report">
                                <div className="card-header header-report">
                                    <div className="row row-cols-6">
                                        <div className="col header-text-thai">โต๊ะ</div>
                                        <div className="col header-text-thai">จำนวนคน</div>
                                        <div className="col header-text-thai">รายการเมนู</div>
                                        {/* <div className="col header-text-thai">ราคา</div> */}
                                        <div className="col text-header-report">
                                            <p className="header-text-thai">เวลา</p> <label>Check In</label>
                                        </div>
                                        <div className="col text-header-report">
                                            <p className="header-text-thai">เวลา</p> <label>Check Out</label>
                                        </div>
                                        <div className="col header-text-thai">ราคารวม</div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush"
                                    >
                                        {this.state.list_report.map((item, i) =>
                                            item.customerTable === this.state.admin_bookings ?
                                                <>
                                                    <li className="list-group-item list-repoet" key={'listOrder' + i}>
                                                        <span className="text-list-report">{item.customerTable}</span>
                                                        <span className="text-list-report">{item.customerName}</span>
                                                        <span className="header-text-thai" onClick={() => { this.onClickListMenu() }}>
                                                            {'เมนูทั้งหมด'}
                                                        </span>
                                                        {/* <span className="text-list-report">{' '}</span> */}
                                                        <span className="text-list-report">{item.checkIn}</span>
                                                        <span className="text-list-report">{item.checkOut}</span>
                                                        <span className="text-list-report">{' '}</span>
                                                    </li>
                                                </> : null
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col report-footer">
                            <div className="card card-report-footer">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-10">
                                            <h6 className="card-title-tital">Total</h6>
                                        </div>
                                        <div className="col-2">
                                            {this.state.Totals}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal className="from-popup-listmenu" show={this.state.showListMenu}
                            onHide={() => { this.handleClose() }}>
                            <div className="from-popup-style-success">
                                <Modal.Header closeButton className="from-popup-style">
                                    <Modal.Title><b style={{ fontFamily: 'Chivo Mono' }}>List Menu</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="from-popup-style-listmenu">
                                    <div className="body-text-success">
                                        {this.state.list_report.map((item, i) =>
                                            <li className="list-group-item" key={'order' + i}>
                                                <div className="card-body show-list-menu">
                                                    <ul className="list-group list-group-flush ul-list-order-kitchen">
                                                        {item.customerOrders.map((list, ii) =>
                                                            <li className="list-group-item li-list-order-admin" key={'list' + ii} >
                                                                <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" className="li-image" />
                                                                <span style={{ fontFamily: 'Noto Serif Thai', color: '#000814' }}>{list.title}</span>
                                                                <span style={{ fontFamily: 'Chivo Mono', color: '#000814' }}>{list.total}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </li>
                                        )}

                                        {/* <li className="list-group-item">
                                            <div className="card-body show-list-menu">
                                                <ul className="list-group list-group-flush ul-list-order-kitchen">
                                                    {this.state.list_orders.map((list, ii) =>
                                                        list.tbname === this.state.admin_bookings ?
                                                            <>
                                                                <li className="list-group-item li-list-order-admin" key={'list' + ii} >
                                                                    <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" className="li-image" />
                                                                    <span style={{ fontFamily: 'Noto Serif Thai', color: '#000814' }}>{list.menuName}</span>
                                                                    <span style={{ fontFamily: 'Chivo Mono', color: '#000814' }}>{list.total}</span>
                                                                    <span style={{ fontFamily: 'Chivo Mono', color: '#000814' }}>{'Price'}</span>
                                                                </li>
                                                            </> : null
                                                    )}
                                                </ul>
                                            </div>
                                        </li> */}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="from-popup-style-listmenu-Footer">
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
        );
    }
}

export default AdminReport;