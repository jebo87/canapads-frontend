import ReactMapGL, { Popup, FlyToInterpolator, Source, Layer } from 'react-map-gl';
import { useState, useEffect, useRef } from 'react';
import AdPopup from './AdPopup';
import { dataLayerClusterCount, dataLayerClusters, dataLayerUnclustered } from './layer_data/layer_data';
//mapboxgl.accessToken = "pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA";

const MkMap = (props) => {
	//TODO: set mapbox token via environment variable and allow only canapads.ca to use it
	//https://docs.mapbox.com/accounts/overview/tokens/#url-restrictions

	const [ viewPort, setViewPort ] = useState({
		width: 'auto',
		height: '100vh',
		latitude: props.lat,
		longitude: props.lon,
		zoom: 10,
		maxZoom: 16,
		minZoom: 2
	});
	const [ popupInfo, setPopupInfo ] = useState(null);

	const _renderPopup = () => {
		return (
			popupInfo && (
				<Popup
					tipSize={5}
					anchor="top"
					longitude={popupInfo.longitude}
					latitude={popupInfo.latitude}
					closeOnClick={false}
					onClose={() => setPopupInfo(null)}
				>
					<AdPopup ad={popupInfo.properties} />
				</Popup>
			)
		);
	};
	const _onClick = (event) => {
		// either
		const feature = event.features.find((f) => f.layer.id === 'clusters' || f.layer.id === 'unclustered-point');

		if (feature) {
			if (feature.layer.id === 'clusters') {
				setViewPort({
					...viewPort,
					longitude: feature.geometry.coordinates[0],
					latitude: feature.geometry.coordinates[1],
					zoom: viewPort.zoom + 1,
					transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
					transitionDuration: 'auto'
				});
			} else {
				setPopupInfo({
					longitude: feature.geometry.coordinates[0],
					latitude: feature.geometry.coordinates[1],
					properties: feature.properties
				});
			}
		}
	};
	const _onMouseOver = (event) => {
		if (event.features != undefined && event.features.length > 0) {
			const feature = event.features.find((f) => f.layer.id === 'unclustered-point');

			if (feature) {
				setPopupInfo({
					longitude: feature.geometry.coordinates[0],
					latitude: feature.geometry.coordinates[1],
					properties: feature.properties
				});
			}
		}
	};

	return (
		<div className="map" id="map">
			<ReactMapGL
				onClick={_onClick}
				{...viewPort}
				width="auto" // It always override the view(viewport) width state.
				mapStyle="mapbox://styles/jebo87/cjlqq3orh50px2rph1d2vnbqd"
				mapboxApiAccessToken="pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA"
				onViewportChange={(viewport) => setViewPort(viewport)}
				// interactiveLayerIds={['unclustered - point']}
			>
				{_renderPopup()}

				{props.ads && (
					<Source
						type="geojson"
						id="listings"
						{...{ cluster: true, clusterMaxZoom: 14, clusterRadius: 50 }}
						data={props.ads}
					>
						<Layer {...dataLayerClusters} />
						<Layer {...dataLayerClusterCount} />
						<Layer {...dataLayerUnclustered} />
					</Source>
				)}
			</ReactMapGL>
		</div>
	);
};

export default MkMap;
