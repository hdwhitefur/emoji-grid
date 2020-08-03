import React, { Component } from 'react';
import Nav from "./Nav";
import Grid from "./Grid";
import Control from "./Control";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emoji: [
				{ emoji: "⬛️", distance: { min: 0, max: 0 }, angle: null },
				{ emoji: "◼️", distance: { min: 0, max: 1 }, angle: null },
				{ emoji: "▪️", distance: { min: 0, max: 2 }, angle: null },
				{ emoji: "👈", distance: { min: 3, max: 5 }, angle: { gt: 337.5, lt: 22.5 } },
				{ emoji: "👇", distance: { min: 3, max: 5 }, angle: { gt: 67.5, lt: 112.5 } },
				{ emoji: "👉", distance: { min: 3, max: 5 }, angle: { gt: 157.5, lt: 202.5 } },
				{ emoji: "👆", distance: { min: 3, max: 5 }, angle: { gt: 247.5, lt: 292.5 } },
				{ emoji: "⬅️", distance: { min: 6, max: 8 }, angle: { gt: 337.5, lt: 22.5 } },
				{ emoji: "↙️", distance: { min: 6, max: 8 }, angle: { gt: 22.5, lt: 67.5 } },
				{ emoji: "⬇️", distance: { min: 6, max: 8 }, angle: { gt: 67.5, lt: 112.5 } },
				{ emoji: "↘️", distance: { min: 6, max: 8 }, angle: { gt: 112.5, lt: 157.5 } },
				{ emoji: "➡️", distance: { min: 6, max: 8 }, angle: { gt: 157.5, lt: 202.5 } },
				{ emoji: "↗️", distance: { min: 6, max: 8 }, angle: { gt: 202.5, lt: 247.5 } },
				{ emoji: "⬆️", distance: { min: 6, max: 8 }, angle: { gt: 247.5, lt: 292.5 } },
				{ emoji: "↖️", distance: { min: 6, max: 8 }, angle: { gt: 292.5, lt: 337.5 } },
				{ emoji: "⬜️", distance: null, angle: null }
			]
		}
	}

	render() {
		return (
			<div className="app">
				<Nav />
				<Grid width="30" height="30" emoji={this.state.emoji} />
				<Control />
			</div>
		);
	}
}

export default App;
