import {combineReducers} from 'redux';
import {listReducer} from './list';
import {addReducer} from './add';
import {detailsReducer} from './details';

export default combineReducers({
	list: listReducer,
	add: addReducer,
	details: detailsReducer,
});
