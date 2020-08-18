import React, { Component } from "react"

class PlannerControl extends Component {
	constructor(props) {
		super(props);

		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
		this.switchInsertMode = this.switchInsertMode.bind(this);
		this.undo = this.undo.bind(this);
	}

	render() {
		return (
			<div className="control">
				<button type="button" onClick={this.processInputs}>Process</button>
				<button type="button" onClick={this.switchMode}>Switch Mode</button>
				<button type="button" onClick={this.switchInsertMode}>Insert Mode</button>
				<button type="button" onClick={this.undo}>Undo</button>
			</div>
		)
	}

	processInputs() {
		this.props.processInputs();
	}

	switchMode() {
		this.props.switchMode();
	}

	switchInsertMode() {
		this.props.switchInsertMode();
	}

	undo() {
		this.props.undo();
	}
}

export default PlannerControl