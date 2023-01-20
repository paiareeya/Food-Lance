import { Component } from "react";
import '../styles/Basket.css';
import Button from 'react-bootstrap/Button';

class Basket extends Component {
    render() {
        return (
            <div className="from-basket">
                <div className="card-basket">
                    <div class="container">
                        <div class="row row-cols-1">
                            <div class="col">
                                <div class="card-header">
                                    <h3>รายการในตะกร้า</h3>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card-body-basket">
                                    <div class="row row-cols-3">
                                        <div class="col">
                                            <div className="basket-body-image">
                                                <img src="https://th.bing.com/th/id/OIP.gUXqXGOmeut1G3cF1QCppAHaKm?pid=ImgDet&rs=1" />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="basket-body-name">
                                                <h5>ไอศกรีมวนิลา</h5>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="basket-body-amount">
                                                <div className="basket-amount-style">
                                                    <div class="container">
                                                        <div class="row row-cols-3">
                                                            <div class="col"><Button className="amount-minus-style" variant="primary"><b>-</b></Button></div>
                                                            <div class="col text-amount"><h5>1</h5></div>
                                                            <div class="col"><Button className="amount-plus-style" variant="primary"><b>+</b></Button></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div className="card-footer">
                                    <Button className="btn-submit" variant="primary"><b>ยืนยัน</b></Button>
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