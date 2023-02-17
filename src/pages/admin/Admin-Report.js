import { Component } from "react";
import { Button } from "react-bootstrap";
import '../../styles/Admin-Report.css';

class AdminReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
            date_to: ''
        }
    }

    onChangeDate = (e) => {
        this.setState({ date: e.target.value })
    }
    onChangeDateTo = (e) => {
        this.setState({ date_to: e.target.value })
    }

    onClickSearch = (e) => {
        this.setState({
            date: this.state.date,
            date_to: this.state.date_to
        })
        console.log(this.state.date);
        console.log(this.state.date_to);
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
                                        <div className="col header-text-thai">ราคา</div>
                                        <div className="col text-header-report">
                                            <p className="header-text-thai">เวลา</p> <label>Check In</label>
                                        </div>
                                        <div className="col header-text-thai">ราคารวม</div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush"
                                    >
                                        {this.state.testLists.map((item, i) =>
                                            <li className="list-group-item list-repoet"
                                                key={'category' + i}>
                                                <span className="text-list-report">{item.booking}</span>
                                                <span className="text-list-report">{item.amount_cus}</span>
                                                <span className="header-text-thai">{item.list_menu}</span>
                                                <span className="text-list-report">{item.price}</span>
                                                <span className="text-list-report">{item.check_in}</span>
                                                <span className="text-list-report">{item.sum_prices}</span>
                                            </li>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminReport;