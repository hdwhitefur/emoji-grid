import React, { Component } from "react"

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
					{this.props.emojiList.map((item) => {
						return <button type="button" onClick={() => this.setEmoji(item.emoji)}>{item.name}</button>
					})}
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