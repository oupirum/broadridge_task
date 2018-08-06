
export function fetchNextPage() {
	return {
		type: 'FETCH_TASKS',
	};
}

export function fetchingTasks() {
	return {
		type: 'FETCHING_TASKS',
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

export function fetchingDetails() {
	return {
		type: 'FETCHING_DETAILS',
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

export function savingTask() {
	return {
		type: 'SAVING_TASK',
	};
}

export function savingTaskFailed(error) {
	return {
		type: 'SAVING_TASK_FAILED',
		payload: error,
	};
}

export function taskSaved() {
	return {
		type: 'TASK_SAVED',
	};
}
