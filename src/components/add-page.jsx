import React from 'react';

export class AddPage extends React.Component {
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
				<label>
					<input type="text" ref={this._refName}/>
				</label>
				<label>
					<textarea ref={this._refDescr}/>
				</label>
				<label>
					<input type="number" min={0} max={3} ref={this._refPriority}/>
				</label>
				<label>
					<input type="datetime" ref={this._refTimeToComplete}/>
				</label>
				<div>
					<input type="button" value="Add" onClick={this._onSave.bind(this)}/>
				</div>
			</div>
		);
	}

	_onSave(ev) {
		ev.currentTarget.setAttribute('disabled', true);
		const task = {
			name: this._refName.current.value,
			description: this._refDescr.current.value,
			priority: this._refPriority.current.value,
			timeToComplete: this._refTimeToComplete.current.value,
		};
		this.props.onSave(task);
	}
}
