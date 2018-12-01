import React, { Component } from 'react';
import './slideshowLight.css';

const defaultProps = {
    leftIcon: '<',
    rightIcon: '>',
    children: [1, 2, 3, 4, 5],
    interval: 3000,
    onLeftClick: d => d,
    onRightClick: d => d,
};

export class SlideshowLight extends Component {
    constructor() {
        super();
        this.state = { currElemIndex: 0 };
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer() {
        clearInterval(this.state.timer);
        this.setState({ timer: null });
    }

    startTimer() {
        this.setState({
            timer: setInterval(() => {
                this.goRight();
            }, this.props.interval)
        })
    }

    goLeft() {
        this.changeIndex(-1);
        this.props.onLeftClick();
    }

    goRight() {
        this.changeIndex(1);
    }

    changeIndex(diff) {
        let val = this.state.currElemIndex + diff;
        if (val < 0) {
            val = this.props.children.length - 1;
        } else if (val === this.props.children.length) {
            val = 0;
        }
        this.setState(d => ({ currElemIndex: val }));
    }

    render() {
        return (
            <div
                style={Object.assign({ position: 'relative', display: 'block', textAlign: 'center', minHeight: '100px' }, this.props.style)}
                onMouseOver={d => this.clearTimer()}
                onMouseOut={d => this.startTimer()}
            >
                {this.props.children.length > 1 ? (
                    <div
                        className={'carousel-ctrl carousel-left'}
                        style={this.props.iconStyle}
                        onClick={d => {
                            this.goLeft();
                            this.props.onLeftClick(d);
                        }}
                    >
                        {this.props.leftIcon}
                    </div>
                ) : null}
                <div>
                    {this.props.children.map((child, ind) => (
                        this.state.currElemIndex === ind ? <div>{child}</div> : null
                    ))}
                </div>
                {this.props.children.length > 1 ? (
                    <div
                        className={'carousel-ctrl carousel-right'}
                        style={this.props.iconStyle}
                        onClick={d => {
                            this.goRight();
                            this.props.onRightClick(d);
                        }}
                    >
                        {this.props.rightIcon}
                    </div>
                ) : null}
            </div>
        );
    }
}

SlideshowLight.defaultProps = defaultProps;

export default SlideshowLight;