
export function detailsReducer(state={}, action) {
	switch (action.type) {
		case 'FETCHING_DETAILS':
			return {
				...state,
				fetching: true,
			};
		case 'DETAILS_RECEIVED':
			return {
				...state,
				details: action.payload,
				fetching: false,
				notFound: false,
			};
		case 'DETAILS_NOT_FOUND':
			return {
				...state,
				fetching: false,
				notFound: true,
			};
		default:
			return state;
	}
}
