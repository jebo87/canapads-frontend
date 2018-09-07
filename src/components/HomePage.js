import React from 'react'
import Ads from "./Ads"
import { StaticMap, FlyToInterpolator } from 'react-map-gl';
import DeckGL, { IconLayer } from 'deck.gl';
import IconClusterLayer from './icon-cluster';
import icon from './../images/location-icon-atlas.png';
import location_data from './../data/location-icon-mapping.json';
import DATA_URL from './../data/data.json';


// const Map = ReactMapboxGl({
//     accessToken: "pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA"
// });

// Set your mapbox token here
// const MAPBOX_TOKEN = process.env.MapboxAccessToken;
const MAPBOX_TOKEN = "pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA"



export const INITIAL_VIEW_STATE = {
    // latitude: 45.5289,
    // longitude: -73.6558,
    longitude: -73.598260,
    latitude: 45.429811,
    zoom: 13,
    maxZoom: 20,
    pitch: 0,
    bearing: 0
};

const stopPropagation = evt => evt.stopPropagation();
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            hoveredItems: null,
            expanded: false,
            viewState: {...INITIAL_VIEW_STATE}
        };
        this._onViewStateChange = this._onViewStateChange.bind(this);
        this._onHover = this._onHover.bind(this);
        this._onClick = this._onClick.bind(this);
        this._closePopup = this._closePopup.bind(this);
        this._renderhoveredItems = this._renderhoveredItems.bind(this);
    }

    _onHover(info) {
        if (this.state.expanded) {
            return;
        }

        const { x, y, object } = info;
        const z = info.layer.state.z;
        const { showCluster = true } = this.props;

        let hoveredItems = null;

        if (object) {
            if (showCluster) {
                hoveredItems = object.zoomLevels[z].points.sort((m1, m2) => m1.id - m2.id);
            } else {
                hoveredItems = [object];
            }
        }

        this.setState({ x, y, hoveredItems, expanded: false });
    }

    _onClick(info) {
        const z = info.layer.state.z;
        console.log(info.object)
        const { showCluster = true } = this.props;
        if (info.object) {
            if (showCluster) {
                this._onViewStateChange(
                    {
                        viewState:
                        {
                            ...this.state.viewState,

                            zoom: this.state.viewState.zoom + 1,
                            latitude: info.object.coordinates[1],
                            longitude: info.object.coordinates[0],

                            transitionDuration: 500,
                            transitionInterpolator: new FlyToInterpolator()
                        }
                    }
                );


                console.log('state changed')
            } else {

            }
        }
    }

    _onPopupLoad(ref) {
        if (ref) {
            // React events are triggered after native events
            ref.addEventListener('wheel', stopPropagation);
        }
    }

    _closePopup() {
        this.setState({ expanded: false, hoveredItems: null });
    }

    _renderhoveredItems () {
        const { x, y, hoveredItems, expanded } = this.state;

        if (!hoveredItems) {
            return null;
        }

        if (expanded) {
            return (
                <div
                    className="tooltip interactive"
                    ref={this._onPopupLoad}
                    style={{ left: x, top: y }}
                    onMouseLeave={this._closePopup}
                >
                    {hoveredItems.map(({ id, title, address, rooms, coordinates }) => {
                        return (
                            <div key={id}>
                                <h5>{title}</h5>
                                <div>address: {address || 'unknown'}</div>
                                <div>rooms: {rooms}</div>

                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="tooltip" style={{ left: x, top: y }}>
                {hoveredItems.slice(0, 20).map(({ id, title, address }) => (
                    <div key={id}>
                        <h5>
                            {title} {address}
                        </h5>
                    </div>
                ))}
            </div>
        );
    }

    _renderLayers() {
        const {
            data = DATA_URL,
            iconMapping = location_data,
            iconAtlas = icon,
            showCluster = true,
            viewState
        } = this.props;

        const layerProps = {
            data,
            pickable: true,
            getPosition: d => d.coordinates,
            iconAtlas,
            iconMapping,
            onHover: this._onHover,
            onClick: this._onClick,
            sizeScale: 60
        };

        const size = viewState ? Math.min(Math.pow(1.5, viewState.zoom - 10), 1) : 0.1;

        const layer = showCluster
            ? new IconClusterLayer({ ...layerProps, id: 'icon-cluster' })
            : new IconLayer({
                ...layerProps,
                id: 'icon',
                getIcon: d => 'marker',
                getSize: size
            });

        return [layer];
    }
    _onViewStateChange ({ viewState }) {

        this.setState({ viewState });
    }
    render() {
        const { controller = true, baseMap = true } = this.props;


        return (
            <React.Fragment>
                <DeckGL
                    layers={this._renderLayers()}
                    initialViewState={INITIAL_VIEW_STATE}
                    viewState={this.state.viewState}
                    controller={controller}
                    onViewStateChange={this._onViewStateChange}
                >
                    {baseMap && (
                        <StaticMap
                            reuseMaps
                            mapStyle="mapbox://styles/jebo87/cjlqq3orh50px2rph1d2vnbqd"
                            preventStyleDiffing={true}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                        />
                    )}

                    {this._renderhoveredItems}
                </DeckGL>

            </React.Fragment>
        );
    }
}

export default HomePage;

// <Ads />
// <Map
//     style="mapbox://styles/mapbox/streets-v9"
//     containerStyle={{
//         height: "100vh",
//         width: "100vw"
//     }}>
//         <Layer
//         type="symbol"
//         id="marker"
//         layout={{ "icon-image": "marker-15" }}>
//         <Feature coordinates={[ -73.9749, 40.7736]}/>
//         </Layer>
//     </Map>