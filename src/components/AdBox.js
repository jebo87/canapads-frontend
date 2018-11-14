import React from 'react';

const AdListMap = (props) => {
    const cost = "$" + (props.feature.properties.price).toFixed().
        replace(/\d(?=(\d{3}))/g, '$&,') + " / Month"
    return (
        <div className="box">
            <a href={'/ad-detail/'+props.feature.properties.id} target="_blank">
                <div className="info_box">
                    <div className="info_box_top">
                        <span className="neighborhood">{props.feature.properties.neighborhood}</span>
                        <span className="bedrooms">{props.feature.properties.bedrooms} bedrooms</span>

                    </div>
                    <div className="info_box_bottom">
                        <span className="cost">{cost}</span>

                    </div>


                </div>
                <img className="box_image" src={props.feature.properties.image} alt="" />
            </a>
        </div>
    )
}


export default AdListMap;


