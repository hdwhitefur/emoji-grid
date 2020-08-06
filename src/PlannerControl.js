import React, { Component } from "react"

class PlannerControl extends Component {
	constructor(props) {
		super(props);

		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="control">
				<button type="button" onClick={this.processInputs}>Process</button>
				<button type="button" onClick={this.switchMode}>Switch Mode</button>
			</div>
		)
	}

	processInputs() {
		this.props.processInputs();
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default PlannerControl