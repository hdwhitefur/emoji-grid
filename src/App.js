import React, { Component } from 'react';
import * as presets from "./Presets";
import Nav from "./Nav";
import Grid from "./Grid";
import Planner from "./Planner";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<Nav />
				<Grid width="30" height="30" emoji={presets.simple} emojiList={presets}/>
			</div>
		);
	}
}

export default App;