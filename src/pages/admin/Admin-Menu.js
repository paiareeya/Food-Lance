import { Component } from "react";
import '../../styles/Admin-Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Constants from '../../constants';
import loadImage from 'blueimp-load-image'

class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showAddCategory: false,
            showUpdateCategory: false,
            showFaill: false,
            showCategory: false,
            checkbox: false,
            nameMenu: '',
            nameCategory: '',
            idCategory: '',
            price: '',
            category: '',
            image: 'images',
            detail: '',
            file: '',
            listCategory: [],
            listMenu: [],
            categoryTrue: [],
            menucatagory: '',
            DeleteMemu: [],
            imgMenuName: '',
            imgMenu: '',
            imgMenuWidth: 256,
            imgMenuHeight: 256,
            isShowImg: false,
            pathImgData: [],
            dataImg: '',
            dataImgName: ''
        }

        this.IMAGE_MAX_WIDTH = '100'
        this.IMAGE_MAX_HEIGHT = '100'
        this.IMAGE_MIN_WIDTH = '100'
        this.IMAGE_MIN_HEIGHT = '100'
    }

    componentDidMount() {
        this.GetCategory();
    }

    handleClose = () => {
        this.setState({
            show: false,
            showAddCategory: false,
            showUpdateCategory: false,
            showCategory: false,
            imgMenusta: '',
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
        this.setState({ showCategory: true });
    }

    onChangeName = (e) => {
        this.setState({ nameMenu: e.target.value })
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
    handleChangeImage = (e) => {
        console.log(e.target.files);
        this.setState({ file: URL.createObjectURL(e.target.files[0]) });
    }

    onClickMenu = () => {
        const nameSendC = this.state.listCategory
        const idSendC = this.state.category
        const result = nameSendC.filter(item => item.category_id === idSendC);
        if (idSendC === " ") {
            return
        }
        console.log("1 this.state.dataImg", this.state.imgMenu);
        console.log("1 this.state.dataImgName", this.state.imgMenuName);

        let img = ''
        let imgName = ''

        if (!this.state.imgMenu && !this.state.imgMenuName) {
            this.setState({
                img,
                imgName
            })
        } else {
            img = this.state.imgMenu
            imgName = this.state.imgMenuName
        }
        axios.post(Constants.URL + Constants.API.MENUS.CREATE_MENU, {
            "title": this.state.nameMenu,
            "price": this.state.price,
            "status": false,
            "category_id": this.state.category,
            "category": result[0].category_name,
            "inform": this.state.detail,
            "imgName": imgName,
            "pathImage": img
        }).then(response => {
            console.log(response.data);
            this.handleClose();
            this.GetCategory()
            this.setState({
                file: '',
                nameMenu: '',
                price: '',
                category: '',
                detail: '',
            })
        });
    }

    onClickCategoryMenu = (name) => {
        // console.log("name", name);
        axios.post(Constants.URL + Constants.API.MENUS.CATEGORY_MENU, {
            "category_id": name.category_id
        }).then(response => {
            console.log("response.data", response.data);
            const listresponse = response.data.map(
                (item) => {
                    return {
                        ...item,
                        boxStatus: false
                    }
                }
            )
            this.setState({
                listMenu: listresponse
            })
        });
    }

    GetCategory = () => {
        axios.post(Constants.URL + Constants.API.CATEGORY.FIND_CATEGORY,)
            .then(response => {
                console.log(response.data);
                const showC = response.data
                const result = showC.filter(item => item.status === true);
                this.setState({
                    listCategory: response.data,
                    categoryTrue: response.data
                })
                this.onClickCategoryMenu(result[0]);
            });
    }

    onClickAddCategory = () => {
        axios.post(Constants.URL + Constants.API.CATEGORY.CREATE_CATEGORY, {
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
    onClickCheckBoxCategory = (index) => {
        console.log(index);
        const listC = this.state.categoryTrue
        console.log(listC);
        const item = listC[index]
        const status = !item.status
        listC[index] = {
            ...item,
            status
        }

        this.setState({
            categoryTrue: listC,
        })

    }
    UploadCategory = () => {
        const payload =
        {
            "data": this.state.categoryTrue
        }
        console.log(payload);
        axios.post(Constants.URL + Constants.API.CATEGORY.UPDATE_CATEGORY, payload)
            .then(response => {
                this.GetCategory()
                this.handleClose();
            });
    }

    onClickCheckBoxMenu = (index) => {
        const getListMenu = this.state.listMenu
        const item = getListMenu[index]
        const MenuStatus = !item.boxStatus
        getListMenu[index] = {
            ...item,
            boxStatus: MenuStatus
        }
        this.setState({
            listMenu: getListMenu
        })
    }
    onClickCheckDeleteMenu = () => {
        const getMenu = this.state.listMenu.filter(item => item.boxStatus === true);
        const payload =
        {
            "data": getMenu
        }
        console.log("payload :", payload);
        axios.post(Constants.URL + Constants.API.MENUS.DELETE_MENU, payload)
            .then(response => {
                this.GetCategory()
            });
    }

    handleBrowseFile = eventTarget => {
        console.log(eventTarget.name)
        if (eventTarget.files[0]) {
            const options = {
                maxWidth: this.IMAGE_MAX_WIDTH,
                maxHeight: this.IMAGE_MAX_HEIGHT,
                minWidth: this.IMAGE_MIN_WIDTH,
                minHeight: this.IMAGE_MIN_HEIGHT,
                orientation: true,
                canvas: true
            }
            if (eventTarget.files[0]) {
                loadImage(
                    eventTarget.files[0],
                    canvas => {

                        switch (eventTarget.name) {
                            case 'imgMenuValue':
                                this.setState({
                                    imgMenu: canvas.toDataURL('image/jpeg', 0.8),
                                    imgMenuName: eventTarget.files[0].name
                                })
                                break
                            default:
                                break
                        }
                        // console.log(`this.portInCardImage: `, this.portInCardImage)
                    },
                    options
                )
            }
        }
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
        // console.log(this.state.imgMenuName);
        return (
            <div className="from-admin-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="admin-left">
                                <div className="row row-cols-1">
                                    <div className="col admin-left-header">
                                        {/* <input className="input-saerch" type="text" placeholder="Search.." /> */}
                                        {/* {' '}<FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon> */}
                                        <button type="button" className="btn btn-add"
                                            onClick={() => { this.handleShow() }}>
                                            <b>Add</b>
                                        </button>
                                        <button type="button" className="btn btn-delete"
                                            onClick={() => { this.onClickCheckDeleteMenu() }}>
                                            <b>Delete</b>
                                        </button>
                                    </div>
                                    <div className="col admin-left-body">
                                        <div className="row row-cols-1 row-cols-md-4 g-4">
                                            {this.state.listMenu.map((item, i) =>
                                                <div className="col" key={'menu' + i}>
                                                    <div className="card card-body-menu-store">
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
                                                            <label className="card-text-menu">????????????????????????:
                                                                <b style={{ fontFamily: 'Noto Serif Thai' }}>{item.category}</b>
                                                            </label>
                                                            <input className="form-check-input me-1 checkbox-menu" type="checkbox" value=""
                                                                onChange={() => { this.onClickCheckBoxMenu(i) }} checked={item.boxStatus} />
                                                        </div>
                                                    </div><br />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Modal className="from-popup-category" show={this.state.show} onHide={() => { this.handleClose() }}>
                                        <div className="from-popup-style">
                                            <Modal.Header closeButton className="from-popup-style">
                                                <Modal.Title><b style={{ fontFamily: 'Noto Serif Thai' }}>???????????????????????????</b></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="from-popup-style">
                                                <div className="popup-body-category">
                                                    <div className="container">
                                                        <div className="row row-cols-1">
                                                            <div className="col">
                                                                <div className="body-image">
                                                                    <div className="body-image">
                                                                        {this.state.imgMenu ?
                                                                            (<img
                                                                                className="card-img-top"
                                                                                id="imgMenuValue"
                                                                                src={this.state.imgMenu}
                                                                                onLoad={this.handleImageRatio}
                                                                                width={this.state.imgMenuWidth}
                                                                                height={this.state.imgMenuHeight}
                                                                            />) : (
                                                                                'NO IMAGE'
                                                                            )}
                                                                        <label htmlFor="image" className="upload-icon">
                                                                            <FontAwesomeIcon icon={faUpload} style={{ fontSize: '20px' }}></FontAwesomeIcon>
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            id="image"
                                                                            name="imgMenuValue"
                                                                            accept={'.jpg,.jpeg,.png'}
                                                                            onChange={e => this.handleBrowseFile(e.target)}
                                                                            style={{ display: 'none' }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text-add">
                                                                    <form className="from-category-input">
                                                                        <label>Name:</label>
                                                                        <input className="w3-input" type="text" id="name"
                                                                            value={this.state.nameMenu}
                                                                            onChange={(e) => { this.onChangeName(e) }}
                                                                            style={{ fontFamily: 'Noto Serif Thai' }} />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text-add">
                                                                    <form className="from-category-input">
                                                                        <label>Price:</label>
                                                                        <input className="w3-input" type="text" id="price"
                                                                            value={this.state.price}
                                                                            onChange={(e) => { this.onChangePrice(e) }}
                                                                            style={{ fontFamily: 'Chivo Mono' }} />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text-add" style={{ marginTop: '15px' }}>
                                                                    <label>Category:</label>
                                                                    <div className="select-style-admin">
                                                                        <select value={this.state.category}
                                                                            onChange={(e) => { this.onChangeCategory(e) }} >
                                                                            <option id="dr" value={' '}>
                                                                                ???????????????
                                                                            </option>
                                                                            {this.state.listCategory.map((item, i) =>
                                                                                item.status && (
                                                                                    <option id="dr" key={'category' + i} value={item.category_id} style={{ color: '#000814', fontFamily: 'Noto Serif Thai' }} >
                                                                                        {item.category_name}
                                                                                    </option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="body-text-add">
                                                                    <form className="from-category-input">
                                                                        <label>Detail:</label>
                                                                        <input className="w3-input" type="text" id="detail"
                                                                            value={this.state.detail}
                                                                            onChange={(e) => { this.onChangeDetail(e) }}
                                                                            style={{ fontFamily: 'Noto Serif Thai' }} />
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
                                                    ?????????????????????????????????
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
                                                <h5 className="card-header header-category">????????????????????????</h5>
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
                                                                    <span style={{ fontFamily: 'Noto Serif Thai' }}>
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
                                                    <Modal.Title><b style={{ fontFamily: 'Noto Serif Thai' }}>???????????????????????????????????????</b></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="from-popup-style">
                                                    <div className="popup-body-category">
                                                        <div className="container">
                                                            <div className="row row-cols-1">
                                                                <div className="col">
                                                                    <div className="body-text-add">
                                                                        <form className="from-add-category-input">
                                                                            <label>Id:</label>
                                                                            <input className="w3-input" type="text" id="id"
                                                                                value={this.state.idCategory}
                                                                                onChange={(e) => { this.onChangeAddIdCategory(e) }} />
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="body-text-add">
                                                                        <form className="from-add-category-input">
                                                                            <label>Name:</label>
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
                                                        ??????????????????
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
                                                        onClick={() => { this.UploadCategory() }}>
                                                        ????????????
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
                                                        <b>ID </b><label>??????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????</label>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer className="from-popup-style">
                                                    <Button className="btn-footer" variant="primary"
                                                        onClick={() => { this.handleCloseFaill() }}>
                                                        ????????????
                                                    </Button>
                                                </Modal.Footer>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default AdminMenu;