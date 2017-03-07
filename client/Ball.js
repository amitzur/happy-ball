import React, { Component } from "react";
import classnames from "classnames";

export default class Ball extends Component {
    render() {
        const className = classnames("ball", this.props.className);
        return <div className={className} style={this.props.style} onClick={this.props.onClick} />
    }
}