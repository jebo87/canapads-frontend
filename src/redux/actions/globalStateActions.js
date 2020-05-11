export const setSelectedListing = (selectedListing) => ({
	type: 'SET_SELECTED',
	global_state: selectedListing
});
export const invalidateStore = (newState) => ({
	type: 'INVALIDATE_STORE',
	global_state: newState
});
