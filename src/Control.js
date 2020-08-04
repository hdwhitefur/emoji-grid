import React, { Component } from "react"
import * as presets from "./Presets";

class Control extends Component {
	constructor(props) {
		super(props);

		this.setEmoji = this.setEmoji.bind(this);
	}

	render() {
		return (
			<div className="control">
				<button type="button" onClick={() => this.setEmoji(presets.simple)}>Simple</button>
				<button type="button" onClick={() => this.setEmoji(presets.fancy)}>Fancy</button>
			</div>
		)
	}

	setEmoji(emoji) {
		this.props.setEmoji(emoji);
	}
}

export default Control