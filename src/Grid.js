import React, { Component } from "react"
import Cell from "./Cell"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            activeCell: {x: 0, y: 0},
            cells: []
        }
        this.initializeCells();

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="grid">
                {this.createGrid()}
            </div>
        );
    }

    handleClick(x, y) {
        this.updateCell(this.state.activeCell.x, this.state.activeCell.y, "⬜️");
        this.updateCell(x, y, "⬛️");
        this.setState({
            width: this.state.width,
            height: this.state.height,
            activeCell: {x: x, y: y},
            cells: this.state.cells
        });
    }

    updateCell(x, y, e) {
        let newCells = [...this.state.cells];
        let cell = {...newCells[y][x]};
        cell.emoji = e;
        newCells[y][x] = cell;
        this.setState({
            width: this.state.width,
            height: this.state.height,
            activeCell: this.state.activeCell,
            cells: newCells})
    }

    initializeCells() {
        for (let y = 0; y < this.props.height; y++) {
            let row = [];
            for (let x = 0; x < this.props.width; x++) {
                row.push({x: x, y: y, emoji: "⬜️"});
            }
            this.state.cells.push(row);
        }
    }

    createGrid() {
        return this.state.cells.map((row) => <span>{row.map((cell) => <Cell x={cell.x} y={cell.y} emoji={cell.emoji} handleClick={this.handleClick}/>)}<br /></span>)
    }
}

export default Grid

/*

👆👇👈👉
😐🙂😃
⬜️⬛️

*/