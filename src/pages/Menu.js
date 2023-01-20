import { Component } from "react";
import '../styles/Menu.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            menu: [],
            Category_Menu: '',
            listCategory: [],
        }
    }

    componentDidMount() {
        this.GetCategory();
        this.showMenu();
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    handleShow = () => {
        this.setState({ show: true });
    }

    onChangeCategory = (e) => {
        this.setState({ Category_Menu: e.target.value });

        this.onGetCategory(e.target.value)
    }

    onGetCategory = (items) => {

        // console.log(items);
        axios.post('http://192.168.1.21:8080/category-menu',
            { "category": items })
            .then(response => {
                this.setState({
                    menu: response.data
                })
            });
    }

    showMenu = () => {
        // console.log("showMenu");


    }

    GetCategory = () => {
        axios.post('http://192.168.1.21:8080/find-category')
            .then(response => {
                this.setState({
                    listCategory: response.data
                })
                // const C = this.state.listCategory
                // if (C) {
                //     C.map(item => {
                //         if (item.category_name) {
                //             console.log(item.category_name);
                //         }
                //     })
                // }
            });
    }

    render() {
        return (
            <div className="from-menu">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="select-style">
                                <select onChange={(e) => { this.onChangeCategory(e) }} >
                                    {this.state.listCategory.map((item, i) => (
                                        <option id="dr" key={'brand' + i} value={item.category_name}>
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
                                        <div className="col">
                                            <button type="button" className="btn-card">
                                                <div className="card-list" onClick={() => { this.handleShow() }}>
                                                    <div className="card-list-header">
                                                        <FontAwesomeIcon className="list-icon" icon={faCarrot}></FontAwesomeIcon>
                                                    </div>
                                                    <div className="card-list-body">
                                                        <p>แครอท</p>
                                                    </div>
                                                </div>
                                            </button>
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
                                                                        <FontAwesomeIcon className="list-icon" icon={faCarrot}></FontAwesomeIcon>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="body-text">
                                                                        <h4>แครอท</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="body-amount">
                                                                        <div className="amount-style">
                                                                            <Button className="amount-minus" variant="primary"><b>-</b></Button>
                                                                            <h4>1</h4>
                                                                            <Button className="amount-plus" variant="primary"><b>+</b></Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="from-popup-style">
                                                    <Button className="btn-footer" variant="primary" onClick={() => { this.handleClose() }}>
                                                        เพิ่มรายการ
                                                    </Button>
                                                </Modal.Footer>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;
