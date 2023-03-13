import { Component } from "react";
import '../styles/Home.css';
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Constants from '../constants';
import loadImage from 'blueimp-load-image'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgAboutWidth: 256,
            imgAboutHeight: 256,
            dataImg: '',
            dataImgName: '',
            pathImgData: [],
            data_store: [],
        }

        this.IMAGE_MAX_WIDTH = '1280'
        this.IMAGE_MAX_HEIGHT = '720'
        this.IMAGE_MIN_WIDTH = '640'
        this.IMAGE_MIN_HEIGHT = '480'
    }

    componentDidMount() {
        this.onGetData();
    }

    onGetData = () => {
        axios.post(Constants.URL + Constants.API.STORES.FIND_STORE
        ).then(response => {
            console.log(response.data);
            // this.setState({
            //     data_store: response.data,
            //     name: response.data.name,
            //     phone: response.data.phonenumber,
            //     facebook: response.data.facebook,
            //     line: response.data.line,
            //     imgAbout_1: response.data.shopPathImage,
            //     imgAbout_2: response.data.infoPathImage,
            // })
        });
    }

    handleBrowseFileImg_2 = (eventTarget) => {
        console.log('handleBrowseFile2', eventTarget.name)
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

                        this.setState({
                            imgAbout_2: canvas.toDataURL('image/jpeg', 0.8),
                            imgAbout_2Name: eventTarget.files[0].name
                        })

                        this.uploadImg({
                            infoPathImage: canvas.toDataURL('image/jpeg', 0.8),
                            infoImgName: eventTarget.files[0].name
                        })
                    },
                    options
                )
            }
        }
    }

    uploadImg = (IMG) => {
        console.log('imgPart:', IMG);
        axios.post(Constants.URL + Constants.API.STORES.UPDATE_SHOP, {
            "_id": "640ef43f3338c96b73707526",
            ...IMG
        }).then(response => {
            console.log('response', response.data);
        });
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

        if (imgId === 'imgAboutDetail') {
            this.setState({
                imgAboutWidth: width,
                imgAboutHeight: height
            })
        }
    }


    render() {
        return (
            <div className="from-home">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="row row-cols-2">
                                <div className="col label-home">
                                    <h1>Food lance!</h1>
                                    <p>that meets your needs</p>
                                    <div className="btn-booking">
                                        <NavLink to='/booking' className={({ isActive }) =>
                                            isActive ? 'link-booking active' : 'link-booking'
                                        }><p>Booking</p> </NavLink>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="from-slid">
                                        <Carousel fade>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/e2/79/18/e2791866602f193c1c92b6aeb164c18c.jpg"
                                                        alt="First slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/e5/c4/52/e5c4527c6105e4fe38e14401e7b979a2.jpg"
                                                        alt="Second slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <div className="slide-image">
                                                    <img
                                                        className="d-block w-100 login-img"
                                                        src="https://i.pinimg.com/564x/d3/e3/56/d3e356a9a4ba559afe7dd3924b0c8b29.jpg"
                                                        alt="Third slide"
                                                    />
                                                </div>
                                            </Carousel.Item>
                                        </Carousel>
                                    </div>
                                    {this.state.imgAbout_2 ?
                                        (<img
                                            className="about-img-bottom"
                                            id="imgAbout2Detail"
                                            src={this.state.imgAbout_2}
                                            onLoad={this.handleImageRatio}
                                            width={this.state.imgAboutWidth}
                                            height={this.state.imgAboutHeight}
                                        />) : (
                                            'NO IMAGE'
                                        )}
                                    <label htmlFor="image_2" className="upload-icon-about-time">
                                        <FontAwesomeIcon icon={faUpload} style={{ fontSize: '20px' }}></FontAwesomeIcon>
                                    </label>
                                    <input
                                        type="file"
                                        id="image_2"
                                        name="imgAbout_2Value"
                                        accept={'.jpg,.jpeg,.png'}
                                        onChange={e => this.handleBrowseFileImg_2(e.target)}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="from-category">
                                <div className="container">
                                    <div className="row row-cols-4">
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Meat dish</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Seafood</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Dessert</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card group">
                                                <div className="card-body">
                                                    <p style={{ color: 'white', fontFamily: 'Chivo Mono' }}>Drink</p>
                                                </div>
                                            </div>
                                        </div>
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

export default Home;