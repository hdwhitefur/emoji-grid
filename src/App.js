import React, { Component } from 'react';
import * as presets from "./Presets";
import Nav from "./Nav";
import Grid from "./Grid";
import Planner from "./Planner";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gridMode: false,
			emojiList: [
				{name: "Simple", emoji: presets.simple},
				{name: "Fancy", emoji: presets.fancy}
			]
		}

		this.addEmoji = this.addEmoji.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="app">
				<Nav />
				{this.currentMode()}
			</div>
		);
	}

	currentMode() {
		if (this.state.gridMode) {
			return(<Grid width="30" height="30" emojiList={this.state.emojiList} switchMode={this.switchMode}/>);
		} else {
			return(<Planner addEmoji={this.addEmoji} switchMode={this.switchMode}/>);
		}
	}

	addEmoji(emoji) {
		this.setState({
			gridMode: this.state.gridMode,
			emojiList: this.state.emojiList.concat(emoji)
		});
	}

	switchMode() {
		this.setState({gridMode: !this.state.gridMode});
	}
}

export default App;