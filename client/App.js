import React, { Component } from "react";
import { connect } from "react-redux";
import Ball from "./Ball";

const curPos = {};

class App extends Component {
    constructor() {
        super();
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousemove", e => {
            this.prevLeft = curPos.left;
            this.prevTop = curPos.top;

            curPos.left = e.pageX;
            curPos.top = e.pageY;
        });

        this.tick();
    }

    tick() {
        if (curPos.left !== this.prevLeft || curPos.top !== this.prevTop) {
            this.props.move(curPos.left, curPos.top);

            // in case mouse position doesn't change until
            this.prevLeft = curPos.left;
            this.prevTop = curPos.top;
        }

        requestAnimationFrame(this.tick);
    }

    render() {
        return <Ball left={this.props.left - this.props.size/2} top={this.props.top - this.props.size/2} />
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    move: (left, top) => {
        dispatch({ type: "move", left, top });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);