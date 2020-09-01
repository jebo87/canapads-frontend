import HomeAd from '../model/ads';
import fetch from 'isomorphic-unfetch';
import Filter from '../model/filters';
//import getConfig from 'next/config';

const https = require('https');
//const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const _API_ = process.env.REACT_APP_API_URL;
const agent = new https.Agent({
	rejectUnauthorized: false
});
const getAd = async (id) => {
	const url = `${_API_}/ads/${id}`;

	const data = await fetch(url, {
		agent,
		mode: 'cors',
		headers: {
			'Access-Control-Request-Method': 'GET'
		}
	});
	const ad = await data.json();
	const adNew = new HomeAd(
		ad['id'],
		ad['title'],
		ad['description'],
		ad['city'],
		ad['country'],
		ad['images'],
		ad['price'],
		ad['published'],
		ad['userad_id'],
		ad['rooms'],
		ad['propertyType'],
		ad['pets'],
		ad['furnished'],
		ad['garages'],
		ad['rentByOwner'],
		ad['last_updated'],
		ad['featured'],
		ad['location'],
		ad['bathrooms'],
		ad['view_count'],
		ad['street'],
		ad['postal_code'],
		ad['state_province'],
		ad['neighborhood'],
		ad['house_number'],
		ad['published_date'],
		ad['gym'],
		ad['pool']
	);

	return adNew;
};
const isUserLoggedIn = async () => {
	if (localStorage.getItem('makako_token')) {
		const url = `https://bouncer.canapads.ca/userinfo`;
		return await fetch(url, {
			mode: 'cors',
			headers: {
				'Access-Control-Request-Method': 'GET',
				'Access-Control-Request-Headers': 'Authorization',
				Authorization: 'Bearer ' + localStorage.getItem('makako_token')
			}
		})
			.then((data) => data.json())
			.then((data) => {
				if (data.error) {
					return false;
				} else {
					return true;
				}
			})
			.catch((err) => false);
	} else {
		return false;
	}
};

const getLoggedInUser = async () => {
	if (isUserLoggedIn) {
		if (localStorage.getItem('makako_token')) {
			const url = `https://bouncer.canapads.ca/userinfo`;
			return await fetch(url, {
				mode: 'cors',
				headers: {
					'Access-Control-Request-Method': 'GET',
					'Access-Control-Request-Headers': 'Authorization',
					Authorization: 'Bearer ' + localStorage.getItem('makako_token')
				}
			})
				.then((data) => data.json())
				.then((data) => {
					if (data.error) {
						return null;
					} else {
						return data;
					}
				})
				.catch((err) => null);
		} else {
			return null;
		}
	}
	return null;
};

const loadUserListings = async (user_id) => {
	const url = `${_API_}/${user_id}/listings`;

	const data = await fetch(url, {
		mode: 'cors',
		agent,
		method: 'POST',
		headers: {
			'Access-Control-Request-Method': 'POST',

			'Access-Control-Request-Headers': 'Authorization',
			Authorization: 'Bearer ' + localStorage.getItem('makako_token')
		},
		body: user_id
	});
	const result = await data.json();
	return result;
};

// const getCount = async () => {
// 	const url = `${_API_}/ad_count`;
// 	const data = await fetch(url, {
// 		mode: 'cors',
// 		agent,
// 		headers: {
// 			'Access-Control-Request-Method': 'GET'
// 			// 'Access-Control-Request-Headers': 'Authorization',
// 			// Authorization: 'Bearer ' + localStorage.getItem('makako_token')
// 		}
// 	});

// 	const count = data.json();

// 	return count;
// };

const getAds = async (filters) => {
	//var loggedIn = await isUserLoggedIn();
	//console.log(loggedIn, ' logged in status');
	//if (loggedIn) {

	const url = `${_API_}/ads`;
	var filter = new Filter({ ...filters });

	const data = await fetch(url, {
		mode: 'cors',
		agent,
		method: 'POST',
		headers: {
			'Access-Control-Request-Method': 'POST',

			'Content-Type': 'application/json'
			// 'Access-Control-Request-Headers': 'Authorization',
			// Authorization: 'Bearer ' + localStorage.getItem('makako_token')
		},
		body: JSON.stringify(filter.toJSON())
	});

	const searchResponse = await data.json();
	const adsArray = searchResponse.list;
	const count = searchResponse.count;
	let ads = [];
	if (adsArray === undefined || adsArray.ads === undefined) {
		return {};
	}
	adsArray.ads.map((ad) => {
		const adNew = new HomeAd(
			ad['id'],
			ad['title'],
			ad['description'],
			ad['city'],
			ad['country'],
			ad['images'],
			ad['price'],
			ad['published'],
			ad['userad_id'],
			ad['rooms'],
			ad['propertyType'],
			ad['pets'],
			ad['furnished'],
			ad['garages'],
			ad['rentByOwner'],
			ad['last_updated'],
			ad['featured'],
			ad['location'],
			ad['bathrooms'],
			ad['view_count'],
			ad['street'],
			ad['postal_code'],
			ad['state_province'],
			ad['neighborhood'],
			ad['house_number'],
			ad['published_date'],
			ad['gym'],
			ad['pool']
		);
		// console.log(adNew);
		ads.push(adNew);
		return adNew;
	});
	const geoJson = convertToGeoJSON(ads, count);

	return geoJson;
	// } else {
	// 	return '';
	// }
};

const convertToGeoJSON = (ads, count) => {
	let data = {
		count: count,
		type: 'FeatureCollection',
		features: []
	};

	ads.map((ad) => {
		let myAd = {
			type: 'Feature',
			properties: {
				id: ad['id'],
				title: ad['title'],
				description: ad['description'],
				price: ad['price'],
				image: ad['images'][0],
				bedrooms: ad['rooms'],
				bathrooms: ad['bathrooms'],
				neighborhood: ad['neighborhood'],
				lon: ad['location']['lon'],
				lat: ad['location']['lat']
			},
			geometry: {
				type: 'Point',
				coordinates: [ ad['location']['lon'], ad['location']['lat'] ]
			}
		};
		data.features.push(myAd);

		return myAd;
	});

	return data;
};

export { getAds, getAd, getLoggedInUser, loadUserListings };
