import {ListPage} from '../components/list-page';
import {fetchNextPage, deleteTask, sort} from '../actions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		fetching: state.list.fetching,
		tasks: state.list.tasks,
		endReached: state.list.endReached,
		selectedId: state.list.selectedTaskId,
		sortBy: state.list.sortBy,
		sortDir: state.list.sortDir,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadNextPage: () => {
			dispatch(fetchNextPage());
		},
		onDelete: (task) => {
			dispatch(deleteTask(task));
		},
		onSort: (by, dir) => {
			dispatch(sort(by, dir));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
