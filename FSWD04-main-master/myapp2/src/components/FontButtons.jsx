import React, { Component } from 'react';

class FontButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            fontWeightChange: false,
            textDecorationChange: false
        };
    }

    handleFontWeightChange = (weight) => {
        const { textDecoration } = this.state;
        if(this.state.fontWeightChange) {
            this.setState({
                fontWeight: 'none',
                fontWeightChange: false,
                fontStyle: textDecoration === 'underline' ? 'none' : 'normal'
            });
            this.props.onFontWeightChange('none');
            this.props.onFontStyleChange(textDecoration === 'underline' ? 'none' : 'normal');
        }
        else{
            this.setState({
                fontWeight: weight,
                fontStyle: 'none',
                fontWeightChange: true
            });
            this.props.onFontWeightChange(weight);
            console.log(weight);
            this.props.onFontStyleChange(weight);
        }
    }

    handleFontStyleChange = (style) => {
        const { fontWeight } = this.state;
        this.setState({
            fontStyle: style,
            textDecoration: 'none',
            fontWeightChange: false,
            textDecorationChange: false,
            fontWeight:'none'
        });
        this.props.onFontStyleChange(style);
        this.props.onFontWeightChange('none');
        this.props.onTextDecorationChange('none');
    }

    handleTextDecorationChange = (decoration) => {
        const { fontWeight } = this.state;
        if(this.state.textDecorationChange) {
            this.setState({
                textDecoration: 'none',
                textDecorationChange: false,
                fontStyle: fontWeight === 'bold' ? fontWeight : 'normal'
            });
            this.props.onTextDecorationChange('none');
            this.props.onFontStyleChange(fontWeight === 'bold' ? fontWeight : 'normal');

        }
        else {
            this.setState({
                textDecoration: decoration,
                fontStyle: fontWeight === 'bold' ? fontWeight : 'none',
                textDecorationChange: true
            });
            this.props.onTextDecorationChange(decoration);
            this.props.onFontStyleChange(fontWeight === 'bold' ? fontWeight : 'none');
        }
    }

    render() {
        const { fontWeight, fontStyle, textDecoration } = this.state;

        return (
            <div>
                <button className={fontStyle === 'normal' && textDecoration === 'none' ? "grayed-out" : ""}
                        onClick={() => this.handleFontStyleChange('normal')}>
                    Normal
                </button>
                <button className={fontWeight === 'bold' ? "grayed-out" : ""}
                        style={{fontWeight: 'bold'}} onClick={() => this.handleFontWeightChange('bold')}>
                    B
                </button>
                <button className={textDecoration === 'underline' ? "grayed-out" : ""}
                        style={{textDecoration: 'underline'}} onClick={() => this.handleTextDecorationChange('underline')}>
                    U
                </button>
            </div>
        );
    }
}

export default FontButtons;
