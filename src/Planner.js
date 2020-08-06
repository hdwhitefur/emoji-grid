import React, { Component } from "react"
import target from "./img/target.png";
import PlannerControl from "./PlannerControl";

class Planner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			textBoxes: []
		}

		this.spawnBox = this.spawnBox.bind(this);
		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="pair">
				<div className="planner">
					<img src={target} id="target" width="500" height="500" onClick={this.spawnBox}></img>
					{this.state.textBoxes}
				</div>
				<PlannerControl processInputs={this.processInputs} switchMode={this.switchMode} />
			</div>
		)
	}

	spawnBox(e) {
		let rect = document.getElementById("target").getBoundingClientRect();
		let relCoords = { x: e.pageX - rect.x, y: e.pageY - rect.y };
		let newTextBox = <input type="text" size="1" relCoords={relCoords} autoFocus
			style={{ position: "absolute", top: e.pageY - 12, left: e.pageX - 12 }}></input>
		this.setState({
			textBoxes: this.state.textBoxes.concat(newTextBox)
		});
	}

	processInputs() {
		let distance = function (x, y) { return Math.round((Math.sqrt((250 - x) ** 2 + (250 - y) ** 2)) / 50); }
		let angle = function (x, y) {
			let val = Math.atan2(250 - y, x - 250) * (180 / Math.PI);
			return val < 0 ? val + 360 : val;
		}

		let textBoxData = [];
		this.state.textBoxes.forEach((textBox) => {
			textBoxData.push({
				distance: distance(textBox.props.relCoords.x, textBox.props.relCoords.y),
				angle: angle(textBox.props.relCoords.x, textBox.props.relCoords.y)
			});
		});

		console.log(textBoxData);
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default Planner