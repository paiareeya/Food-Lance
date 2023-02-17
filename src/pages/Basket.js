import { Component } from "react";
import '../styles/Basket.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Constants from '../constants';

class Basket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            list_orders: [],
            counts: '',
            status: '',
            ststus_orders: [
                {
                    id: 1,
                    name: 'กำลังเตรียม',
                    status: true
                }
            ]
        }

        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    incrementCount = (index) => {
        const plus = this.state.items
        plus[index].total = plus[index].total + 1
        this.setState({ items: plus });
    }
    decrementCount = (index) => {
        const minus = this.state.items
        const setTotal = this.state.items[index]
        if (setTotal.total == 1) {
            const setIdTotal = this.state.items.filter((item) => item.id != setTotal.id)
            console.log('setIdToal', setIdTotal);
            this.setState({ items: setIdTotal });
        }
        else if (minus[index].total > 1) {
            minus[index].total = minus[index].total - 1
            this.setState({ items: minus });
        }
    }

    componentDidMount() {
        this.getBasket()
    }

    getBasket = () => {
        const get = localStorage.getItem("setMenu");
        // let btn = true;

        if (get !== null) {
            this.setState({
                items: JSON.parse(get)
            },
                () => {
                    const bk_name = this.state.items[0]?.tbname;
                    this.state.counts = this.state.items[0]?.total

                    axios.post(Constants.URL + Constants.API.ORDERS.FIND_ORDER_BY_BK, {
                        "tbname": bk_name
                    }).then(response => {
                        this.setState({
                            list_orders: response.data
                        })

                        const getStatus_list = response.data.map(item => item.status === true);
                        const getStatus = this.state.ststus_orders.filter(item => item.status === true);

                        if (getStatus[0].status === getStatus_list[0]) {
                            console.log("true");
                            this.setState({
                                status: getStatus[0].name
                            })
                            // btn = false;
                        } else {
                            console.log("false");
                            this.setState({
                                status: "...."
                            })
                        }
                    });
                }
            )
        }
        // else {
        //     btn = false;
        // }
        // this.setState({ btn });
    }

    onClickAddMenu = () => {
        const get_list = this.state.items;
        get_list.forEach((item) => {
            if (item.tbname === item.tbname && item.title === item.title) {
                item.total = item.total;
            }
        });
        this.setState({ items: get_list });

        const payload =
        {
            "data": get_list
        }
        console.log("payload :", payload);
        axios.post(Constants.URL + Constants.API.ORDERS.CREATE_ORDER, payload
        ).then(response => {
            console.log('response: ', response.data);
            this.setState({
                items: []
            })
            localStorage.setItem("setMenu", JSON.stringify([]))
        });
        this.getBasket()
    }

    render() {
        // const { btn } = this.state;
        return (
            <div className="from-basket">
                <div className="card-basket">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="card-basket-header">
                                    <h3>รายการในตะกร้า</h3>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="col">
                                    <div className="card-body-basket">
                                        {this.state.items.map((item, i) =>
                                            <div className="row row-cols-3 list_orders" key={'menu' + i}>
                                                <div className="col">
                                                    <div className="basket-body-image">
                                                        <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="basket-body-name">
                                                        <h5 style={{ fontFamily: 'Noto Serif Thai' }}>{item.title}</h5>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="basket-body-amount">
                                                        <div className="basket-amount-style">
                                                            <div className="container">
                                                                <div className="row row-cols-3">
                                                                    <div className="col"><Button className="amount-minus-style" variant="primary" onClick={() => { this.decrementCount(i) }}><b>-</b></Button></div>
                                                                    <div className="col text-amount">
                                                                        <h4 style={{ fontFamily: 'Chivo Mono' }}>{item.total}</h4>
                                                                    </div>
                                                                    <div className="col"><Button className="amount-plus-style" variant="primary" onClick={() => { this.incrementCount(i) }}><b>+</b></Button></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-footer">
                                        {/* {!btn && (
                                            <Button className="btn-submit" variant="primary" onClick={() => { this.onClickAddMenu() }}>
                                                <b style={{ fontFamily: 'Noto Serif Thai' }}>ยืนยัน</b>
                                            </Button>
                                        )} */}
                                        <Button className="btn-submit" variant="primary"
                                            onClick={() => { this.onClickAddMenu() }}>
                                            <b style={{ fontFamily: 'Noto Serif Thai' }}>ยืนยัน</b>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 show-list-menu">
                                <ul className="list-group list-group-flush ul-list-order">
                                    <div className="status-order">
                                        <b style={{ fontFamily: 'Noto Serif Thai' }}>สถานะออเดอร์ :
                                            <span style={{ fontFamily: 'Noto Serif Thai', marginLeft: '10px', color: '#FFB703' }}>{this.state.status}</span>
                                        </b>
                                    </div><br />
                                    {this.state.list_orders.map((item, i) =>
                                        <li className="list-group-item li-list-order" key={'order' + i}>
                                            <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" className="li-image" />
                                            <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.title}</span>
                                            <span style={{ fontFamily: 'Chivo Mono' }}>{item.total}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Basket;