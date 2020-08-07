import React, { Component } from "react"
import EmojiInput from "./EmojiInput";
import PlannerControl from "./PlannerControl";

class Planner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emojiInputs: [],
			shapes: {
				arcs: [],
				lines: []
			}
		}

		this.updateValue = this.updateValue.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	generateShapes(radius0 = 40, divisions = 8) {
		let angle0 = 180 / divisions;
		let angleDelta = 360 / divisions
		let getCoords = function (r, a) {
			return {
				x: 250 + (r * Math.cos(a * Math.PI / 180)),
				y: 250 + (r * Math.sin(a * Math.PI / 180))
			};
		}

		let arcs = [];
		let lines = [];
		for (let r = radius0; r <= 250; r += radius0) {
			for (let a = -angle0; a < 360 - angleDelta; a += 360 / divisions) {
				arcs.push({
					x: 250,
					y: 250,
					r: r,
					sA: a * Math.PI / 180,
					eA: (a + angleDelta) * Math.PI / 180
				});
				let coords = getCoords(r, a);
				lines.push({
					x: coords.x,
					y: coords.y
				});
			}
		}
		return {arcs: arcs, lines: lines};
	}

	componentDidMount() {
		const ctx = this.refs.canvas.getContext("2d");
		let shapes = this.generateShapes();

		shapes.arcs.forEach(arc => {
			ctx.beginPath();
			ctx.arc(arc.x, arc.y, arc.r, arc.sA, arc.eA);
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 2;
			ctx.stroke();
		})
		shapes.lines.forEach(line => {
			ctx.moveTo(250, 250);
			ctx.lineTo(line.x, line.y);
			ctx.lineWidth = 1;
			ctx.stroke();
		})
	}

	render() {
		return (
			<div className="pair">
				<div className="planner">
					<canvas ref="canvas" width="500" height="500" onClick={this.handleClick}></canvas>
					{this.state.emojiInputs.map((item) => item.element)}
				</div>
				<PlannerControl processInputs={this.processInputs} switchMode={this.switchMode} />
			</div>
		)
	}

	handleClick(e) {
		let rect = this.refs.canvas.getBoundingClientRect();
		let x = e.pageX - rect.x;
		let y = e.pageY - rect.y;
		const ctx = this.refs.canvas.getContext("2d");
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
		let rect = e.target.getBoundingClientRect();
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
		emoji.push({ emoji: "⬜️", distance: null, angle: null });

		return { name: "Custom", emoji: emoji };
	}

	switchMode() {
		this.props.addEmoji(this.processInputs());
		this.props.switchMode();
	}
}

export default Planner