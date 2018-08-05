
export function fetchNextPage() {
	return {
		type: 'FETCH_TASKS',
	};
}

export function tasksFetching() {
	return {
		type: 'TASKS_FETCHING',
	};
}

export function tasksReceived(tasks, sortBy, sortDir, nextPage) {
	return {
		type: 'TASKS_RECEIVED',
		payload: {
			tasks,
			sortBy,
			sortDir,
			nextPage,
		},
	};
}

export function filter(word) {
	return {
		type: 'FILTER_LIST',
		payload: word,
	};
}

export function sort(by, dir) {
	return {
		type: 'SORT_LIST',
		payload: {
			sortBy: by,
			sortDir: dir,
		},
	};
}

export function endReached() {
	return {
		type: 'END_REACHED',
	};
}

export function deleteTask(task) {
	return {
		type: 'DELETE_TASK',
		payload: task.id,
	};
}

export function selectTask(id) {
	return {
		type: 'SELECT_TASK',
		payload: id,
	};
}

export function detailsFetching() {
	return {
		type: 'DETAILS_FETCHING',
	};
}

export function detailsReceived(task) {
	return {
		type: 'DETAILS_RECEIVED',
		payload: task,
	};
}

export function detailsNotFound() {
	return {
		type: 'DETAILS_NOT_FOUND',
	};
}

export function saveTask(task) {
	return {
		type: 'SAVE_TASK',
		payload: task,
	};
}

export function taskSaving() {
	return {
		type: 'TASK_SAVING',
	};
}

export function taskSavingFailed(error) {
	return {
		type: 'TASK_SAVING_FAILED',
		payload: error,
	};
}

export function taskSaved(task) {
	return {
		type: 'TASK_SAVED',
		payload: task,
	};
}
