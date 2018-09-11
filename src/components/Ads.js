import React from 'react'
import AdBox from './AdBox'


export default class Ads extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.ads)
        return (
            <div className="box_ads">
                {

                    this.props.ads.features && this.props.ads.features.map(feature => {
                        console.log('addking');
                        return (<AdBox key={feature.properties.id} feature={feature} />)

                    })



                }

            </div>
        )


    }
}
