import React, { Component } from "react"

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {x: props.x, y: props.y, emoji: props.emoji}

        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseOver() { 
        this.props.handleClick(this.props.x, this.props.y);
    }

    render() {
        return (
            <span onMouseOver={this.handleMouseOver}>{this.props.emoji}</span>
        )
    }
}

export default Cell