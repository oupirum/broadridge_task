import {connect} from 'react-redux';
import {App} from '../components/app';
import {selectTask} from '../actions';

function mapStateToProps(state) {
	return {
		selectedTaskId: state.list.selectedTaskId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSelectTask: (id) => {
			dispatch(selectTask(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
