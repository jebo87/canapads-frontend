import React from 'react';
import { getAd } from '../backend_interface/api_if';
import HomeAd from '../model/ads'
import Carousel from './Carousel';
import '../images/icons8-cottage.png';
import '../images/icons8-cat_footprint.png';
import '../images/icons8-bed.png';
import '../images/icons8-dumbbell.png';
import '../images/icons8-no_animals.png';
import '../images/icons8-parking.png';
import '../images/icons8-shield.png';
import '../images/icons8-shower_and_tub.png';
import '../images/icons8-washing_machine.png';
import '../images/icons8-sofa.png';
import '../images/icons8-swimming_pool.png';
import '../images/icons8-year_of_dog.png';
import '../images/loading.gif';

export default class AdDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ad: undefined,
            carouselVisibility: true,
            images: []
        }
    }
    async componentDidMount() {
        let ad = await getAd(this.props.match.params.id);
        this.setState(() => (
            {
                ad,
                images: ad.images
            }
        ));

    }

    toggleCarousel = () => {
        this.setState({ carouselVisibility: !this.state.carouselVisibility })
    }


    render() {

        if (!this.state.ad)
            return (
                <div className="loading">
                    <img src="../images/loading.gif" alt="" />
                </div>)
        else {
            const cost = "$" + (this.state.ad.price).toFixed().
                replace(/\d(?=(\d{3}))/g, '$&,') + " /mo"
            return (

                <div className="ad-detail" >
                    {
                        this.state.carouselVisibility && <Carousel images={this.state.images} toggleCarousel={this.toggleCarousel} ></Carousel>

                    }
                    <div className="image-container" >

                        <img src={this.state.ad.images[0]} alt="" />
                    </div>
                    <div className="content">
                        <div className="content-left">
                            <button className=" photos-button" onClick={this.toggleCarousel}> View photos</button>
                            <div className="card">
                                <h4>
                                    {this.state.ad.title}
                                </h4>
                                <span className="price float-right">
                                    <span>
                                        For rent
                                    </span>
                                    <span>
                                        {cost}
                                    </span>
                                </span>
                            </div>
                            <div className="card">
                                <div className="facts-wrapper">
                                    <ul className="facts">
                                        <li className="fact-item">
                                            <img src="images/icons8-cottage.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Type</span>
                                                <span>Condo</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-sofa.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Furnished</span>
                                                <span>No</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-bed.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Beedroms</span>
                                                <span>4</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-shower_and_tub.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Bathrooms</span>
                                                <span>1</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-cat_footprint.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Pets allowed</span>
                                                <span>Cats only</span>
                                            </div>
                                        </li>


                                        <li className="fact-item">
                                            <img src="images/icons8-washing_machine.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Laundry</span>
                                                <span>In building</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-parking.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Parking</span>
                                                <span>Off street</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-shield.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Security</span>
                                                <span>Yes</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-swimming_pool.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Pool</span>
                                                <span>Interior</span>
                                            </div>
                                        </li>
                                        <li className="fact-item">
                                            <img src="images/icons8-dumbbell.png" alt="" className="icon" />
                                            <div className="fact-item-text">
                                                <span className="title">Gym</span>
                                                <span>No</span>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="description">
                                    <h3>Description</h3>
                                    <span >{
                                        //style="{{white-space: pre-wrap}}"
                                        this.state.ad.description
                                    }</span>
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="card">
                                <h4>CONTACT FORM</h4>
                                <form className="contact-form">
                                    <input id="name" type="text" className="form-control" placeholder="Name" />
                                    <textarea id="message" className="form-control" rows="10" placeholder="Message"></textarea>
                                    <input id="email" type="text" className="form-control" placeholder="Email" />
                                    <button className="btn-primary action-button">Contact</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>






            )
        }
    }
}

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>