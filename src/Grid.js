import React, { Component } from "react"
import Cell from "./Cell"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: []
        }
        this.emoji = {default: "⬜️", active: "⬛️"}
        this.initializeCells();

        this.handleHover = this.handleHover.bind(this);
    }

    render() {
        return (
            <div className="grid">
                {this.createGrid()}
            </div>
        );
    }

    handleHover(x, y) {
        let getEmoji = function (cursorX, cursorY, x, y, emoji) {
            if (cursorX == x && cursorY == y) return emoji.active;
            else return emoji.default;
        }
        this.updateCells(x, y, getEmoji);
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
        return this.state.cells.map((row) => <span>{row.map((cell) => <Cell x={cell.x} y={cell.y} emoji={cell.emoji} handleHover={this.handleHover}/>)}<br /></span>)
    }
}

export default Grid

/*

👆👇👈👉
😐🙂😃
⬜️⬛️

*/