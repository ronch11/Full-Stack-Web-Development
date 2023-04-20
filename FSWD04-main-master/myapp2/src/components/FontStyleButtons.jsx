import React, { Component } from 'react';

class FontStyleButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontStyle: 'normal'
        };
    }

    handleFontStyleChange = (style) => {
        this.setState({
            fontStyle: style
        });
        this.props.onFontStyleChange(style);

    }

    render() {
        const { fontStyle } = this.state;

        return (
            <div>
                <button className={fontStyle === 'normal' ? "grayed-out" : ""}
                    onClick={() => this.handleFontStyleChange('normal')}>
                    Normal
                </button>
                <button className={fontStyle === 'italic' ? "grayed-out" : ""}
                        style={{fontStyle: 'italic'}} onClick={() => this.handleFontStyleChange('italic')}>
                    Italic
                </button>
                <button className={fontStyle === 'oblique' ? "grayed-out" : ""}
                        style={{fontStyle: 'oblique'}} onClick={() => this.handleFontStyleChange('oblique')}>
                    Oblique
                </button>
            </div>
        );
    }
}

export default FontStyleButtons;
