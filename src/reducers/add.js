
export function addReducer(state={}, action) {
	switch (action.type) {
		case 'SAVING_TASK':
			return {
				...state,
				saving: true,
				savingError: '',
			};
		case 'SAVING_TASK_FAILED':
			return {
				...state,
				saving: false,
				savingError: action.payload,
			};
		case 'TASK_SAVED':
			return {
				...state,
				saving: false,
				savingError: '',
			};
		default:
			return state;
	}
}
