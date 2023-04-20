import React, { Component } from 'react';

class ColorButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeColor: 'black'
        };
    }

    handleColorChange = (color) => {
        this.setState({
            activeColor: color
        });
        this.props.onColorChange(color);

    }

    render() {
        const { activeColor } = this.state;

        return (
            <div>
                <button className={activeColor === 'red' ? "grayed-out" : "red"}
                        style={{ color: 'white'}}
                        onClick={() => this.handleColorChange('red')}>
                    Red
                </button>
                <button className={activeColor === 'blue' ? "grayed-out" : "blue"}
                        style={{ color: 'white'}}
                        onClick={() => this.handleColorChange('blue')}>
                    Blue
                </button>
                <button className={activeColor === 'green' ? "grayed-out" : "green"}
                        style={{ color: 'white'}}
                        onClick={() => this.handleColorChange('green')}>
                    Green
                </button>
                <button className={activeColor === 'black' ? "grayed-out" : "black"}
                        style={{ color: 'white'}}
                        onClick={() => this.handleColorChange('black')}>
                    Black
                </button>
            </div>
        );
    }
}

export default ColorButtons;
