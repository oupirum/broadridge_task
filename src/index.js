import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import {
	fetchListMiddleware,
	sortListMiddleware,
	fetchDetailsMiddleware,
	saveTaskMiddleware,
	deleteTaskMiddleware,
} from './middlewares/persistence';

const store = createStore(
	rootReducer,
	applyMiddleware(
		fetchListMiddleware,
		sortListMiddleware,
		fetchDetailsMiddleware,
		saveTaskMiddleware,
		deleteTaskMiddleware
	)
);

ReactDOM.render((
	<Provider store={store}>
		<App/>
	</Provider>
), document.getElementById('root'));
