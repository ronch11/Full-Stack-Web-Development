// import {Component} from "react";
// import React, { Component } from 'react';
//
// export default class TextEditor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             text: '',
//             language: 'english',
//             fontSize: 16,
//             fontFamily: 'Arial',
//             color: 'black',
//             uppercase: false,
//             bold: false,
//             italic: false,
//         };
//     }
//
//     handleChange = (event) => {
//         const newText = event.target.value;
//         this.setState(prevState => ({
//             text: newText,
//             buffer: [...prevState.buffer, prevState.text] // add current text to buffer
//         }));
//     };
//
//     handleUndo = () => {
//         const previousText = this.state.buffer.pop(); // remove last state from buffer
//         this.setState(prevState => ({
//             text: previousText,
//             buffer: prevState.buffer // update buffer state
//         }));
//     };
//
//     handleLanguageChange=(language)=> {
//         this.setState({ language });
//     }
//
//     handleFontSizeChange=(fontSize)=> {
//         this.setState({ fontSize });
//     }
//
//     handleFontFamilyChange=(fontFamily)=> {
//         this.setState({ fontFamily });
//     }
//
//     handleColorChange=(color) =>{
//         this.setState({ color });
//     }
//
//     handleUppercaseToggle=()=> {
//         this.setState((prevState) => ({
//             uppercase: !prevState.uppercase,
//         }));
//     }
//
//     handleBoldToggle=()=> {
//         this.setState((prevState) => ({
//             bold: !prevState.bold,
//         }));
//     }
//
//     handleItalicToggle=()=> {
//         this.setState((prevState) => ({
//             italic: !prevState.italic,
//         }));
//     }
//
//     handleDelete=()=> {
//         const newText = this.state.text.slice(0, -1);
//         this.setState({ text: newText });
//     }
//
//     handleClear=()=> {
//         this.setState({ text: '' });
//     }
//
//     handleUndo=()=> {
//         // Implement undo logic here
//     }
//
//     render() {
//         const {
//             text,
//             language,
//             fontSize,
//             fontFamily,
//             color,
//             uppercase,
//             bold,
//             italic,
//         } = this.state;
//         const style = {
//             fontSize,
//             fontFamily,
//             color,
//             textTransform: uppercase ? 'uppercase' : 'none',
//             fontWeight: bold ? 'bold' : 'normal',
//             fontStyle: italic ? 'italic' : 'normal',
//         };
//         return (
//             <div className="text-editor">
//                 <div
//                     className="text-box"
//                     contentEditable
//                     onInput={this.handleChange}
//                     style={style}
//                 >
//                     {text}
//                 </div>
//                 <button onClick={() => this.handleLanguageChange('english')}>
//                     English
//                 </button>
//                 <button onClick={() => this.handleLanguageChange('hebrew')}>
//                     Hebrew
//                 </button>
//                 <button onClick={() => this.handleLanguageChange('emoji')}>
//                     Emoji
//                 </button>
//                 <button onClick={() => this.handleFontSizeChange(16)}>
//                     16px
//                 </button>
//                 <button onClick={() => this.handleFontSizeChange(24)}>
//                     24px
//                 </button>
//                 <button onClick={() => this.handleFontSizeChange(32)}>
//                     32px
//                 </button>
//                 <button onClick={() => this.handleFontFamilyChange('Arial')}>
//                     Arial
//                 </button>
//                 <button onClick={() => this.handleFontFamilyChange('Times')}>
//                     Times
//                 </button>
//                 <button onClick={() => this.handleFontFamilyChange('Courier')}>
//                     Courier
//                 </button>
//                 <button onClick={() => this.handleColorChange('black')}>
//                     Black
//                 </button>
//                 <button onClick={() => this.handleColorChange('red')}>
//                     Red
//                 </button>
//                 <button onClick={() => this.handleColorChange('blue')}>
//                     Blue
//                 </button>
//                 <button onClick={this.handleUppercaseToggle}>
//                     Uppercase
//                 </button>
//                 <button onClick={this.handleBoldToggle}>Bold</button>
//                 <button onClick={this.handleItalicToggle}>Italic</button>
//                 <button onClick={this.handleDelete}>Delete</button>
//                 <button onClick={this.handleClear}>Clear</button>
//                 <button onClick={this.handleUndo}>Undo</button>
//
//             </div>
//         );
//     }
// }
