import React, { useState, useContext, useEffect } from 'react';
import { getAd } from '../../backend_interface/api_if';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import HomeAd from '../../model/ads';
import Carousel from './../carousel/Carousel';
import marker from '../../images/listing_detail/icons8-marker.png';
import SmallImage from './../carousel/SmallImage';
import { SelectedListingContext } from './Listings';
import Features from './Features';
import { useDispatch } from 'react-redux';
import { setSelectedListing } from './../../redux/actions/selectedListingActions';

const ListingDetail = (props) => {
	const dispatch = useDispatch();

	const [ ad, setAd ] = useState();
	// const [images, setImages] = useState([]);
	const [ carouselVisibility, setCarouselVisibility ] = useState(false);
	const [ selectedImg, setSelectedImg ] = useState(0);
	//const { selectedAd } = useContext(SelectedListingContext);
	const selectedAd = useSelector((state) => state.global_state.listing);
	console.log(selectedAd);
	useEffect(
		() => {
			async function loadAd(id) {
				const loadedAd = await getAd(id);
				setAd(loadedAd);
			}

			if (selectedAd) {
				loadAd(selectedAd);
				Router.push(`/?listing=${selectedAd}`, `/?listing=${selectedAd}`, { shallow: true });
			}
		},
		[ selectedAd ]
	);

	const close = () => {
		dispatch(setSelectedListing({ listing: undefined }));
	};

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
				<div className="go_back">
					<a onClick={close}>⬅️Go back to search results</a>
				</div>
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
					<img src={marker} />
					{ad.city}, {ad.neighborhood}
				</div>
				<div className="bottom_details">
					<Features listing={ad} />
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

export default ListingDetail;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>
