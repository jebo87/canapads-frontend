import React from 'react'
import AdBox from './AdBox'
import Header from './Header';


export default class Ads extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment >
                <Header />

                <div className="box_ads">
                    {

                        this.props.ads.features && this.props.ads.features.map(feature => {
                            return (<AdBox key={feature.properties.id} feature={feature} />)

                        })



                    }

                </div>
            </React.Fragment>
        )


    }
}
