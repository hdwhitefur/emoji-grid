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
			gridMode: false
		}

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
			return(<Grid width="30" height="30" emoji={presets.simple} emojiList={presets} switchMode={this.switchMode}/>);
		} else {
			return(<Planner switchMode={this.switchMode}/>);
		}
	}

	switchMode() {
		this.setState({gridMode: !this.state.gridMode});
	}
}

export default App;