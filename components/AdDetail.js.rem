import React, { useState, useContext, useEffect } from 'react';
import { getAd } from '../backend_interface/api_if';
import HomeAd from '../model/ads';
import Carousel from './Carousel';
import img from '../images/icons8-marker.png';
import propertyType from '../images/icons8-cottage.png';
import animals from '../images/icons8-cat_footprint.png';
import bed from '../images/icons8-bed.png';
import SmallImage from './SmallImage';
import { SelectedAdContext } from './Ads';
// import '../../images/icons8-dumbbell.png';
// import '../../images/icons8-no_animals.png';
import parking from '../images/icons8-parking.png';
// import '../../images/icons8-shield.png';
import bathroom from '../images/icons8-shower_and_tub.png';
import laundry from '../images/icons8-washing_machine.png';
// import '../../images/icons8-sofa.png';
// import '../../images/icons8-swimming_pool.png';
// import '../../images/icons8-year_of_dog.png';
// import '../../images/loading.gif';

const AdDetail = (props) => {
	const [ ad, setAd ] = useState();
	// const [images, setImages] = useState([]);
	const [ carouselVisibility, setCarouselVisibility ] = useState(false);
	const [ selectedImg, setSelectedImg ] = useState(0);
	const { selectedAd } = useContext(SelectedAdContext);
	useEffect(
		() => {
			async function loadAd(id) {
				const loadedAd = await getAd(id);
				setAd(loadedAd);
			}
			loadAd(selectedAd);
		},
		[ selectedAd ]
	);

	const toggleImages = () => {
		setCarouselVisibility(!carouselVisibility);
	};

	const changeImage = (index) => {
		setSelectedImg(index);
	};
	const getThumbnails = () => {
		ad.images.map((image) => {
			return <img src={image} alt="" />;
		});
	};

	if (ad == undefined || ad.id == undefined) return <div className="ad-detail">Loading listing details...</div>;
	else {
		const cost = '$' + ad.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,') + ' /mo';
		return (
			<div className="ad-detail">
				<button onClick={props.toggleVisibility}>close</button>
				{carouselVisibility && (
					<Carousel selected={selectedImg} images={ad.images} toggleCarousel={toggleImages} />
				)}

				<div className="photos">
					<div className="photo-big">
						<a onClick={toggleImages} href="#">
							<img src={ad.images[selectedImg]} alt="" />
						</a>
					</div>
					<div className="small-photos">
						{ad.images.map((image, key) => (
							<SmallImage
								selected={selectedImg === key ? true : false}
								image={image}
								index={key}
								key={key}
								changeImage={changeImage}
							/>
						))}
					</div>
				</div>
				<h2>{ad.title}</h2>
				<div className="location">
					<img src={img} />
					{ad.city}, {ad.neighborhood}
				</div>
				<div className="bottom_details">
					<div className="grid-container">
						<div className="grid-item">
							<div className="grid-item-text">Bedrooms</div>
							<div className="icons-text">
								<img src={bed} alt="" />
								<div className="icons-text-detail">{ad.rooms}</div>
							</div>
						</div>
						<div className="grid-item">
							<div className="grid-item-text">Bathrooms</div>
							<div className="icons-text">
								<img src={bathroom} alt="" />
								<div className="icons-text-detail">{ad.bathrooms}</div>
							</div>
						</div>
						<div className="grid-item">
							<div className="grid-item-text">Animals allowed</div>
							<div className="icons-text">
								<img src={animals} alt="" />
								<div className="icons-text-detail">{ad.pets}</div>
							</div>
						</div>
						<div className="grid-item">
							<div className="grid-item-text">Laundry</div>
							<div className="icons-text">
								<img src={laundry} alt="" />
								<div className="icons-text-detail">In building</div>
							</div>
						</div>
						<div className="grid-item">
							<div className="grid-item-text">Parking</div>
							<div className="icons-text">
								<img src={parking} alt="" />
								<div className="icons-text-detail">In building</div>
							</div>
						</div>
						<div className="grid-item">
							<div className="grid-item-text">Property type</div>
							<div className="icons-text">
								<img src={propertyType} alt="" />
								<div className="icons-text-detail">Condo</div>
							</div>
						</div>
					</div>
					<div className="description">
						<h4>Description:</h4>
						<span>{ad.description}</span>
					</div>
				</div>
				<div className="card">
					<h4>CONTACT FORM</h4>
					<form className="contact-form">
						<input id="name" type="text" placeholder="Name" />
						<span className="bar" />
						<textarea id="message" className="form-control" rows="10" placeholder="Message" />
						<input id="email" type="text" placeholder="Email" />
						<span className="bar" />
						<button className="form-control blue_button">Send message</button>
					</form>
				</div>
			</div>
		);
	}
};

export default AdDetail;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>
