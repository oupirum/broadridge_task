
export function listReducer(state={tasks:[], sortBy: 'name', sortDir: 'asc', nextPage: {}}, action) {
	switch (action.type) {
		case 'FETCHING_TASKS':
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
		default:
			return state;
	}
}
