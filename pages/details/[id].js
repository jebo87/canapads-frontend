import React, { useState } from 'react';
import '../../styles/styles.scss';
import 'normalize-scss/sass/_normalize.scss';
import { getAd } from '../../backend_interface/api_if';
import HomeAd from '../../model/ads'
import Carousel from '../Carousel';
// import '../../images/icons8-cottage.png';
// import '../../images/icons8-cat_footprint.png';
// import '../../images/icons8-bed.png';
// import '../../images/icons8-dumbbell.png';
// import '../../images/icons8-no_animals.png';
// import '../../images/icons8-parking.png';
// import '../../images/icons8-shield.png';
// import '../../images/icons8-shower_and_tub.png';
// import '../../images/icons8-washing_machine.png';
// import '../../images/icons8-sofa.png';
// import '../../images/icons8-swimming_pool.png';
// import '../../images/icons8-year_of_dog.png';
// import '../../images/loading.gif';

const AdDetail = (ad) => {

    // const [ad, setAd] = useState(undefined);
    // const [images, setImages] = useState([]);
    const [carouselVisibility, setCarouselVisibility] = useState(true)

    const toggleImages = () => {
        setCarouselVisibility(!carouselVisibility)
    }




    if (!ad)
        return (
            <div className="loading">
                Loading...
                </div>)
    else {
        console.log(ad);
        const cost = "$" + (ad.price).toFixed().
            replace(/\d(?=(\d{3}))/g, '$&,') + " /mo"
        return (

            <div className="ad-detail" >
                {
                    carouselVisibility && <Carousel images={ad.images} toggleCarousel={toggleImages} ></Carousel>

                }
                <div className="image-container" >

                    <img src={ad.images[0]} alt="" />
                </div>
                <div className="content">
                    <div className="content-left">
                        <button className=" photos-button" onClick={toggleImages}> View photos</button>
                        <div className="card">
                            <h4>
                                {ad.title}
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
                                    ad.description
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

};

AdDetail.getInitialProps = async function (context) {
    const { id } = context.query;
    let ad = await getAd(id);

    return { ...ad };

};

export default AdDetail;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>