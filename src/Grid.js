import React, { Component } from "react"
import Cell from "./Cell"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: []
        }
        this.defaultEmoji = "⬜️";
        this.emoji = [
            { emoji: "⬛️", distance: {min: 0, max: 0}, angle: null },
            { emoji: "◼️", distance: {min: 0, max: 1}, angle: null },
            { emoji: "▪️", distance: {min: 0, max: 2}, angle: null },
            { emoji: "👈", distance: {min: 3, max: 5}, angle: { gt: 337.5, lt: 22.5 } },
            { emoji: "👇", distance: {min: 3, max: 5}, angle: { gt: 67.5, lt: 112.5 } },
            { emoji: "👉", distance: {min: 3, max: 5}, angle: { gt: 157.5, lt: 202.5 } },
            { emoji: "👆", distance: {min: 3, max: 5}, angle: { gt: 247.5, lt: 292.5 } },
            { emoji: "⬅️", distance: {min: 6, max: 8}, angle: { gt: 337.5, lt: 22.5 } },
            { emoji: "↙️", distance: {min: 6, max: 8}, angle: { gt: 22.5, lt: 67.5 } },
            { emoji: "⬇️", distance: {min: 6, max: 8}, angle: { gt: 67.5, lt: 112.5 } },
            { emoji: "↘️", distance: {min: 6, max: 8}, angle: { gt: 112.5, lt: 157.5 } },
            { emoji: "➡️", distance: {min: 6, max: 8}, angle: { gt: 157.5, lt: 202.5 } },
            { emoji: "↗️", distance: {min: 6, max: 8}, angle: { gt: 202.5, lt: 247.5 } },
            { emoji: "⬆️", distance: {min: 6, max: 8}, angle: { gt: 247.5, lt: 292.5 } },
            { emoji: "↖️", distance: {min: 6, max: 8}, angle: { gt: 292.5, lt: 337.5 } },
            { emoji: "⬜️", distance: null, angle: null }
        ]
        this.initializeCells();

        this.handleHover = this.handleHover.bind(this);
    }

    render() {
        return (
            <div className="grid">
                <table>{this.createGrid()}</table>
            </div>
        );
    }

    criteria(cursorX, cursorY, x, y, emoji) {
        let distance = (Math.sqrt((x - cursorX) ** 2 + (y - cursorY) ** 2));
        let angle = Math.atan2(cursorY - y, x - cursorX) * (180 / Math.PI);
        angle = angle < 0 ? angle + 360 : angle;

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

    updateCells(cursorX, cursorY, getEmoji) {
        let cells = [];
        for (let y = 0; y < this.props.height; y++) {
            let row = [];
            for (let x = 0; x < this.props.width; x++) {
                row.push({ x: x, y: y, emoji: getEmoji(cursorX, cursorY, x, y, this.emoji) });
            }
            cells.push(row);
        }
        this.setState({
            cells: cells
        });
    }

    initializeCells() {
        for (let y = 0; y < this.props.height; y++) {
            let row = [];
            for (let x = 0; x < this.props.width; x++) {
                row.push({ x: x, y: y, emoji: this.defaultEmoji });
            }
            this.state.cells.push(row);
        }
    }

    createGrid() {
        return this.state.cells.map((row) => <tr>{row.map((cell) => <Cell x={cell.x} y={cell.y} emoji={cell.emoji} handleHover={this.handleHover} />)}</tr>)
    }
}

export default Grid