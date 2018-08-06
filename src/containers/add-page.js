import {connect} from 'react-redux';
import {AddPage} from '../components/add-page';
import {saveTask} from '../actions';

function mapStateToProps(state) {
	return {
		saving: state.add.saving,
		error: state.add.savingError,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSave: (task) => {
			dispatch(saveTask(task));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPage)
