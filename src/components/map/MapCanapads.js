import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// import { dataLayerClusterCount, dataLayerClusters, dataLayerUnclustered } from './layer_data/layer_data';
import { dataLayerUnclustered } from './layer_data/layer_data';
//import AdPopup from './AdPopup';
import { setSelectedListing } from './../../redux/actions/globalStateActions';

mapboxgl.accessToken = 'pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA';
const useListings = () => {
	return useSelector(
		(state) => ({
			listings: state.listings
		}),
		shallowEqual
	);
};
const MapCanapads = (props) => {
	const dispatch = useDispatch();
	const mapRef = useRef(null);
	// eslint-disable-next-line
	const [ viewPort, setViewPort ] = useState({
		width: 'auto',
		height: '100vh',
		center: [ props.lon, props.lat ],
		zoom: 10,
		maxZoom: 16,
		minZoom: 5
	});
	// eslint-disable-next-line
	const { listings } = useListings();
	const [ myMap, setMap ] = useState(null);
	const initializeMap = ({ setMap, mapRef }) => {
		const map = new mapboxgl.Map({
			container: mapRef.current,
			style: 'mapbox://styles/jebo87/cjlqq3orh50px2rph1d2vnbqd?optimize=true',
			...viewPort
		});
		const flyToStore = (currentFeature) => {
			map.flyTo({
				center: currentFeature.geometry.coordinates,
				zoom: 14
			});
		};
		map.on('load', () => {
			map.addSource('listings', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {
						title: 'placeholder'
					}
				}
			});
			// map.addLayer(dataLayerClusters);
			// map.addLayer(dataLayerClusterCount);
			map.addLayer({
				...dataLayerUnclustered
			});
			setMap(map);
			map.on('click', (e) => {
				console.log('entro al handler');
				var features = map.queryRenderedFeatures(e.point, {
					layers: [ 'listings' ]
				});
				if (features.length) {
					flyToStore(features[0]);

					var coordinates = features[0].geometry.coordinates.slice();
					var listing = features[0].properties;
					dispatch(setSelectedListing({ selected_listing: listing.id }));

					new mapboxgl.Popup()
						.setLngLat(coordinates)
						.setHTML(
							`<div>
									<div>
											${listing.title} 
										<a target="_new" href={"http://en.wikipedia.org/w/index.php?title=Special:Search&search"}>
											Wikipedia
										</a>
									</div>
									<img width=120 src=${listing.image} />
								</div>`
						)
						.addTo(map);
				}
			});
		});
	};

	useEffect(
		() => {
			if (myMap === null) initializeMap({ setMap, mapRef });
		},
		// eslint-disable-next-line
		[ myMap ]
	);

	useEffect(
		() => {
			if (myMap !== null && listings !== undefined) {
				myMap.removeLayer('listings');
				myMap.removeSource('listings');
				myMap.addSource('listings', {
					type: 'geojson',
					data: {
						...listings
					}
				});
				myMap.addLayer({
					...dataLayerUnclustered
				});
				setMap(myMap);
			}
		}, // eslint-disable-next-line
		[ listings, myMap ]
	);

	return <div ref={(el) => (mapRef.current = el)} className="map" />;
};

export default MapCanapads;
