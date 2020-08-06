import React, { Component } from "react"

class PlannerControl extends Component {
	constructor(props) {
		super(props);

		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="control">
				<button type="button" onClick={this.switchMode}>Switch Mode</button>
			</div>
		)
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default PlannerControl