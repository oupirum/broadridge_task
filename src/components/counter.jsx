import React from 'react';
import * as moment from 'moment';

export class Counter extends React.PureComponent {
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
			<span>
				{this._formatDuration(moment.duration(this.state.secondsToComplete, 's'))}
			</span>
		);
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
