import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { setFilters } from './../../redux/actions/filterActions';
import { invalidateStore } from './../../redux/actions/globalStateActions';
import { defaultParamsMap } from './../filters/defaultFilters';
import FreeDraw from 'mapbox-gl-draw-freehand-mode';
// import { dataLayerClusterCount, dataLayerClusters, dataLayerUnclustered } from './layer_data/layer_data';
import { dataLayerUnclustered } from './layer_data/layer_data';
//import AdPopup from './AdPopup';
import { setSelectedListing } from './../../redux/actions/globalStateActions';
const token = process.env.REACT_APP_MAPBOX_TOKEN;
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
	const filter = useSelector((state) => state.filters);
	const [ localFilter, setLocalFilter ] = useState({ ...defaultParamsMap, ...filter });
	const mapRef = useRef(null);
	const [ reset, setReset ] = useState(false);
	mapboxgl.accessToken = token;
	// eslint-disable-next-line
	const [ viewPort, setViewPort ] = useState({
		width: 'auto',
		height: '100vh',
		center: [ props.lon, props.lat ],
		zoom: 10,
		maxZoom: 16,
		minZoom: 5
	});
	var draw = new MapboxDraw({
		modes: Object.assign(MapboxDraw.modes, {
			draw_polygon: FreeDraw
		}),
		displayControlsDefault: false,
		controls: {
			polygon: true,
			trash: true
		}
	});
	// eslint-disable-next-line
	const { listings } = useListings();
	const [ myMap, setMap ] = useState(null);

	const performSearch = () => {
		if (!reset) {
			dispatch(setFilters({ ...filter, ...localFilter }));
		} else {
			let tempFilter = filter;
			delete tempFilter.polygon;
			dispatch(setFilters({ ...tempFilter }));
		}
		dispatch(invalidateStore({ store_invalid: true }));
	};

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

		map.addControl(draw, 'top-left');

		map.on('draw.create', searchFromMap);
		map.on('draw.delete', searchFromMap);
		map.on('draw.update', searchFromMap);
	};

	const searchFromMap = async (e) => {
		console.log(e);
		var data = draw.getAll();

		let geo_search = {
			polygon: { points: [] }
		};

		if (data.features.length > 0) {
			var coords = data.features[0].geometry.coordinates[0];
			coords.forEach((element) => {
				geo_search.polygon.points.push({ lon: element[0], lat: element[1] });
			});
			var newFilter = {
				...localFilter,
				...geo_search
			};
			setReset(false);
			setLocalFilter(newFilter);
			//In case a new polygon is being created, we need to delete the previous one
			//to have only one polygon available on screen.
			let pids = [];
			const lid = data.features[data.features.length - 1].id;
			data.features.forEach((f) => {
				//make sure you are deleting all the other polygons
				//different to the one that was just drawn
				if (f.geometry.type === 'Polygon' && f.id !== lid) {
					pids.push(f.id);
				}
			});
			draw.delete(pids);
		} else {
			setReset(true);
			setLocalFilter({ ...localFilter });
		}
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
			performSearch();
		},
		[ localFilter ]
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
