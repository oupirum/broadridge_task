import './add-page.css';
import React from 'react';

export class AddPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this._refName = React.createRef();
		this._refDescr = React.createRef();
		this._refPriority = React.createRef();
		this._refTimeToComplete = React.createRef();
	}

	render() {
		return (
			<div className="add-page">
				<fieldset className="fieldset">
					<legend>Task details</legend>
					<div className="row">
						<label className="label">Name</label>
						<span className="value">
							<input type="text" ref={this._refName}/>
						</span>
					</div>
					<div className="row">
						<label className="label">Description</label>
						<span className="value">
							<textarea ref={this._refDescr}/>
						</span>
					</div>
					<div className="row">
						<label className="label">Priority</label>
						<span className="value">
							<input type="number" min={0} max={3} ref={this._refPriority}/>
						</span>
					</div>
					<div className="row">
						<label className="label">Time to complete</label>
						<span className="value">
							<input
								type="text"
								placeholder="dd.HH:mm:ss"
								ref={this._refTimeToComplete}
							/>
						</span>
					</div>
					<div className="row">
						<label className="label"/>
						<span className="value">
							<input
								type="button"
								value="Add"
								disabled={this.props.saving}
								onClick={this._onSave.bind(this)}
							/>
						</span>
					</div>
					{this.props.error && (
						<div className="error">{this.props.error}</div>
					)}
				</fieldset>
			</div>
		);
	}

	_onSave() {
		const task = {
			name: this._refName.current.value,
			description: this._refDescr.current.value,
			priority: this._refPriority.current.value,
			timeToComplete: this._refTimeToComplete.current.value,
		};
		this.props.onSave(task);
	}
}
