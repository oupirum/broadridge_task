import {App} from '../components/app';
import {connect} from 'react-redux';
import {selectTask} from '../actions';

function mapStateToProps(state, ownProps) {
	return {
		selectedTaskId: state.list.selectedTaskId
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSelectTask: (id) => {
			dispatch(selectTask(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
