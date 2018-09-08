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
            ads: []
        }
    }

    async componentDidMount() {
        let ads = await getAds();
        // this.setState({ads});
        this.setState(() => ({ ads }));
    }


    render() {
        return (
            <React.Fragment>
                <MkMap ads={this.state.ads} lat={45.429811} lon={-73.598260} />
            </React.Fragment>
        );
    }
}
export default HomePage;

