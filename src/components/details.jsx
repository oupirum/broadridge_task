import React from 'react';
import * as moment from 'moment';

export class Details extends React.Component {
	render() {
		return (
			<div className="details">
				{this.props.fetching && (
					<div className="loading">Loading...</div>
				)}
				{!this.props.fetching && this.props.notFound && (
					<div className="not-found">Task not found</div>
				)}
				{!this.props.fetching && !this.props.notFound && this.props.details && (
					<div>
						<div className="name">
							{this.props.details.name}
						</div>
						<div className="description">
							<pre>{this.props.details.description}</pre>
						</div>
						<div className="priority">
							{this.props.details.priority}
						</div>
						<div className="added">
							{moment.unix(this.props.details.timeAdded).format('YYYY-MM-DD HH:mm:ss')}
						</div>
					</div>
				)}
			</div>
		);
	}
}
