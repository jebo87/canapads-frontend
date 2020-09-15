import React, { useState } from 'react';
import SmallImage from './SmallImage';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Carousel = (props) => {
	const [ imageCount ] = useState(props.images.length);
	const [ selectedImg, setSelectedImg ] = useState(props.selected);
	const [ xCoord, setXCoord ] = useState(Math.floor(imageCount / 2 - props.selected) * 105);

	const changeImage = (index) => {
		setSelectedImg(index);
		calculateCoorX(index);
	};

	const calculateCoorX = (index) => {
		var temp = selectedImg;
		var diff = index - temp;
		// console.log(`diff = ${index} - ${temp} = ${diff} moving ${xCoord - diff * 60}`);
		setXCoord(xCoord - diff * 105);
	};

	const moveRight = () => {
		let newIndex = selectedImg + 1 >= imageCount ? 0 : selectedImg + 1;
		setSelectedImg(newIndex);
		calculateCoorX(newIndex);
	};
	const moveLeft = () => {
		let newIndex = imageCount - 1;
		newIndex = selectedImg - 1 >= 0 ? selectedImg - 1 : newIndex;
		setSelectedImg(newIndex);
		calculateCoorX(newIndex);
	};

	const afterModalOpen = () => {};

	return (
		<Modal
			isOpen={!!props.visibility}
			onAfterOpen={afterModalOpen}
			onRequestClose={() => {
				console.log('closing');
			}}
			contentLabel="Selected Option"
			closeTimeoutMS={1}
			className="modal"
		>
			<div className="carousel">
				<div className="showcase img-fluid">
					<button className="close" onClick={props.toggleCarousel}>
						<span />
					</button>
					<button className="prev" onClick={moveLeft}>
						<div>&#10094;</div>
					</button>
					<button className="next" href="#" onClick={moveRight}>
						&#10095;
					</button>

					<img className="img-fluid" src={props.images[selectedImg]} alt="" />
				</div>
				<div className="thumbnails">
					{props.images.map((image, index) => {
						return (
							<SmallImage
								xCoord={xCoord}
								selected={selectedImg === index ? true : false}
								image={image}
								index={index}
								key={index}
								changeImage={changeImage}
							/>
						);
					})}
				</div>
			</div>
		</Modal>
	);
};

export default Carousel;
