import React from 'react';
import classNames from 'classnames';
import * as moment from 'moment';

export class ListItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			secondsToComplete: this._calcSecondsToComplete(),
			active: false
		};
	}

	componentDidMount() {
		this._intervalId = window.setInterval(() => {
			const stc = this._calcSecondsToComplete();
			this.setState({
				secondsToComplete: stc
			});
			if (stc === 0) {
				window.clearInterval(this._intervalId);
			}
		}, 1000);
	}

	componentWillUnmount() {
		window.clearInterval(this._intervalId);
	}

	render() {
		return (
			<div
				className={classNames('list-row', this.props.isSelected && 'selected')}
				onClick={this._onClick.bind(this)}
			>
				<div className="column column-name">
					{this.props.task.name}
				</div>
				<div className="column column-priority">
					{this.props.task.priority}
				</div>
				<div className="column column-added">
					{moment.unix(this.props.task.timeAdded).format('YYYY-MM-DD HH:mm:ss')}
				</div>
				<div className="column column-time-to-complete">
					{this._formatDuration(moment.duration(this.state.secondsToComplete, 's'))}
				</div>
				<div className="column column-action">
					<button onClick={this._onDelete.bind(this)}>Delete</button>
				</div>
			</div>
		);
	}

	_onDelete(ev) {
		ev.stopPropagation();
		this.props.onDelete(this.props.task);
	}

	_onClick(ev) {
		ev.stopPropagation();
		this.props.onClick(this.props.task);
	}

	_calcSecondsToComplete() {
		const stc = this.props.task.timeComplete - Math.round(Date.now() / 1000);
		if (stc < 0) {
			return 0;
		}
		return stc;
	}

	_formatDuration(duration) {
		return `${duration.days()}.` +
			`${this._pad(duration.hours())}:` +
			`${this._pad(duration.minutes())}:` +
			`${this._pad(duration.seconds())}`;
	}

	_pad(n) {
		return ('0' + n).slice(-2);
	}
}
