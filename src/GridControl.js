import React, { Component } from "react"
import * as presets from "./Presets";

class GridControl extends Component {
	constructor(props) {
		super(props);

		this.setEmoji = this.setEmoji.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="control">
				<div>
					<button type="button" onClick={() => this.setEmoji(presets.simple)}>Simple</button>
					<button type="button" onClick={() => this.setEmoji(presets.fancy)}>Fancy</button>
				</div>
				<div>
					<button type="button" onClick={this.switchMode}>Switch Mode</button>
				</div>
			</div>
		)
	}

	setEmoji(emoji) {
		this.props.setEmoji(emoji);
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default GridControl