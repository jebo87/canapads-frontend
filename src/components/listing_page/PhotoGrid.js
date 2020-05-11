import React, { useState } from 'react';
import Carousel from '../carousel/Carousel';
const PhotoGrid = (listing) => {
	const [ carouselVisibility, setCarouselVisibility ] = useState(false);
	const [ selectedImg, setSelectedImg ] = useState(0);

	const toggleImages = () => {
		setCarouselVisibility(!carouselVisibility);
	};

	const changeImage = (index) => {
		console.log('changing image to', index);
		setSelectedImg(index);
		toggleImages();
	};
	// const getThumbnails = () => {
	// 	listing.images.map((image) => {
	// 		console.log(image);
	// 		return <img src={image} alt="" />;
	// 	});
	// };
	return (
		<div className="photo_grid">
			{carouselVisibility && (
				<Carousel selected={selectedImg} images={listing.images} toggleCarousel={toggleImages} />
			)}
			<div className="grid_container">
				{listing.images &&
					listing.images.map((image, i) => {
						if (i < 6) {
							return (
								<div className={`image_item_${i}`} key={i}>
									<img
										onClick={(e) => changeImage(i)}
										index={i}
										src={image}
										className="listing_image"
										alt=""
									/>
								</div>
							);
						}
						return null;
					})}
			</div>

			{carouselVisibility && (
				<Carousel
					selected={selectedImg}
					images={listing.images}
					visibility={true}
					toggleCarousel={toggleImages}
				/>
			)}
		</div>
	);
};

export default PhotoGrid;
