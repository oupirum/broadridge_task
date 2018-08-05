import {AddPage} from '../components/add-page';
import {saveTask} from '../actions';
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
	return {
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSave: (task) => {
			dispatch(saveTask(task));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
