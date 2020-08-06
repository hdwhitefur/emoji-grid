import React, { Component } from "react"
import Cell from "./Cell"
import GridControl from "./GridControl";

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [],
			emoji: this.props.emojiList[0].emoji
		}
		this.initializeCells();

		this.handleHover = this.handleHover.bind(this);
		this.setEmoji = this.setEmoji.bind(this);
		this.switchMode = this.switchMode.bind(this);
	}

	render() {
		return (
			<div className="pair">
				<div className="grid">
					<table>{this.createGrid()}</table>
				</div>
				<GridControl emojiList={this.props.emojiList} setEmoji={this.setEmoji} switchMode={this.switchMode}/>
			</div>
		);
	}

	criteria(cursorX, cursorY, x, y, emoji) {
		let distance = (Math.sqrt((x - cursorX) ** 2 + (y - cursorY) ** 2));
		let angle = Math.atan2(cursorY - y, x - cursorX) * (180 / Math.PI);
		angle = angle < 0 ? angle + 360 : angle;

		//precursor distance check?
		//find max distance of any emoji and if distance > maxDistance,
		//return emoji[emoji.length - 1].emoji

		for (let i = 0; i < emoji.length; i++) {

			if (emoji[i].distance != null && emoji[i].angle != null) {
				if (emoji[i].angle.gt < emoji[i].angle.lt) {
					if (emoji[i].distance.min <= distance && emoji[i].distance.max >= distance &&
						angle >= emoji[i].angle.gt &&
						angle < emoji[i].angle.lt) return emoji[i].emoji;
				}
				else if (emoji[i].distance.min <= distance && emoji[i].distance.max >= distance &&
					((angle >= emoji[i].angle.gt && angle < 360) ||
						(angle <= emoji[i].angle.lt && angle >= 0))) return emoji[i].emoji;
			}

			else if (emoji[i].distance != null && emoji[i].distance.min <= distance && emoji[i].distance.max >= distance) {
				return emoji[i].emoji;
			}

			else if (emoji[i].angle != null && angle >= emoji[i].angle.gt && angle < emoji[i].angle.lt) {
				return emoji[i].emoji;
			}
		}
		return emoji[emoji.length - 1].emoji;
	}

	handleHover(x, y) {
		this.updateCells(x, y, this.criteria);
	}

	setEmoji(emoji) {
		console.log("beep");
		this.setState({
			cells: this.state.cells,
			emoji: emoji
		});
	}

	switchMode() {
		this.props.switchMode();
	}

	initializeCells() {
		let defaultEmoji = this.state.emoji[this.state.emoji.length - 1].emoji;
		for (let y = 0; y < this.props.height; y++) {
			let row = [];
			for (let x = 0; x < this.props.width; x++) {
				row.push({ x: x, y: y, emoji: defaultEmoji });
			}
			this.state.cells.push(row);
		}
	}

	updateCells(cursorX, cursorY, getEmoji) {
		let cells = [];
		for (let y = 0; y < this.props.height; y++) {
			let row = [];
			for (let x = 0; x < this.props.width; x++) {
				row.push({ x: x, y: y, emoji: getEmoji(cursorX, cursorY, x, y, this.state.emoji) });
			}
			cells.push(row);
		}
		this.setState({
			cells: cells
		});
	}

	createGrid() {
		return this.state.cells.map((row) => <tr>{row.map((cell) => <Cell x={cell.x} y={cell.y} emoji={cell.emoji} handleHover={this.handleHover} />)}</tr>)
	}
}

export default Grid