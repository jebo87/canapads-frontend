import React from 'react';
import Link from 'next/link';
const AdBox = (props) => {
    const cost = "$" + (props.feature.properties.price).toFixed().
        replace(/\d(?=(\d{3}))/g, '$&,');
    return (
        <div className="box">
            <div className="price_tag">
                <span className="cost">{cost}</span>
            </div>
            <Link href="/details/[id]" as={`/details/${props.feature.properties.id}`}>
                <a target="_blank">

                    <div className="info_box">

                        <div className="info_box_bottom">
                            <span className="bedrooms">{props.feature.properties.bedrooms} bedrooms</span>
                            <span className="bathrooms">{props.feature.properties.bathrooms} bathrooms</span>

                        </div>



                    </div>
                    <img className="box_image" src={props.feature.properties.image} alt="" />
                </a>
            </Link>
        </div>
    )
}


export default AdBox;


