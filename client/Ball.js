import React, { Component } from "react";

export default class Ball extends Component {
    render() {
        console.log(this.props);
        return <div className="ball" style={this.props}/>
    }
}