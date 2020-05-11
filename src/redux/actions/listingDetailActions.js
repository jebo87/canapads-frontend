import { getAd } from './../../backend_interface/api_if';
export const setListingDetail = (listingDetail) => ({
	type: 'SET_LISTING_DETAIL',
	listing_detail: listingDetail
});

export const startSetListingDetail = (id) => {
	return async (dispatch) => {
		let listing = await getAd(id);
		dispatch(setListingDetail(listing));
	};
};
