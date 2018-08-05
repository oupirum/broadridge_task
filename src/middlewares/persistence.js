import {
	detailsFetching,
	detailsNotFound,
	detailsReceived,
	endReached,
	tasksFetching,
	tasksReceived,
	taskSaving,
	taskSavingFailed,
} from '../actions';
import * as moment from 'moment';
import {hashHistory} from 'react-router';
import * as firebase from 'firebase';

firebase.initializeApp({
	apiKey: "AIzaSyAtQzLpON2KUtK34Mx-pQQqcsT_5VgaoUo",
	authDomain: "broadridge-task.firebaseapp.com",
	databaseURL: "https://broadridge-task.firebaseio.com",
	storageBucket: "broadridge-task.appspot.com",
});
const db = firebase.database();

// for (let i = 0; i < 100; i++) {
// 	const task = {
// 		name: 'Task ' + i,
// 		description: 'qeqweqweq qe qeq eqweqwe qeqeq',
// 		priority: 1,
// 		timeAdded: Math.round(Date.now() / 1000),
// 		timeComplete: Math.round(Date.now() / 1000 + Math.random() * 604800),
// 		_toSort: Date.now(),
// 	};
// 	const ref = db.ref('tasks').push();
// 	task.id = ref.key;
// 	ref.set(task);
// }

const PAGE_SIZE = 20;

export function fetchListMiddleware(store) {
	return (next) => (action) => {
		if (action.type === 'FETCH_TASKS') {
			if (store.getState().list.fetching || store.getState().list.endReached) {
				return next(action);
			}
			const {sortBy, sortDir, nextPage} = store.getState().list;
			fetch(store, sortBy, sortDir, nextPage);
		}
		return next(action);
	};
}

export function sortListMiddleware(store) {
	return (next) => (action) => {
		if (action.type === 'SORT_LIST') {
			if (store.getState().list.fetching || store.getState().list.endReached) {
				return next(action);
			}
			const {sortBy, sortDir} = action.payload;
			fetch(store, sortBy, sortDir, {});
		}
		return next(action);
	};
}

function fetch(store, sortBy, sortDir, nextPage) {
	store.dispatch(tasksFetching());

	let query = db.ref('tasks')
		.orderByChild(sortBy);
	query = sortDir === 'desc' ?
		query.limitToLast(PAGE_SIZE + 1) :
		query.limitToFirst(PAGE_SIZE + 1);
	if (nextPage && nextPage.val) {
		query = sortDir === 'desc' ?
			query.endAt(nextPage.val, nextPage.key) :
			query.startAt(nextPage.val, nextPage.key);
	}
	query.once('value')
		.then((snap) => {
			const childs = [];
			snap.forEach((child) => {
				childs.push(child);
			});

			if (sortDir === 'desc') {
				childs.reverse();
			}

			if (childs.length <= PAGE_SIZE) {
				store.dispatch(endReached());
			}

			const nextPage = {};
			if (childs.length > PAGE_SIZE) {
				const next = childs.pop();
				nextPage.val = next.val()[sortBy];
				nextPage.key = next.key;
			}

			const tasks = childs.map((child) => child.val());
			console.debug('fetched', tasks.length, nextPage);
			store.dispatch(tasksReceived(tasks, sortBy, sortDir, nextPage));
		});
}

export function fetchDetailsMiddleware(store) {
	return (next) => (action) => {
		if (action.type === 'SELECT_TASK') {
			const taskId = action.payload;
			store.dispatch(detailsFetching(taskId));

			db.ref('tasks').child(taskId).once('value')
				.then((snap) => {
					if (taskId !== store.getState().list.selectedTaskId) {
						return;
					}
					if (snap.val()) {
						store.dispatch(detailsReceived(snap.val()));
					} else {
						store.dispatch(detailsNotFound());
					}
				});
		}
		return next(action);
	}
}


export function saveTaskMiddleware(store) {
	return (next) => (action) => {
		if (action.type === 'SAVE_TASK') {
			store.dispatch(taskSaving());

			const task = {
				...action.payload,
			};

			task.timeAdded = moment().unix();

			const ttc = task.timeToComplete;
			const ttcMatch = ttc.match(/^(\d+)\.(\d+):(\d+):(\d+)$/);
			if (!ttcMatch) {
				store.dispatch(taskSavingFailed());
				return next(action);
			}

			const tc = moment();
			tc.add(ttcMatch[1], 'd');
			tc.add(ttcMatch[2], 'h');
			tc.add(ttcMatch[3], 'm');
			tc.add(ttcMatch[4], 's');
			task.timeComplete = tc.unix();

			const ref = db.ref('tasks').push();
			task.id = ref.key;

			ref.set(task)
				.then(() => {
					hashHistory.push(`/details/${task.id}`);
				});
		}
		return next(action);
	}
}

export function deleteTaskMiddleware(store) {
	return (next) => (action) => {
		if (action.type === 'DELETE_TASK') {
			const taskId = action.payload;
			db.ref('tasks').child(taskId).remove();
		}
		return next(action);
	};
}
