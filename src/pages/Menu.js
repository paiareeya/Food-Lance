import { Component } from "react";
import '../styles/Menu.css';
import '../styles/style_mobile.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
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
            list_menu_moblie: [],
            listCategory: [],
            get_menu: [],
            get_category: [],
            list_popUp: [],
            count: 1,
            Category_Menu: '',
            pathImgData: [],
            dataImg: '',
            dataImgName: '',
            tbname: '',
            id_tbname: '',

        }

        this.IMAGE_MAX_WIDTH = '100'
        this.IMAGE_MAX_HEIGHT = '100'
        this.IMAGE_MIN_WIDTH = '100'
        this.IMAGE_MIN_HEIGHT = '100'
        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    componentDidMount() {
        this.GetCategory();
        this.GetMenu()

        const queryParameters = new URLSearchParams(window.location.search)
        const id = queryParameters.get("id")
        const tbname = queryParameters.get("tbname")

        console.log('id', id, 'tbname', tbname);

        this.setState({
            id_tbname: id,
            tbname: tbname
        })

        // this.qrCode()
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
        console.log(e.target.value);
        this.onGetCategory(e.target.value)
    }

    onClickCategory = (item_id) => {
        this.setState({ Category_Menu: item_id });
        // console.log(item_id);

        // console.log('list_menu_moblie', this.state.list_menu_moblie);

        axios.post(Constants.URL + Constants.API.MENUS.FIND_MENU)
            .then(response => {
                // console.log('listMenu', response.data);
                const filteredList = response.data.filter(item => item.category_id === item_id.category_id);
                // console.log('get_id', filteredList);

                this.setState({
                    list_menu_moblie: filteredList
                });
            });

        // const filteredList = this.state.list_menu_moblie.filter(item => item.category_id === item_id.category_id);
        // console.log('get_id', filteredList);

        // this.setState({
        //     list_menu_moblie: filteredList
        // })
    }


    onGetCategory = (items) => {

        console.log('items', items);

        this.setState({
            get_category: items
        })
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
                console.log('listCategory', response.data);
                this.setState({
                    listCategory: response.data
                })
                this.onGetCategory(result[0].category_id)
            });
    }

    GetMenu = () => {
        axios.post(Constants.URL + Constants.API.MENUS.FIND_MENU)
            .then(response => {
                console.log('listMenu', response.data);
                this.setState({
                    list_menu_moblie: response.data
                })
            });
    }

    onClickMenu = (item) => {
        // console.log(item);

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

        // console.log("this.state.list_popUp", this.state.list_popUp);

        const get = this.state.get_menu
        get.push({
            id: this.state.list_popUp._id,
            idBK: this.state.id_tbname,
            tbname: this.state.tbname,
            image: this.state.list_popUp.pathImage,
            title: this.state.list_popUp.title,
            total: this.state.count,
        })
        console.log('get', get);

        this.setState({
            get_menu: get,
            show: false,
            count: 1
        });

        const list_orders = localStorage.getItem("setMenu");
        let arr_list = []
        if (list_orders !== null) {
            const get_list = JSON.parse(list_orders)
            // console.log("get_list", get_list);

            const found = get_list.findIndex(element => element.id == this.state.list_popUp._id);
            // console.log("found: ", found);
            // console.log("this.state.list_popUp._id", this.state.list_popUp._id);

            if (found > -1) {
                const count = get_list[found].total
                get_list[found].total = count + this.state.count;
                arr_list = get_list;
            } else {
                get_list.push({
                    id: this.state.list_popUp._id,
                    idBK: this.state.id_tbname,
                    tbname: this.state.tbname,
                    image: this.state.list_popUp.pathImage,
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
        return (
            <div className="from-menu">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="select-style">
                                <select onChange={(e) => { this.onChangeCategory(e) }} >
                                    <option id="dr-list-category" value={' '}>
                                        เลือกหมวดหมู่
                                    </option>
                                    {this.state.listCategory.map((item, i) =>
                                        item.status && (
                                            <option id="dr-list-category" key={'brand' + i} value={item.category_id}>
                                                {item.category_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col icon-basket">
                                <NavLink to='/basket' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                    <FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon>
                                </NavLink>
                            </div>
                            <div className="from-listMenu-mobile">
                                <p>{this.state.tbname}</p>
                                <p>{this.state.id_tbname}</p>

                                <div className="header_mobile">
                                    <b style={{ fontFamily: 'Noto Serif Thai' }}>รายการอาหาร</b>
                                    <div className="col icon-basket">
                                        <NavLink to='/basket' className={({ isActive }) => isActive ? 'link active' : 'link'}>
                                            <FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="accordion" id="accordionExample">
                                    {this.state.listCategory.map((item, i) =>
                                        item.status && (
                                            <div className="accordion-item" key={'brand' + i} value={item.category_id} onClick={() => { this.onClickCategory(item) }}  >
                                                <h2 className="accordion-header" id={'headingOne' + i}>
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#collapseOne' + i} aria-expanded="true" aria-controls="collapseOne">
                                                        <span style={{ fontFamily: 'Noto Serif Thai' }}>{item.category_name}</span>
                                                    </button>
                                                </h2>
                                                <div id={'collapseOne' + i} className="accordion-collapse collapse" aria-labelledby={'headingOne' + i} data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <ul className="list-group list-group-flush">
                                                            {this.state.list_menu_moblie.map((listitem, ii) =>
                                                                <li className="list-group-item list_menu_moblie"
                                                                    onClick={() => { this.onClickMenu(listitem) }}
                                                                    key={'menu' + ii}>
                                                                    {listitem.pathImage ?
                                                                        (<>
                                                                            <img
                                                                                key={listitem._id}
                                                                                id="imgMenuDetail"
                                                                                src={listitem.pathImage}
                                                                                onLoad={this.handleImageRatio}
                                                                                alt="img menu"
                                                                                className="li-image"
                                                                            />
                                                                        </>) :
                                                                        null
                                                                    }
                                                                    <span style={{ fontFamily: 'Noto Serif Thai' }}>{listitem.title}</span>
                                                                    <span style={{ fontFamily: 'Chivo Mono' }}>{listitem.category}</span>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="from-listMenu">
                                <div className="container">
                                    <div className="row-listmenu">
                                        {this.state.list_menu.map((item, i) =>
                                            <div className="col col-list-menu" key={'menu' + i}>
                                                <div className="card card-body-menu" onClick={() => { this.onClickMenu(item) }}>
                                                    {item.pathImage ?
                                                        (<>
                                                            <img
                                                                key={item._id}
                                                                id="imgMenuDetail"
                                                                src={item.pathImage}
                                                                onLoad={this.handleImageRatio}
                                                                alt="img menu"
                                                                className="card-img-top"
                                                            />
                                                        </>) :
                                                        null
                                                    }
                                                    <div className="card-body" >
                                                        <h3 className="card-title-name">{item.title}</h3>
                                                        <label className="card-text-menu">หมวดหมู่: <b>{item.category}</b></label>
                                                    </div>
                                                </div><br />
                                            </div>
                                        )}
                                    </div>
                                </div >
                            </div >
                        </div >
                        <Modal className="from-popup" show={this.state.show} onHide={() => { this.handleClose() }}>
                            <div className="from-popup-style-menu">
                                <Modal.Header closeButton className="from-popup-style-menu">
                                    <Modal.Title><b style={{ fontFamily: 'Noto Serif Thai' }}>เลือกรายการ</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="from-popup-style-menu">
                                    <div className="popup-body">
                                        <div className="container">
                                            <div className="row row-cols-1">
                                                <div className="col">
                                                    <div className="body-image">
                                                        <img
                                                            key={this.state.list_popUp._id}
                                                            id="imgMenuDetail"
                                                            src={this.state.list_popUp.pathImage}
                                                            onLoad={this.handleImageRatio}
                                                            alt="img menu"
                                                            className="li-image-menu"
                                                        />
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
                                        </div >
                                    </div >
                                </Modal.Body >
                                <Modal.Footer className="from-popup-style-menu">
                                    <Button className="btn-footer" variant="primary" onClick={() => { this.onClickAddMenu() }}>
                                        เพิ่มรายการ
                                    </Button>
                                </Modal.Footer>
                            </div >
                        </Modal >
                    </div >
                </div >
            </div >
        )
    }
}

export default Menu;
