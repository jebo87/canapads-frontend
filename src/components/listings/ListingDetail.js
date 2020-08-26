import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { useSelector, useDispatch } from 'react-redux';
import Carousel from './../carousel/Carousel';
import marker from '../../images/listing_detail/icons8-marker.png';
import SmallImage from './../carousel/SmallImage';
import Features from './Features';

import { setListingDetail } from './../../redux/actions/listingDetailActions';

const ListingDetail = () => {
	const dispatch = useDispatch();

	// const [images, setImages] = useState([]);
	const [ carouselVisibility, setCarouselVisibility ] = useState(false);
	const [ selectedImg, setSelectedImg ] = useState(0);
	//const { selectedAd } = useContext(SelectedListingContext);
	const selectedAd = useSelector((state) => state.listing_detail);
	//	console.log(selectedAd);
	useEffect(
		() => {
			console.log(selectedAd);
		},
		[ selectedAd ]
	);

	const close = () => {
		dispatch(setListingDetail({}));
	};

	const toggleImages = () => {
		setCarouselVisibility(!carouselVisibility);
	};

	const changeImage = (index) => {
		setSelectedImg(index);
	};
	// const getThumbnails = () => {
	// 	ad.images.map((image) => {
	// 		return <img src={image} alt="" />;
	// 	});
	// };

	if (selectedAd === undefined || selectedAd.id === undefined)
		return <div className="ad-detail">Loading listing details...</div>;
	else {
		const cost = '$' + selectedAd.price.toFixed().replace(/\d(?=(\d{3}))/g, '$&,') + ' /mo';
		return (
			<div className="ad-detail">
				<div className="go_back">
					<button onClick={close}>⬅️ Go back to search results</button>
				</div>
				{carouselVisibility && (
					<Carousel
						selected={selectedImg}
						images={selectedAd.images}
						visibility={true}
						toggleCarousel={toggleImages}
					/>
				)}

				<div className="photos">
					<div className="photo-big">
						<button onClick={toggleImages} href="#">
							<img src={selectedAd.images[selectedImg]} alt="" />
						</button>
					</div>
					<div className="small-photos">
						{selectedAd.images.map((image, key) => (
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
				<div className="bottom_details">
					<h2>
						{selectedAd.title} {cost}
					</h2>
					<div className="location">
						<img alt="" src={marker} />
						{selectedAd.city}, {selectedAd.neighborhood}
					</div>
					<Features listing={selectedAd} />
					<div className="description">
						<h4>Description:</h4>
						<ReactMarkdown source={selectedAd.description} />
					</div>

					<a
						target="_blank"
						className="more-details"
						rel="noopener noreferrer"
						href={`/details/${selectedAd.id}`}
					>
						More Details
					</a>
				</div>
			</div>
		);
	}
};

export default ListingDetail;

// <div className="loading">
//                     <img src="../../../assets/img/loading.gif" alt="" />
//                 </div>
