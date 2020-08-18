import React, { Component } from "react"
import EmojiInput from "./EmojiInput";
import PlannerControl from "./PlannerControl";

class Planner extends Component {
	constructor(props) {
		super(props);

		let arcRadius = 40;
		let divisions = 8;

		this.state = {
			emojiInputs: [],
			arcRadius: arcRadius,
			divisions: divisions,
			shapes: this.generateShapes(arcRadius, divisions),
			insertMode: false
		}

		this.canvas = React.createRef();

		this.updateValue = this.updateValue.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.processInputs = this.processInputs.bind(this);
		this.switchMode = this.switchMode.bind(this);
		this.switchInsertMode = this.switchInsertMode.bind(this);
		this.undo = this.undo.bind(this);
	}

	render() {
		return (
			<div className="pair">
				<div className="planner">
					<canvas ref={this.canvas} width="500" height="500" onClick={this.handleClick}></canvas>
					{this.state.emojiInputs.map((item) => item.element)}
				</div>
				<PlannerControl processInputs={this.processInputs} switchMode={this.switchMode}
					switchInsertMode={this.switchInsertMode} undo={this.undo} />
			</div>
		)
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		const ctx = this.canvas.current.getContext("2d");
		ctx.clearRect(0, 0, 500, 500);
		this.state.shapes.arcs.flat().forEach(arc => {
			ctx.fillStyle = arc.visible ? "#000000" : "#DDDDDD";
			ctx.fill(arc.arc);
		});
		this.state.shapes.lines.flat().forEach(line => {
			ctx.fillStyle = line.visible ? "#000000" : "#DDDDDD";
			ctx.fill(line.line);
		});
	}

	//Generates circles interspersed by radius0 and
	//dividing lines indicated by divisions
	//through smaller arcs and sub-lines
	//
	//Shapes contain indices r (radius from center)
	//and a (angle from center starting to right of center
	//and incrementing by 1 moving counterclockwise)
	generateShapes(radius0 = 40, divisions = 8) {
		let angle0 = 180 / divisions;
		let angleDelta = 360 / divisions

		let arcs = [];
		let lines = [];
		for (let r = radius0; r <= 250; r += radius0) {
			let arcRing = [];
			let lineRing = [];
			for (let a = -angle0; a < 360 - angleDelta; a += 360 / divisions) {
				let angle = a < 0 ? a + angleDelta : 360 - a;
				const arc = new Path2D();
				arc.arc(250, 250, r - 1, a * Math.PI / 180, (a + angleDelta) * Math.PI / 180);
				arc.arc(250, 250, r + 1, (a + angleDelta) * Math.PI / 180, a * Math.PI / 180, true);
				arcRing.push({ arc: arc, r: (r / radius0) - 1, a: ((angle - angle0) / angleDelta), angle: angle, visible: true });

				if (r !== radius0) {
					const line = new Path2D();
					line.arc(250, 250, r - radius0, (a - 1) * Math.PI / 180, (a + 1) * Math.PI / 180);
					line.arc(250, 250, r, (a + 1) * Math.PI / 180, (a - 1) * Math.PI / 180, true);
					lineRing.push({ line: line, r: (r / radius0) - 1, a: ((angle - angle0) / angleDelta), angle: angle, visible: true });
				}
			}
			arcs.push(arcRing.sort((a, b) => a.angle - b.angle));
			lines.push(lineRing.sort((a, b) => a.angle - b.angle));
		}
		return { arcs: arcs, lines: lines };
	}

	handleClick(e) {
		if (this.state.insertMode) {
			this.spawnBox(e);
		} else {
			let rect = this.canvas.current.getBoundingClientRect();
			let x = e.pageX - rect.x;
			let y = e.pageY - rect.y;
			const ctx = this.canvas.current.getContext("2d");

			this.state.shapes.arcs.flat().forEach(arc => {
				if (ctx.isPointInPath(arc.arc, x, y)) {
					this.toggleArcVisibility(arc.r, arc.a);
				}
			});
			this.state.shapes.lines.flat().forEach(line => {
				if (ctx.isPointInPath(line.line, x, y)) {
					this.toggleLineVisibility(line.r, line.a);
				}
			});
		}
	}

