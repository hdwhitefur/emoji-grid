import React, { Component } from "react"

class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {emoji: props.emoji}
    }

    render() {
        return (
            this.state.emoji
        )
    }
}

export default Cell