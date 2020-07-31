import React, { Component } from "react"
import Cell from "./Cell"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: []
        }
        this.emoji = {
            default: "⬜️",
            close: "▪️",
            closer: "◼️",
            active: "⬛️",
            left: "👈",
            right: "👉",
            up: "👆",
            down: "👇"
        }
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

    single(cursorX, cursorY, x, y, emoji) {
        if (cursorX === x && cursorY === y) return emoji.active;
        else return emoji.default;
    }

    proximity(cursorX, cursorY, x, y, emoji) {
        let distance = (Math.sqrt( (x-cursorX)**2 + (y-cursorY)**2));
        if (distance === 0) return emoji.active;
        else if (distance <= 2) return emoji.closer;
        else if (distance <= 4) return emoji.close;
        else return emoji.default;
    }

    angle(cursorX, cursorY, x, y, emoji) {
        let deg = Math.atan2(y-cursorY, x-cursorX) * (180 / Math.PI);
        if (cursorX === x && cursorY === y) return emoji.active;
        if (Math.abs(deg) <= 45) return emoji.left;
        else if (deg > 45 && deg < 135) return emoji.up;
        else if (Math.abs(deg) >= 135) return emoji.right;
        else return emoji.down;
    }

    handleHover(x, y) {
        this.updateCells(x, y, this.proximity);
    }

    updateCells(cursorX, cursorY, getEmoji) {
        let cells = [];
        for (let y = 0; y < this.props.height; y++) {
            let row = [];
            for (let x = 0; x < this.props.width; x++) {
                row.push({x: x, y: y, emoji: getEmoji(cursorX, cursorY, x, y, this.emoji)});
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
                row.push({x: x, y: y, emoji: this.emoji.default});
            }
            this.state.cells.push(row);
        }
    }

    createGrid() {
        return this.state.cells.map((row) => <tr>{row.map((cell) => <Cell x={cell.x} y={cell.y} emoji={cell.emoji} handleHover={this.handleHover}/>)}</tr>)
    }
}

export default Grid

/*

👆👇👈👉
😐🙂😃
⬜️⬛️

*/