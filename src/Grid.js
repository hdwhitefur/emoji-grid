import React, { Component } from "react"
import Cell from "./Cell"

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            cells: []
        }
        this.initializeCells();

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div class="grid" onClick={this.handleClick}>
                <table>{this.createGrid()}</table>
            </div>
        );
    }

    handleClick() {
        this.updateCell(0, 0);
    }

    updateCell(x, y) {
        let newCells = [...this.state.cells];
        let cell = {...newCells[y][x]};
        cell.emoji = "⬛️";
        newCells[y][x] = cell;
        this.setState({cells: newCells})
    }

    initializeCells() {
        for (let y = 0; y < this.props.height; y++) {
            let row = [];
            for (let x = 0; x < this.props.width; x++) {
                row.push(<Cell x={x} y={y} emoji="⬜️" />);
            }
            this.state.cells.push(row);
        }
    }

    createGrid() {
        return this.state.cells.map((row) => <tr>{row.map((cell) => <td>{cell}</td>)}</tr>)
    }
}

export default Grid

/*

👆👇👈👉
😐🙂😃
⬜️⬛️

*/