const dataLayerUnclustered = {
	id: 'listings',
	type: 'symbol',
	source: 'listings',
	filter: [ '!', [ 'has', 'point_count' ] ],
	layout: {
		'icon-image': 'canapads-pin',
		'icon-size': 1,
		'icon-allow-overlap': true
	},
	paint: {
		'icon-opacity': 1
	}
};

const dataLayerClusterCount = {
	id: 'cluster-count',
	type: 'symbol',
	source: 'listings',
	filter: [ 'has', 'point_count' ],
	layout: {
		'text-field': '{point_count_abbreviated}',
		'text-font': [ 'DIN Offc Pro Medium', 'Arial Unicode MS Bold' ],
		'text-size': 12
	},
	paint: {
		'text-color': '#ffffff'
	}
};

const dataLayerClusters = {
	id: 'clusters',
	type: 'circle',
	source: 'listings',
	filter: [ 'has', 'point_count' ],
	paint: {
		// Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
		// with three steps to implement three types of circles:
		//   * Blue, 20px circles when point count is less than 100
		//   * Yellow, 30px circles when point count is between 100 and 750
		//   * Pink, 40px circles when point count is greater than or equal to 750
		'circle-color': [ 'step', [ 'get', 'point_count' ], '#4692ee', 100, '#4692ee', 750, '#4692ee' ],
		'circle-radius': [ 'step', [ 'get', 'point_count' ], 20, 100, 30, 750, 40 ]
	}
};

export { dataLayerClusterCount, dataLayerClusters, dataLayerUnclustered };
