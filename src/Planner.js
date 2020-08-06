import React, { Component } from "react"
import target from "./img/target.png";
import EmojiInput from "./EmojiInput";
import PlannerControl from "./PlannerControl";

class Planner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emojiInputs: []
		}

		this.updateValue = this.updateValue.bind(this);
		this.spawnBox = this.spawnBox.bind(this);
		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="pair">
				<div className="planner">
					<img src={target} id="target" width="500" height="500" alt="a target-shaped guide" onClick={this.spawnBox}></img>
					{this.state.emojiInputs.map((item) => item.element)}
				</div>
				<PlannerControl processInputs={this.processInputs} switchMode={this.switchMode} />
			</div>
		)
	}

	//I recognize this is a messy way to do this, but
	//I can't figure out another way to pass values up
	//from an arbitrary number of child elements
	updateValue(i, value) {
		this.setState(({ emojiInputs }) => ({
			emojiInputs: [
				...emojiInputs.slice(0, i),
				{
					...emojiInputs[i],
					value: value
				},
				...emojiInputs.slice(i + 1)
			]
		}));
	}

	spawnBox(e) {
		let rect = document.getElementById("target").getBoundingClientRect();
		let relCoords = { x: e.pageX - rect.x, y: e.pageY - rect.y };
		let keyCoords = "x" + relCoords.x + "y" + relCoords.y;
		let newEmojiInput = <EmojiInput relCoords={relCoords} key={keyCoords} index={this.state.emojiInputs.length}
			updateValue={this.updateValue} style={{ position: "absolute", top: e.pageY - 12, left: e.pageX - 12 }} />
		this.setState({
			emojiInputs: this.state.emojiInputs.concat({ element: newEmojiInput, value: "" })
		});
	}

	processInputs() {
		let distance = function (x, y) { return Math.round((Math.sqrt((250 - x) ** 2 + (250 - y) ** 2)) / 50); };
		let angle = function (x, y) {
			let val = Math.atan2(250 - y, x - 250) * (180 / Math.PI);
			return val < 0 ? val + 360 : val;
		};
		let angleToAnglePair = function (a) {
			let angleBuckets = [
				{ gt: 22.5, lt: 67.5 },
				{ gt: 67.5, lt: 112.5 },
				{ gt: 112.5, lt: 157.5 },
				{ gt: 157.5, lt: 202.5 },
				{ gt: 202.5, lt: 247.5 },
				{ gt: 247.5, lt: 292.5 },
				{ gt: 292.5, lt: 337.5 }
			];
			for (let i = 0; i < angleBuckets.length; i++) {
				if (a >= angleBuckets[i].gt && a < angleBuckets[i].lt) return angleBuckets[i];
			}
			return ({ gt: 337.5, lt: 22.5 });
		};

		let emoji = [];
		this.state.emojiInputs.forEach((emojiInputPair) => {
			let emojiInput = emojiInputPair.element;
			let eiDistance = distance(emojiInput.props.relCoords.x, emojiInput.props.relCoords.y);
			let eiAngle = angle(emojiInput.props.relCoords.x, emojiInput.props.relCoords.y);
			emoji.push({
				emoji: emojiInputPair.value,
				distance: eiDistance === 0 ? { min: 0, max: 0 } : { min: eiDistance - 1, max: eiDistance },
				angle: eiDistance === 0 ? null : angleToAnglePair(eiAngle)
			});
		});

		console.log(emoji);
	}

	switchMode() {
		this.props.switchMode();
	}
}

export default Planner