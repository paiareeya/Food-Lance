import { Component } from "react";
import '../../styles/Admin-Orders.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Constants from '../../constants';

class AdminOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list_orders: [],
            MenuTrue: []
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        axios.post(Constants.URL + Constants.API.ORDERS.GET_ORDERS,
        ).then(response => {
            console.log('response:', response.data)
            const getMenuTrue = response.data.map((item) => {
                const orders = item.order.map((order) => {
                    return {
                        ...order,
                        getOrderStatus: false
                    }
                })
                return {
                    ...item,
                    orders: orders
                }

            })
            // console.log('getMenuTrue:', getMenuTrue)
            this.setState({
                list_orders: getMenuTrue
            })

        });
    }

    onClickCheckBoxMenu = (indexBK, index) => {
        console.log('indexBK:', indexBK);
        console.log('index:', index);
        const list_meunu = this.state.list_orders
        // console.log('list_meunu:', list_meunu);

        const item = list_meunu[indexBK].orders[index].getOrderStatus;
        list_meunu[indexBK].orders[index].getOrderStatus = !item

        this.setState({
            list_orders: list_meunu
        })

    }

    onClickUpdateOrder = (menu) => {
        const sed_order = menu.orders
        let arr_id = []

        sed_order.map((item) => {
            if (item.getOrderStatus === true) {
                arr_id.push({ _id: item._id })
            }
        })

        const payload =
        {
            "data": arr_id
        }
        console.log(payload);
        axios.post(Constants.URL + Constants.API.ORDERS.UPDATE_ORDER, payload
        ).then(response => {
            console.log('response:', response.data)
            this.getOrders()
        });
    }

    render() {
        return (
            <div className="form-admin-kitchen">
                <div className="container">
                    <div className="row row-cols-4">
                        {this.state.list_orders.map((item, i) =>
                            <div className="col" key={'order' + i}>
                                <div className="card card-order-kitchen">
                                    <h5 className="card-header header-kitchen-bk">
                                        {item.tbname}
                                    </h5>
                                    <div className="card-body show-list-menu">
                                        <ul className="list-group list-group-flush ul-list-order-kitchen">
                                            {item.order.map((list, ii) =>
                                                <li className="list-group-item li-list-order-kitchen" key={'list' + ii} >
                                                    <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" className="li-image-kitchen" />
                                                    <span>{list.title}</span>
                                                    <span>{list.total}</span>
                                                    <input className="form-check-input me-1" type="checkbox" checked={list.getOrderStatus}
                                                        onChange={() => { this.onClickCheckBoxMenu(i, ii) }} />
                                                </li>
                                            )}
                                        </ul>
                                        <Button className="btn-kitchen-success" as="input" type="button" value="สำเร็จ"
                                            onClick={() => { this.onClickUpdateOrder(item) }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminOrders;