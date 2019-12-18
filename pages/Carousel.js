import React from 'react';
import SmallImage from '../components/SmallImage';

export default class Carousel extends React.Component {
	imageCount = 0;

	constructor(props) {
		super(props);
		this.imageCount = this.props.images.length;
		this.state = {
			selectedImg: props.selected,
			xCoord: Math.floor(this.imageCount / 2 - props.selected) * 105
		};

		// console.log(`lenght ${this.imageCount} selected ${props.selected}`);
	}

	changeImage = (index) => {
		this.setState(() => ({ selectedImg: index }));
		this.calculateCoorX(index);
	};

	calculateCoorX = (index) => {
		var temp = this.state.selectedImg;
		var diff = index - temp;
		// console.log(`diff = ${index} - ${temp} = ${diff} moving ${this.state.xCoord - diff * 60}`);
		this.setState(() => ({ xCoord: this.state.xCoord - diff * 105 }));
	};

	moveRight = () => {
		let newIndex = 0;
		this.state.selectedImg + 1 >= this.imageCount ? newIndex : (newIndex = this.state.selectedImg + 1);
		this.setState(() => ({ selectedImg: newIndex }));
		this.calculateCoorX(newIndex);
	};
	moveLeft = () => {
		let newIndex = this.imageCount - 1;
		this.state.selectedImg - 1 > 0 ? (newIndex = this.state.selectedImg - 1) : newIndex;
		this.setState(() => ({ selectedImg: newIndex }));
		this.calculateCoorX(newIndex);
	};

	render() {
		return (
			<div className="carousel">
				<div className="showcase img-fluid">
					<a className="close" onClick={this.props.toggleCarousel} />
					<a className="prev" onClick={this.moveLeft}>
						<div>&#10094;</div>
					</a>
					<a className="next" onClick={this.moveRight}>
						&#10095;
					</a>

					<img className="img-fluid" src={this.props.images[this.state.selectedImg]} alt="" />
				</div>
				<div className="thumbnails">
					{this.props.images.map((image, index) => {
						return (
							<SmallImage
								xCoord={this.state.xCoord}
								selected={this.state.selectedImg == index ? true : false}
								image={image}
								index={index}
								key={index}
								changeImage={this.changeImage}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
