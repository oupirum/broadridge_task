import {connect} from 'react-redux';
import {Details} from '../components/details';

function mapStateToProps(state) {
	return {
		fetching: state.details.fetching,
		notFound: state.details.notFound,
		details: state.details.details,
	};
}

function mapDispatchToProps() {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
