import React from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = "pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA"

export default class MkMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: [],
            lat:0,
            lon:0
        }



    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
       
        this.setState({ ...nextProps })

    }

    componentDidMount = () => {
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [this.props.lon, this.props.lat],
            zoom: 10,
            maxZoom:16,
            minZoom:10,
            // style: 'mapbox://styles/jebo87/cjlpc2y7q5q982rtbah0skhnf'
            style: 'mapbox://styles/jebo87/cjlqq3orh50px2rph1d2vnbqd'
        });
        if(this.state.ads)
        this.map.on('load', () => { this.load(this.map, this.state.ads,this.popup) });
    }
    load = (map, ads,popup) => {

        console.log(ads);
        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true. GL-JS will add the point_count property to your source data.
        map.addSource("listings", {
            type: "geojson",
            data: ads,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: "listings",
            filter: ["has", "point_count"],
            paint: {
                // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                "circle-color": [
                    "step",
                    ["get", "point_count"],
                    "#51bbd6",
                    100,
                    "#f1f075",
                    750,
                    "#f28cb1"
                ],
                "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "listings",
            filter: ["has", "point_count"],
            layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12
            }
        });

        map.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "listings",
            filter: ["!", ["has", "point_count"]],
            layout:{
                "icon-image":"canapad",
                "icon-size":1
            }
            
        });
        // map.addLayer({
        //     id: "unclustered-point",
        //     type: "circle",
        //     source: "listings",
        //     filter: ["!", ["has", "point_count"]],
        //     paint: {
        //         "circle-color": "#11b4da",
        //         "circle-radius": 4,
        //         "circle-stroke-width": 1,
        //         "circle-stroke-color": "#fff"
        //     }
        // });

        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('listings').getClusterExpansionZoom(clusterId, function (err, zoom) {
                if (err)
                    return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'unclustered-point', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
             var win = window.open('http://localhost:8087/ads/'+features[0].properties.id)
             win.focus();
            
        });
        

        map.on('mouseenter', 'unclustered-point', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            popup.setLngLat(e.features[0].geometry.coordinates.slice()).
                setHTML(e.features[0].properties.title).
                addTo(map)

        });
        map.on('mouseleave', 'unclustered-point', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
        // //in case we need coordinates to debug
        // map.on('mousemove', function (e) {
            
        //         // // e.point is the x, y coordinates of the mousemove event relative
        //         // // to the top-left corner of the map
        //         // JSON.stringify(e.point) 
        //         // e.lngLat is the longitude, latitude geographical position of the event
        //         console.log(JSON.stringify(e.lngLat));
        // });


    }
    componentWillUnmount = () => {
        this.map.remove();
    }

    render = () => {


        return <div id="map" className="map" ref={el => this.mapContainer = el} />;
    }



}