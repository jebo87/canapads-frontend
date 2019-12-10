import React from 'react';

const AdListMap = (props) => {
    const cost = "$" + (props.feature.properties.price).toFixed().
        replace(/\d(?=(\d{3}))/g, '$&,');
    return (
        <div className="box">
            <div className="price_tag">
                <span className="cost">{cost}</span>
            </div>
            <a href={'/ad-detail/' + props.feature.properties.id} target="_blank">
                <div className="info_box">

                    <div className="info_box_bottom">
                        <span className="bedrooms">{props.feature.properties.bedrooms} bedrooms</span>
                        <span className="bathrooms">{props.feature.properties.bathrooms} bathrooms</span>

                    </div>



                </div>
                <img className="box_image" src={props.feature.properties.image} alt="" />
            </a>
        </div>
    )
}


export default AdListMap;


