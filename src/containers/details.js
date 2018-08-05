import {Details} from '../components/details';
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
	return {
		fetching: state.list.fetchingDetails,
		notFound: state.list.detailsNotFound,
		details: state.list.details,
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
