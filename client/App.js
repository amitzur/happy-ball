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

    componentWillReceiveProps(nextProps) {
        if (nextProps.tracking && !this.props.tracking) {
            this.tick();
        } else if (!nextProps.tracking && this.props.tracking) {
            cancelAnimationFrame(this.cRAF);
            delete this.cRAF;
        }
    }

    onResize() {
        let scale = this.props.scale + 0.5;
        if (scale > 5) scale = 1;
        this.props.resize(scale);
    }

    tick() {
        if (curPos.left !== this.prevLeft || curPos.top !== this.prevTop) {
            this.props.move(curPos.left, curPos.top);

            // in case mouse position doesn't change until
            this.prevLeft = curPos.left;
            this.prevTop = curPos.top;
        }

        this.cRAF = requestAnimationFrame(this.tick);
    }

    onBallClick() {
        this.props.toggleTrack();
    }

    render() {
        return <div>
            <div className="toolbar">
                <div className="info">
                    <div className="icon"></div>
                    <div>
                        <div className="title">Happy Ball</div>
                        <div className="subtitle">Click on the ball to stop tracking it</div>
                    </div>
                </div>
                <button onClick={this.onResize.bind(this)}>Resize</button>
            </div>
            <Ball
                style={{
                    left      : this.props.left - this.props.size/2,
                    top       : Math.max(156, this.props.top - this.props.size/2),
                    transform : `scale(${this.props.scale})`,
                    height    : this.props.size,
                    width     : this.props.size
                }}
                onClick={e => this.onBallClick(e)}
                className={this.props.tracking ? "" : "highlighted"}
            />
        </div>
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    move: (left, top) => {
        dispatch({ type: "move", left, top });
    },

    resize: scale => {
        dispatch({ type: "resize", scale });
    },

    toggleTrack: () => {
        dispatch({ type: "toggle_track" });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);