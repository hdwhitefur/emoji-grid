import React, { Component } from "react"

class EmojiInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<input type="text" size="1" style={this.props.style}
				ref={this.props.myRef} onChange={this.handleChange} autoFocus></input>
		)
	}

	handleChange(e) {
		this.props.updateValue(this.props.index, e.target.value);
	}
}

export default EmojiInput