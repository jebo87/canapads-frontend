export const setListings = (listings) => ({
	type: 'SET_LISTINGS',
	listingList: { ...listings }
});
