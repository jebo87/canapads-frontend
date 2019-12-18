import React from 'react';

export default class SmallImage extends React.Component {
	constructor(props) {
		super(props);
	}

	changeImage = () => {
		this.props.changeImage(this.props.index);
	};
	render() {
		return (
			<div
				style={{
					transform: `translateX(${this.props.xCoord}px)`,
					transition: 'transform .5s'
				}}
				className={`small-image ${this.props.selected ? 'selected' : ''}`}
			>
				<img src={this.props.image} onClick={this.changeImage} />
			</div>
		);
	}
}
