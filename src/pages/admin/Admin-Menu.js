import { Component } from "react";
import '../../styles/Admin-Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCarrot } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { NavLink } from "react-router-dom";


class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showAddCategory: false,
            showUpdateCategory: false,
            showFaill: false,
            showCategory: false,
            checkbook: true,
            name: '',
            nameCategory: '',
            idCategory: '',
            price: '',
            category: '',
            image: 'images',
            detail: '',
            listCategory: [],
            listMenu: [],
            categoryTrue: [],
            menucatagory: '',
            dropdown: [
                {
                    id: 1,
                    name: 'ผลไม้'
                },
                {
                    id: 2,
                    name: 'หมู'
                }
            ]
        }
    }

    componentDidMount() {
        this.GetCategory();
    }

    handleClose = () => {
        const payload =
        {
            "data": this.state.categoryTrue
        }
        console.log(payload);
        axios.post('http://192.168.1.21:8080/update-category', payload).then(response => {
            this.GetCategory()
        });
        this.setState({
            show: false,
            showAddCategory: false,
            showUpdateCategory: false,
            showCategory: false
        });
    }
    handleCloseFaill = () => {
        this.setState({ showFaill: false });
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleAddCategory = () => {
        this.setState({ showAddCategory: true });
    }
    handleUpdateCategory = () => {
        this.setState({
            // showUpdateCategory: true,
            showCategory: true
        });
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }
    onChangePrice = (e) => {
        this.setState({ price: e.target.value })
    }
    onChangeCategory = (e) => {
        this.setState({ category: e.target.value })
    }
    onChangeDetail = (e) => {
        this.setState({ detail: e.target.value })
    }
    onChangeAddNameCategory = (e) => {
        this.setState({ nameCategory: e.target.value })
    }
    onChangeAddIdCategory = (e) => {
        this.setState({ idCategory: e.target.value })
    }
    onChangeMenuCategory = (e) => {
        this.setState({ menucatagory: e.target.value })
    }

    onClickMenu = () => {
        // console.log(items);
        axios.post('http://192.168.1.21:8080/create-menu', {
            "title": this.state.name,
            "price": this.state.price,
            "status": true,
            "category": this.state.category,
            "inform": this.state.detail
        }).then(response => {
            // console.log(response.data);
        });
    }

    onClickCategoryMenu = (name) => {
        console.log("name", name);
        axios.post('http://192.168.1.21:8080/category-menu', {
            "category_id": name.category_id
        }).then(response => {
            this.setState({
                listMenu: response.data
            })
        });
    }

    onClickCheckBoxCategory = (index) => {
        const listC = this.state.categoryTrue
        const getlist = this.state.listCategory
        listC[index].status = !listC[index].status
        this.setState({
            categoryTrue: listC,
            listCategory: getlist
        })
        console.log(this.state.listCategory);
    }

    GetCategory = () => {
        axios.post('http://192.168.1.21:8080/find-category')
            .then(response => {
                console.log(response.data);
                this.setState({
                    listCategory: response.data,
                    categoryTrue: response.data
                })
                this.onClickCategoryMenu(response.data[0]);
            });
    }


    onClickAddCategory = () => {
        axios.post('http://192.168.1.21:8080/create-category', {
            "category_id": this.state.idCategory,
            "category_name": this.state.nameCategory
        }).then(response => {
            console.log(response.data);
            if (response.data.category_id === undefined) {
                console.log("Faill !!!");
                this.setState({
                    showFaill: true,
                    idCategory: '',
                    nameCategory: ''
                })
            }
            this.setState({
                idCategory: '',
                nameCategory: ''
            })
            this.GetCategory();
            this.handleClose();

        });
    }

    render() {
        return (
            <div className="from-admin-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="admin-left">
                                <div className="row row-cols-1">
                                    <div className="col admin-left-header">
                                        <input className="input-saerch" type="text" placeholder="Search.." />
                                        {' '}<FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                                        <button type="button" className="btn btn-add"
                                            onClick={() => { this.handleShow() }}>
                                            <b>Add</b>
                                        </button>
                                        <button type="button" className="btn btn-delete"><b>Delete</b></button>
                                    </div>
                                    <div className="col admin-left-body">
                                        <div className="row row-cols-1 row-cols-md-4 g-4">
                                            {this.state.listMenu.map((item, i) =>
                                                <div className="col" key={'menu' + i}>
                                                    <div className="card card-body-menu">
                                                        <img src="https://th.bing.com/th/id/R.3d608319942ed6b4c98ac1bcbebc7076?rik=epwmnQcoUkuGgw&pid=ImgRaw&r=0" className="card-img-top" />
                                                        <div className="card-body" >
                                                            <h3 className="card-title-name">{item.title}</h3>
                                                            <label className="card-text-menu">หมวดหมู่: <b>{item.category}</b></label>
                                                            <input className="form-check-input me-1 checkbox-menu" type="checkbox" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Modal className="from-popup-category" show={this.state.show} onHide={() => { this.handleClose() }}>
                                        <div className="from-popup-style">
                                            <Modal.Header closeButton className="from-popup-style">
                                                <Modal.Title><b>เพิ่มเมนู</b></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="from-popup-style">
                                                <div className="popup-body-category">
                                                    <div className="container">
                                                        <div className="row row-cols-1">
                                                            <div className="col">
                                                                <div className="body-image">
                                                                    <img src="https://th.bing.com/th/id/R.3d608319942ed6b4c98ac1bcbebc7076?rik=epwmnQcoUkuGgw&pid=ImgRaw&r=0"
                                                                        className="card-img-top" value={this.state.image} />
                                                                    {/* <FontAwesomeIcon className="list-icon" icon={faCarrot}></FontAwesomeIcon> */}
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text">
                                                                    <form className="from-category-input">
                                                                        <label>Name</label>
                                                                        <input className="w3-input" type="text" id="name"
                                                                            value={this.state.name}
                                                                            onChange={(e) => { this.onChangeName(e) }} />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text">
                                                                    <form className="from-category-input">
                                                                        <label>Price</label>
                                                                        <input className="w3-input" type="text" id="price"
                                                                            value={this.state.price}
                                                                            onChange={(e) => { this.onChangePrice(e) }} />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text">
                                                                    <label>Category</label>
                                                                    <div className="select-style-admin">
                                                                        <select value={this.state.category}
                                                                            onChange={(e) => { this.onChangeCategory(e) }} >
                                                                            {this.state.dropdown.map((val, i) => (
                                                                                <option id="dr" key={'brand' + i} value={val.name}>
                                                                                    {val.name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text">
                                                                    <form className="from-category-input">
                                                                        <label>detail</label>
                                                                        <input className="w3-input" type="text" id="detail"
                                                                            value={this.state.detail}
                                                                            onChange={(e) => { this.onChangeDetail(e) }} />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer className="from-popup-style">
                                                <Button className="btn-footer" variant="primary"
                                                    onClick={() => { this.onClickMenu() }}>
                                                    เพิ่มรายการ
                                                </Button>
                                            </Modal.Footer>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-category">
                                <div className="container">
                                    <div className="row row-cols-1">
                                        <div className="col">
                                            <div className="card card-category">
                                                <h5 className="card-header header-category">หมวดหมู่</h5>
                                                <div className="card-body">
                                                    <NavLink className={({ isActive }) =>
                                                        isActive ? 'link-category active-category' : 'link-category'
                                                    }>
                                                        <ul className="list-group list-group-flush"
                                                        >
                                                            {this.state.listCategory.map((item, i) =>
                                                                item.status &&
                                                                <li className="list-group-item"
                                                                    key={'category' + i}
                                                                    onClick={() => { this.onClickCategoryMenu(item) }}>
                                                                    <span>
                                                                        {item.category_name}
                                                                    </span>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="col-btn-category">
                                                <div className="row row-cols-2">
                                                    <div className="col">
                                                        <button type="button" className="btn btn-add-category"
                                                            onClick={() => { this.handleAddCategory() }}>
                                                            <b>Add</b>
                                                        </button>
                                                    </div>
                                                    <div className="col">
                                                        <button type="button" className="btn btn-update-category"
                                                            onClick={() => { this.handleUpdateCategory() }}>
                                                            <b>Update</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Modal className="from-popup-add-category" show={this.state.showAddCategory} onHide={() => { this.handleClose() }}>
                                            <div className="from-popup-style-add">
                                                <Modal.Header closeButton className="from-popup-style-add">
                                                    <Modal.Title><b>เพิ่มหมวดหมู่</b></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="from-popup-style">
                                                    <div className="popup-body-category">
                                                        <div className="container">
                                                            <div className="row row-cols-1">
                                                                <div className="col">
                                                                    <div className="body-text-add">
                                                                        <form className="from-add-category-input">
                                                                            <label>Id</label>
                                                                            <input className="w3-input" type="text" id="id"
                                                                                value={this.state.idCategory}
                                                                                onChange={(e) => { this.onChangeAddIdCategory(e) }} />
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="body-text-add">
                                                                        <form className="from-add-category-input">
                                                                            <label>Name</label>
                                                                            <input className="w3-input" type="text" id="name"
                                                                                value={this.state.nameCategory}
                                                                                onChange={(e) => { this.onChangeAddNameCategory(e) }} />
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="from-popup-style">
                                                    <Button className="btn-footer" variant="primary"
                                                        onClick={() => { this.onClickAddCategory() }}>
                                                        ยืนยัน
                                                    </Button>
                                                </Modal.Footer>
                                            </div>
                                        </Modal>

                                        <Modal className="from-popup-update" show={this.state.showCategory}
                                            onHide={() => { this.handleClose() }}>
                                            <div className="from-popup-style-update">
                                                <Modal.Header closeButton className="from-popup-style-update">
                                                    <Modal.Title><b>Update Category</b></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="from-popup-style">
                                                    <div className="body-text-update">
                                                        <ul className="list-group list-group-flush">
                                                            {this.state.categoryTrue.map((item, i) =>
                                                                <li className="list-group-item item-update"
                                                                    key={'category' + i}>
                                                                    <label>
                                                                        <input className="form-check-input me-1" type="checkbox" checked={item.status}
                                                                            onChange={() => { this.onClickCheckBoxCategory(i) }} />
                                                                        <b className="text-category">{item.category_name}</b>
                                                                    </label>
                                                                </li>
                                                            )}
                                                        </ul>
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

                                        <Modal className="from-popup-faill" show={this.state.showFaill}
                                            onHide={() => { this.handleCloseFaill() }}>
                                            <div className="from-popup-style-faill">
                                                <Modal.Header closeButton className="from-popup-style-add">
                                                    <Modal.Title><b>Faill</b></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="from-popup-style">
                                                    <div className="body-text-faill">
                                                        <b>ID </b><label>นี้ถูกใช้แล้ว ไม่สามารถเพิ่มหมวดหมู่ได้</label>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="from-popup-style">
                                                    <Button className="btn-footer" variant="primary"
                                                        onClick={() => { this.handleCloseFaill() }}>
                                                        ตกลง
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

export default AdminMenu;