import React from 'react';
import SmallImage from './SmallImage';

export default class Carousel extends React.Component {
    imageCount = 0;

    constructor(props) {
        super(props);
        this.state = {
            selectedImg: 0
        }
        this.imageCount = this.props.images.length;
    }


    changeImage = (index) => {
        this.setState(() => ({ selectedImg: index }))
    }

    moveRight = () => {
        let newIndex = 0;
        this.state.selectedImg + 1 >= this.imageCount ? newIndex : newIndex = this.state.selectedImg + 1
        this.setState(() => ({ selectedImg: newIndex }))
    }
    moveLeft = () => {
        let newIndex = this.imageCount - 1;
        this.state.selectedImg - 1 > 0 ? newIndex = this.state.selectedImg - 1 : newIndex;
        this.setState(() => ({ selectedImg: newIndex }))
    }

    render() {
        return (
            <div className="carousel">

                <div className="showcase img-fluid">
                    <a className="close" onClick={this.props.toggleCarousel}>close</a>
                    <a className="prev" onClick={this.moveLeft}>&#10094;</a>
                    <a className="next" onClick={this.moveRight}>&#10095;</a>

                    <img className="img-fluid" src={this.props.images[this.state.selectedImg]} alt="" />
                </div>
                <div className="thumbnails">

                    {
                        this.props.images.map((image, index) => {

                            if (this.state.selectedImg == index) {
                                return (
                                    <SmallImage selected={true} image={image} index={index} key={index} changeImage={this.changeImage} />
                                )
                            } else {
                                return (
                                    <SmallImage selected={false} image={image} index={index} key={index} changeImage={this.changeImage} />
                                )
                            }
                        })
                    }
                </div>
            </div>

        )
    }
}