	//TODO: toggle visibility, don't just turn it off
	checkAdjacentArc(newArcs, newLines, r, a) {
		newArcs[r][a].visible = false;

		//inccurate names from early in development
		let aLow = a + 1 === newArcs[0].length ? 0 : a + 1;
		let aHigh = a - 1 === -1 ? newArcs[0].length - 1 : a - 1;

		if (r >= 0 && r < newLines.length) {
			if (!newLines[r][aHigh].visible) {
				if (newLines[r + 1][aHigh].visible) this.checkAdjacentLine(newArcs, newLines, r + 1, aHigh);
				if (newArcs[r][aHigh].visible) this.checkAdjacentArc(newArcs, newLines, r, aHigh);
			}
			if (!newLines[r][a].visible) {
				if (newLines[r + 1][a].visible) this.checkAdjacentLine(newArcs, newLines, r + 1, a);
				if (newArcs[r][aLow].visible) this.checkAdjacentArc(newArcs, newLines, r, aLow);
			}
			if (!newLines[r + 1][aHigh].visible) {
				if (newLines[r][aHigh].visible) this.checkAdjacentLine(newArcs, newLines, r, aHigh);
				if (newArcs[r][aHigh].visible) this.checkAdjacentArc(newArcs, newLines, r, aHigh);
			}
			if (!newLines[r + 1][a].visible) {
				if (newLines[r][a].visible) this.checkAdjacentLine(newArcs, newLines, r, a);
				if (newArcs[r][aLow].visible) this.checkAdjacentArc(newArcs, newLines, r, aLow);
			}
		}
	}

	checkAdjacentLine(newArcs, newLines, r, a) {
		newLines[r][a].visible = false;
		let aHigh = a + 1 === newArcs[0].length ? 0 : a + 1;

		if (r >= 0 && r < newArcs.length) {
			if (!newArcs[r][aHigh].visible) {
				if (newLines[r + 1][a].visible) this.checkAdjacentLine(newArcs, newLines, r + 1, a);
				if (newArcs[r][a].visible) this.checkAdjacentArc(newArcs, newLines, r, a);
			}
			if (!newArcs[r][a].visible) {
				if (newLines[r + 1][a].visible) this.checkAdjacentLine(newArcs, newLines, r + 1, a);
				if (newArcs[r][aHigh].visible) this.checkAdjacentArc(newArcs, newLines, r, aHigh);
			}
			if (!newArcs[r - 1][aHigh].visible) {
				if (newLines[r - 1][a].visible) this.checkAdjacentLine(newArcs, newLines, r - 1, a);
				if (newArcs[r - 1][a].visible) this.checkAdjacentArc(newArcs, newLines, r - 1, a);
			}
			if (!newArcs[r - 1][a].visible) {
				if (newLines[r - 1][a].visible) this.checkAdjacentLine(newArcs, newLines, r - 1, a);
				if (newArcs[r - 1][aHigh].visible) this.checkAdjacentArc(newArcs, newLines, r - 1, aHigh);
			}
		}
	}

	toggleArcVisibility(r, a) {
		if (r === 0) return;

		let newArcs = [...this.state.shapes.arcs];
		let newLines = [...this.state.shapes.lines];
		newArcs[r][a].visible = !newArcs[r][a].visible;

		this.checkAdjacentArc(newArcs, newLines, r, a);

		let shapes = { arcs: newArcs, lines: this.state.shapes.lines };
		this.setState({ shapes: shapes });
	}

	toggleLineVisibility(r, a) {
		let newArcs = [...this.state.shapes.arcs];
		let newLines = [...this.state.shapes.lines];
		newLines[r][a].visible = !newLines[r][a].visible;

		this.checkAdjacentLine(newArcs, newLines, r, a);

		let shapes = { arcs: this.state.shapes.arcs, lines: newLines };
		this.setState({ shapes: shapes });
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

	undo() {
		this.setState({
			emojiInputs: this.state.emojiInputs.slice(0, this.state.emojiInputs.length - 1)
		});
	}

	//TODO: respect visibility values from this.state.shapes
	processInputs() {
		let distance = function (x, y) { return Math.round((Math.sqrt((250 - x) ** 2 + (250 - y) ** 2)) / 50); };
		let angle = function (x, y) {
			let val = Math.atan2(250 - y, x - 250) * (180 / Math.PI);
			return val < 0 ? val + 360 : val;
		};
		let divisions = this.state.divisions;
		let angleToAnglePair = function (a) {
			let angleBuckets = [];
			let angle0 = 180 / divisions;
			let angleDelta = 360 / divisions;
			for (let i = 1; i < (divisions - 1) * 2; i += 2) {
				angleBuckets.push({ gt: i * angle0, lt: i * angle0 + angleDelta });
			}
			for (let i = 0; i < angleBuckets.length; i++) {
				if (a >= angleBuckets[i].gt && a < angleBuckets[i].lt) return angleBuckets[i];
			}
			return { gt: angleBuckets[angleBuckets.length - 1].lt, lt: angleBuckets[0].gt };
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

	switchInsertMode() {
		this.setState({ insertMode: !this.state.insertMode });
	}
}

export default Planner