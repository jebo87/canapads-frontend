import React from 'react'
import Ads from "./Ads"
import MkMap from './MkMap';
import { getAds } from './../backend_interface/api_if'




// const Map = ReactMapboxGl({
//     accessToken: "pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA"
// });

// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.MapboxAccessToken;


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: {
                features: []
            }
        }
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    componentDidMount() {
        this.loadAds();
    }

    loadAds = async () => {
        let ads = await getAds();
        var i;
        await getAds();
        // this.setState({ads});
        console.log("ads received.");
        this.setState(() => ({ ads }));
    }


    render() {
        return (
            <div className="home_page">
                <div className="map_search">
                    <div className="left_box">
                        <Ads ads={this.state.ads} />

                    </div>
                    <div className="right_box">

                        <MkMap ads={this.state.ads} lat={45.527065} lon={-73.653534} />
                    </div>
                </div>
            </div>
        );
    }
}
export default HomePage;

