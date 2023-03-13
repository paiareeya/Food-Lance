import { Component } from "react";
import '../styles/Basket.css';
import '../styles/style_mobile.scss';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Constants from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faUtensils } from '@fortawesome/free-solid-svg-icons'

class Basket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            list_orders: [],
            listMenu: [],
            listcategory: [],
            list_IDcategory: [],
            counts: '',
            status: '',
            name_menu: '',
            pathImgData: [],
            dataImg: '',
            dataImgName: '',
            ststus_orders: [
                {
                    id: 1,
                    name: 'กำลังเตรียม',
                    status: false
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
        console.log("get", get);

        if (get !== null) {
            this.setState({
                items: JSON.parse(get)
            },
                () => {
                    const bk_name = this.state.items[0]?.tbname;
                    console.log('bk_name', bk_name);
                    this.state.counts = this.state.items[0]?.total

                    const idBK = this.state.items[0]?.idBK;
                    console.log('id', idBK);

                    axios.post(Constants.URL + Constants.API.ORDERS.FIND_ORDER_BY_BK, {
                        "id": idBK,
                        "tbname": bk_name,
                    }).then(response => {
                        console.log(response.data);
                        this.setState({
                            list_orders: response.data
                        })

                        const getStatus_list = response.data.map(item => item.status === false);
                        console.log('getStatus_list', getStatus_list);
                        const getStatus = this.state.ststus_orders.filter(item => item.status === false);

                        if (getStatus[0].status === getStatus_list[0]) {
                            this.setState({
                                status: getStatus[0].name
                            })
                        } else {
                            this.setState({
                                status: "...."
                            })
                        }
                    });
                }
            )
        }
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

    handleImageRatio = e => {
        const imgId = e.target.id
        let width = e.target.naturalWidth
        let height = e.target.naturalHeight
        let ratio = 1

        if (width > height && width > this.imageWidth) {
            // Horizontal
            ratio = height / width
            width = this.imageWidth
            height = this.imageWidth * ratio
        } else if (width < height && height > this.imageHeight) {
            // Vertical
            ratio = width / height
            width = this.imageHeight * ratio
            height = this.imageHeight
        }

        if (imgId === 'imgMenuDetail') {
            this.setState({
                imgMenuWidth: width,
                imgMenuHeight: height
            })
        }
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
                                        <ul className="list-group list-group-flush list-order-basket" >
                                            {this.state.items.map((item, i) =>
                                                <li className="list-group-item list-items-basket" key={'menu' + i}>
                                                    <img
                                                        key={item._id}
                                                        id="imgMenuDetail"
                                                        src={item.image}
                                                        onLoad={this.handleImageRatio}
                                                        alt="img menu"
                                                        className="li-image-baket"
                                                    />
                                                    <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.title}</span>
                                                    <div className="basket-body-amount-mobile">
                                                        <div className="basket-amount-style">
                                                            <div className="container">
                                                                <div className="row row-cols-3">
                                                                    <div className="col"><Button className="amount-minus-style-mobile" variant="primary" onClick={() => { this.decrementCount(i) }}><b>-</b></Button></div>
                                                                    <div className="col text-amount">
                                                                        <h5 style={{ fontFamily: 'Chivo Mono' }}>{item.total}</h5>
                                                                    </div>
                                                                    <div className="col"><Button className="amount-plus-style-mobile" variant="primary" onClick={() => { this.incrementCount(i) }}><b>+</b></Button></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-footer">
                                        <Button className="btn-submit" variant="primary"
                                            onClick={() => { this.onClickAddMenu() }}>
                                            <b style={{ fontFamily: 'Noto Serif Thai' }}>ยืนยัน</b>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 show-list-menu">
                                <div className="status-order">
                                    <b style={{ fontFamily: 'Noto Serif Thai' }}>สถานะออเดอร์ :
                                        <span style={{ fontFamily: 'Noto Serif Thai', marginLeft: '10px', color: '#FFB703' }}>{this.state.status}</span>
                                    </b>
                                </div><br />
                                <ul className="list-group list-group-flush ul-list-order">

                                    {this.state.list_orders.map((item, i) =>
                                        <li className="list-group-item li-list-order" key={'order' + i}>
                                            {item.menuImg ?
                                                (<>
                                                    <img
                                                        key={item._id}
                                                        id="imgMenuDetail"
                                                        src={item.menuImg}
                                                        onLoad={this.handleImageRatio}
                                                        alt="img menu"
                                                        className="li-image-baket"
                                                    />
                                                </>) :
                                                (<>
                                                    <p>NO IMAGE</p>
                                                    {/* <img
                                                        key={item._id}
                                                        id="imgMenuDetail"
                                                        src={item.menuImg}
                                                        onLoad={this.handleImageRatio}
                                                        alt="img menu"
                                                        className="li-image-baket"
                                                    /> */}
                                                </>)
                                            }
                                            <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.munuName}</span>
                                            <span style={{ fontFamily: 'Chivo Mono' }}>{item.total}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="row_moblie">
                                <div className="list-items-order">
                                    <ul className="list-group list-group-flush list-order-basket" >
                                        {this.state.items.map((item, i) =>
                                            <li className="list-group-item list-items-basket" key={'list_order' + i}>
                                                {item.image ?
                                                    (<>
                                                        <img
                                                            key={item._id}
                                                            id="imgMenuDetail"
                                                            src={item.image}
                                                            onLoad={this.handleImageRatio}
                                                            alt="img menu"
                                                            className="li-image-mobile"
                                                        />
                                                    </>) :
                                                    null
                                                }
                                                <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.title}</span>
                                                <div className="basket-body-amount-mobile">
                                                    <div className="basket-amount-style">
                                                        <div className="container">
                                                            <div className="row row-cols-3">
                                                                <div className="col"><Button className="amount-minus-style-mobile" variant="primary" onClick={() => { this.decrementCount(i) }}><b>-</b></Button></div>
                                                                <div className="col text-amount">
                                                                    <h5 style={{ fontFamily: 'Chivo Mono' }}>{item.total}</h5>
                                                                </div>
                                                                <div className="col"><Button className="amount-plus-style-mobile" variant="primary" onClick={() => { this.incrementCount(i) }}><b>+</b></Button></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                    <div className="col">
                                        <div className="card-footer">
                                            <Button className="btn-submit" variant="primary"
                                                onClick={() => { this.onClickAddMenu() }}>
                                                <b style={{ fontFamily: 'Noto Serif Thai' }}>ยืนยัน</b>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-my-Items">
                                    <div className="card-basket-header">
                                        <h3>รายการของฉัน</h3>
                                    </div>
                                    <ul className="list-group list-group-flush list-order-basket" >
                                        {this.state.list_orders.map((item, i) =>
                                            item.status === true ?
                                                <li className="list-group-item list-items-basket-mobile" key={'list_order_mobile' + i}>
                                                    <div className="basket-mobile">
                                                        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                                                        <label className="label-success">เสร็จสิ้น</label>
                                                    </div>
                                                    {item.menuImg ?
                                                        (<>
                                                            <img
                                                                key={item._id}
                                                                id="imgMenuDetail"
                                                                src={item.menuImg}
                                                                onLoad={this.handleImageRatio}
                                                                alt="img menu"
                                                                className="li-image-mobile"
                                                            />
                                                        </>) :
                                                        null
                                                    }
                                                    {/* <img src={item.img} className="li-image-mobile" /> */}
                                                    <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.munuName}</span>
                                                    <span style={{ fontFamily: 'Chivo Mono' }}>{item.total}</span>
                                                </li>
                                                :
                                                <li className="list-group-item list-items-basket-mobile" key={'list_order_mobile' + i}>
                                                    <div className="basket-mobile">
                                                        <FontAwesomeIcon icon={faUtensils}></FontAwesomeIcon>
                                                        <label className="label-success">เตรียม</label>
                                                    </div>
                                                    {item.menuImg ?
                                                        (<>
                                                            <img
                                                                key={item._id}
                                                                id="imgMenuDetail"
                                                                src={item.menuImg}
                                                                onLoad={this.handleImageRatio}
                                                                alt="img menu"
                                                                className="li-image-mobile"
                                                            />
                                                        </>) :
                                                        null
                                                    }
                                                    {/* <img src={item.img} className="li-image-mobile" /> */}
                                                    <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.munuName}</span>
                                                    <span style={{ fontFamily: 'Chivo Mono' }}>{item.total}</span>
                                                </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Basket;