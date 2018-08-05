import {ListPage} from '../components/list-page';
import {fetchNextPage, deleteTask, filter, sort} from '../actions';
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
	return {
		fetching: state.list.fetching,
		tasks: state.list.tasks,
		endReached: state.list.endReached,
		filter: state.list.filter,
		sortBy: state.list.sortBy,
		sortDir: state.list.sortDir,
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		loadNextPage: () => {
			dispatch(fetchNextPage());
		},
		onDelete: (task) => {
			dispatch(deleteTask(task));
		},
		onFilter: (word) => {
			dispatch(filter(word));
		},
		onSort: (by, dir) => {
			dispatch(sort(by, dir));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
