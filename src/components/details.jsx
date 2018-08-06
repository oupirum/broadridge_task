import './details.css';
import React from 'react';
import * as moment from 'moment';

export class Details extends React.PureComponent {
	render() {
		return (
			<div className="details">
				<fieldset className="fieldset">
					<legend>Task details</legend>
					{this.props.fetching && (
						<div className="loading">Loading...</div>
					)}
					{!this.props.fetching && this.props.notFound && (
						<div className="not-found">Task not found</div>
					)}
					{!this.props.fetching && !this.props.notFound && this.props.details && (
						<div>
							<div className="row">
								<label className="label">Name</label>
								<span className="value name">{this.props.details.name}</span>
							</div>
							<div className="row">
								<label className="label">Description</label>
								<span className="value description">{this.props.details.description}</span>
							</div>
							<div className="row">
								<label className="label">Priority</label>
								<span className="value priority">{this.props.details.priority}</span>
							</div>
							<div className="row">
								<label className="label">Added</label>
								<span className="value added">{moment.unix(this.props.details.timeAdded).format('YYYY-MM-DD HH:mm:ss')}</span>
							</div>
						</div>
					)}
				</fieldset>
			</div>
		);
	}
}
