import { Component } from "react";
import '../styles/Menu.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Constants from '../constants';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            list_menu: [],
            listCategory: [],
            Category_Menu: '',
            list_popUp: [],
            count: 1,
            get_menu: [],
        }

        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    componentDidMount() {
        this.GetCategory();
    }

    handleClose = () => {
        this.setState({
            show: false,
            count: 1
        });
    }
    handleShow = () => {
        this.setState({ show: true });
    }

    onChangeCategory = (e) => {
        this.setState({ Category_Menu: e.target.value });

        this.onGetCategory(e.target.value)
    }

    onGetCategory = (items) => {

        console.log('items', items);
        axios.post(Constants.URL + Constants.API.MENUS.CATEGORY_MENU,
            { "category_id": items })
            .then(response => {
                console.log('response.data: ', response.data);
                this.setState({
                    list_menu: response.data
                })

            });
    }

    GetCategory = () => {
        axios.post(Constants.URL + Constants.API.CATEGORY.FIND_CATEGORY)
            .then(response => {
                const showC = response.data
                const result = showC.filter(item => item.status === true);
                this.setState({
                    listCategory: response.data
                })
                this.onGetCategory(result[0].category_id)
            });
    }

    onClickMenu = (item) => {
        console.log(item);

        this.setState({
            show: true,
            list_popUp: item
        });
    }

    // เพิ่ม-ลด จำนวน
    incrementCount() {
        this.setState({ count: this.state.count + 1 });
    }
    decrementCount() {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 });
        }
    }

    onClickAddMenu = () => {

        const get = this.state.get_menu
        get.push({
            id: this.state.list_popUp._id,
            tbname: 'A1',
            // image: '',
            title: this.state.list_popUp.title,
            total: this.state.count,
        })
        console.log('get', get);

        this.setState({
            get_menu: get,
            show: false
        });

        const list_orders = localStorage.getItem("setMenu");
        let arr_list = []
        if (list_orders !== null) {
            const get_list = JSON.parse(list_orders)
            console.log("get_list", get_list);

            const found = get_list.findIndex(element => element.id == this.state.list_popUp._id);
            console.log("found: ", found);
            console.log("this.state.list_popUp._id", this.state.list_popUp._id);

            if (found > -1) {
                const count = get_list[found].total
                get_list[found].total = count + this.state.count;
                arr_list = get_list;
            } else {
                get_list.push({
                    id: this.state.list_popUp._id,
                    tbname: 'A1',
                    // image: '',
                    title: this.state.list_popUp.title,
                    total: this.state.count,
                });
                arr_list = get_list;
            }

        } else {
            arr_list = get
        }

        localStorage.setItem("setMenu", JSON.stringify(arr_list));
        console.log('arr_list', arr_list);
    }

    render() {
        return (
            <div className="from-menu">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="select-style">
                                <select onChange={(e) => { this.onChangeCategory(e) }} >
                                    <option id="dr" value={' '}>
                                        เลือกหมวดหมู่
                                    </option>
                                    {this.state.listCategory.map((item, i) =>
                                        item.status && (
                                            <option id="dr" key={'brand' + i} value={item.category_id}>
                                                {item.category_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="from-listMenu">
                                <div className="container">
                                    <div className="row row-cols-6">
                                        {this.state.list_menu.map((item, i) =>
                                            <div className="col col-list-menu" key={'menu' + i}>
                                                <div className="card card-body-menu" onClick={() => { this.onClickMenu(item) }}>
                                                    <img src="https://th.bing.com/th/id/R.3d608319942ed6b4c98ac1bcbebc7076?rik=epwmnQcoUkuGgw&pid=ImgRaw&r=0" className="card-img-top" />
                                                    <div className="card-body" >
                                                        <h3 className="card-title-name">{item.title}</h3>
                                                        <label className="card-text-menu">หมวดหมู่: <b>{item.category}</b></label>
                                                    </div>
                                                </div><br />
                                            </div>
                                        )}
                                    </div>
                                    <Modal className="from-popup" show={this.state.show} onHide={() => { this.handleClose() }}>
                                        <div className="from-popup-style">
                                            <Modal.Header closeButton className="from-popup-style">
                                                <Modal.Title>เลือกรายการ</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="from-popup-style">
                                                <div className="popup-body">
                                                    <div className="container">
                                                        <div className="row row-cols-1">
                                                            <div className="col">
                                                                <div className="body-image">
                                                                    <img src="https://th.bing.com/th/id/R.3d608319942ed6b4c98ac1bcbebc7076?rik=epwmnQcoUkuGgw&pid=ImgRaw&r=0" className="card-img-top" />
                                                                    {/* <FontAwesomeIcon className="list-icon" icon={faCarrot}></FontAwesomeIcon> */}
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text-title">
                                                                    <h4>{this.state.list_popUp.title}</h4>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-amount">
                                                                    <div className="amount-style">
                                                                        <Button className="amount-minus" variant="primary" onClick={this.decrementCount}><b>-</b></Button>
                                                                        <h4>{this.state.count}</h4>
                                                                        <Button className="amount-plus" variant="primary" onClick={this.incrementCount}><b>+</b></Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="from-popup-style">
                                                <Button className="btn-footer" variant="primary" onClick={() => { this.onClickAddMenu() }}>
                                                    เพิ่มรายการ
                                                </Button>
                                            </Modal.Footer>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default Menu;
