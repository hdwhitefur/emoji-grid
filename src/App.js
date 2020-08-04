import React, { Component } from 'react';
import * as presets from "./Presets";
import Nav from "./Nav";
import Grid from "./Grid";
import Control from "./Control";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emoji: presets.simple
		}

		this.setEmoji = this.setEmoji.bind(this);
	}

	setEmoji(emoji) {
		this.setState({
			emoji: emoji
		}, () => console.log(this.state.emoji));
	}

	render() {
		return (
			<div className="app">
				<Nav />
				<Grid width="30" height="30" emoji={this.state.emoji} />
				<Control setEmoji={this.setEmoji}/>
			</div>
		);
	}
}

export default App;
