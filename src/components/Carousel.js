import React from 'react';

export default class Carousel extends React.Component {
    imgSelected = '';
    indexSelected = 0;

    constructor(props){
        super(props)
    }


    changeImage=(index)=>{
        console.log(index);
    }

   

    render() {
        return (
            <div className="carousel">

                <div className="showcase img-fluid">
                    <a className="close" onClick={this.props.toggleCarousel}>close</a>
                    <a className="prev" >&#10094;</a>
                    <a className="next">&#10095;</a>

                    <img className="img-fluid" src={this.props.images[0]} alt="" />
                </div>
                <div className="thumbnails">
                    <div className="small-image">
                        {
                            this.props.ad && this.props.images.map((image,index)=>{
                                <img onClick={this.changeImage(index)} />
                            })
                        }


                    </div>
                </div>
            </div>

        )
    }
}

