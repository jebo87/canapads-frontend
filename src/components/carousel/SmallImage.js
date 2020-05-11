import React from 'react';

const SmallImage = (props) => {
	const changeImage = () => {
		props.changeImage(props.index);
	};
	return (
		<div
			style={{
				transition: 'transform .5s'
			}}
			className={`small-image ${props.selected ? 'selected' : ''}`}
		>
			<img src={props.image} onClick={changeImage} alt="" />
		</div>
	);
};
export default SmallImage;
