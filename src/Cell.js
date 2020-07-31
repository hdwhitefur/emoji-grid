import React, { Component } from "react"

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {x: props.x, y: props.y, emoji: props.emoji}

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover() { 
        this.props.handleHover(this.props.x, this.props.y);
    }

    render() {
        return (
            <td onMouseOver={this.handleHover}>{this.props.emoji}</td>
        )
    }
}

export default Cell