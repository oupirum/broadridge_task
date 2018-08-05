import {combineReducers} from 'redux';

function listReducer(state={tasks:[], sortBy: 'name', sortDir: 'asc', nextPage: {}}, action) {
	switch (action.type) {
		case 'TASKS_FETCHING':
			return {
				...state,
				fetching: true,
			};
		case 'TASKS_RECEIVED':
			return {
				...state,
				fetching: false,
				tasks: state.tasks.concat(action.payload.tasks),
				sortBy: action.payload.sortBy,
				sortDir: action.payload.sortDir,
				nextPage: action.payload.nextPage,
			};
		case 'FILTER_LIST':
			return {
				...state,
				filter: action.payload,
			};
		case 'SORT_LIST':
			return {
				...state,
				sortBy: action.payload.sortBy,
				sortDir: action.payload.sortDir,
				tasks: [],
				nextPage: {},
				endReached: false,
			};
		case 'END_REACHED':
			return {
				...state,
				endReached: true,
				nextPage: {},
			};
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case 'SELECT_TASK':
			return {
				...state,
				selectedTaskId: action.payload,
			};
		case 'DETAILS_FETCHING':
			return {
				...state,
				fetchingDetails: true,
			};
		case 'DETAILS_RECEIVED':
			return {
				...state,
				details: action.payload,
				fetchingDetails: false,
				detailsNotFound: false,
			};
		case 'DETAILS_NOT_FOUND':
			return {
				...state,
				fetchingDetails: false,
				detailsNotFound: true,
			};
		default:
			return state;
	}
}

export default combineReducers({
	list: listReducer,
});
