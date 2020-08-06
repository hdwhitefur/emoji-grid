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
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="pair">
				<div className="planner">
					<img src={target} id="target" width="500" height="500" onClick={this.spawnBox}></img>
					{this.state.textBoxes}
				</div>
				<PlannerControl switchMode={this.switchMode}/>
			</div>
		)
	}

	spawnBox(e) {
		console.log(this.state.textBoxes);

		let rect = document.getElementById("target").getBoundingClientRect();
		let relCoords = { x: e.pageX - rect.x, y: e.pageY - rect.y };
		let newTextBox = <input type="text" size="1" relCoords={relCoords} autoFocus
			style={{ position: "absolute", top: e.pageY - 12, left: e.pageX - 12 }}></input>
		this.setState({
			textBoxes: this.state.textBoxes.concat(newTextBox)
		});
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default Planner