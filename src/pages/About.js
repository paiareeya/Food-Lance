import { Component } from "react";
import '../styles/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faIceCream, faWhiskeyGlass, faBowlFood, faShrimp, faClock,
    faUpload
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Constants from '../constants';
import loadImage from 'blueimp-load-image'

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            facebook: '',
            line: '',
            imgAbout_1: '',
            imgAbout_1Name: '',
            imgAbout_2: '',
            imgAbout_2Name: '',
            imgAboutWidth: 256,
            imgAboutHeight: 256,
            dataImg: '',
            dataImgName: '',
            pathImgData: [],
            data_store: [],
            time: [
                {
                    id: 1,
                    day: "Mon",
                    time_open: '10:00',
                    time_close: '22:00'

                },
                {
                    id: 2,
                    day: "Tues",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 3,
                    day: "Wed",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 4,
                    day: "Thu",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 5,
                    day: "Fri",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 6,
                    day: "Sat",
                    time_open: '10:00',
                    time_close: '22:00'
                },
                {
                    id: 7,
                    day: "Sun",
                    time_open: '10:00',
                    time_close: '22:00'
                }
            ]
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
            this.setState({
                data_store: response.data,
                name: response.data.name,
                phone: response.data.phonenumber,
                facebook: response.data.facebook,
                line: response.data.line,
                imgAbout_1: response.data.shopPathImage,
                imgAbout_2: response.data.infoPathImage,
            })
        });
    }

    handleBrowseFileImg_1 = (eventTarget) => {
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
                        this.setState({
                            imgAbout_1: canvas.toDataURL('image/jpeg', 0.8),
                            imgAbout_1Name: eventTarget.files[0].name
                        })
                        this.uploadImg({
                            shopPathImage: canvas.toDataURL('image/jpeg', 0.8),
                            shopImgName: eventTarget.files[0].name
                        })
                    },
                    options
                )
            }
        }
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
            <div className="from-about">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="row row-cols-2">
                                <div className="col about-image">
                                    {this.state.imgAbout_1 ?
                                        (<img
                                            className="about-img"
                                            id="imgAboutDetail"
                                            src={this.state.imgAbout_1}
                                            onLoad={this.handleImageRatio}
                                            width={this.state.imgAboutWidth}
                                            height={this.state.imgAboutHeight}
                                        />) : (
                                            'NO IMAGE'
                                        )}
                                    <label htmlFor="image_1" className="upload-icon">
                                        <FontAwesomeIcon icon={faUpload} style={{ fontSize: '20px' }}></FontAwesomeIcon>
                                    </label>
                                    <input
                                        type="file"
                                        id="image_1"
                                        name="imgAbout_1Value"
                                        accept={'.jpg,.jpeg,.png'}
                                        onChange={e => this.handleBrowseFileImg_1(e.target)}
                                        style={{ display: 'none' }}
                                    />

                                    {/* </div> */}
                                </div>
                                <div className="col about-text">
                                    <h1>{this.state.name}.</h1>
                                    <p>delicious food is waiting for you</p>
                                    <div className="row row-cols-auto about-text-card">
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faBowlFood} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faShrimp} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faIceCream} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card about-card">
                                                <div className="card-body about-card-body">
                                                    <FontAwesomeIcon icon={faWhiskeyGlass} style={{ color: '#000814' }}></FontAwesomeIcon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row row-cols-2 about-bottom">
                                <div className="col">
                                    <h6 style={{ fontSize: '20px', marginTop: '30px' }}>Contact Us</h6>
                                    <div className="contact-us">
                                        <div className="row row-cols-auto">
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/phone.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/facebook-new.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.facebook}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card card-contact-us">
                                                    <div className="card-body about-bottom-icon">
                                                        <a href="https://www.facebook.com/ja.poppyk.otic">
                                                            <img className="icon" src="https://img.icons8.com/bubbles/256/line-me.png" />
                                                        </a>
                                                        <p style={{ fontSize: '12px', marginLeft: '10px', marginTop: '3px' }}>{this.state.line}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col about-time">
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
                                    <div className="card card-about-time">
                                        <div className="card-body card-about-time-body">
                                            <div className="row row-cols-1">
                                                <div className="col about-time-header">
                                                    <FontAwesomeIcon icon={faClock} style={{ color: 'white', marginLeft: '10px' }}></FontAwesomeIcon>
                                                    <p style={{ marginLeft: '40px', fontFamily: 'Chivo Mono' }}>Open</p>
                                                    <p style={{ marginLeft: '45px', fontFamily: 'Chivo Mono' }}>Close</p>
                                                </div>
                                                <div className="col">
                                                    <div className="about-time-body">
                                                        <ul className="text-time-ul">
                                                            {this.state.time.map((item, index) =>
                                                                <li key={index} className="text-li">
                                                                    <span className="text-day-open">{item.day}</span>
                                                                    <span className="text-day-open">{item.time_open}</span>
                                                                    <span style={{ marginLeft: '10px' }}>{'-'}</span>
                                                                    <span className="text-day-open" style={{ marginRight: '20px' }}>{item.time_close}</span>
                                                                </li>
                                                            )}
                                                        </ul>
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
            </div>
        )
    }
}

export default About;