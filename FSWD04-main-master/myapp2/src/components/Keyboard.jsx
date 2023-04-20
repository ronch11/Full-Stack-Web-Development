import React, {useState} from 'react';
import {Box, Grid, TextField, Button} from '@mui/material';
import {KeyboardButton} from './KeyboardButton.jsx';
import ReactDOMServer from 'react-dom/server';
import LanguageButtons from "./LanguageButtons";
import ColorButtons from "./ColorButtons";
import FontStyleButtons from "./FontStyleButtons";
import FontButtons from "./FontButtons";

export class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 1,
            inputValue: [],
            fontSize: 20,
            color: 'black',
            fontStyle: 'normal',
            fontFamily: 'Arial',
            fontWeight: 'normal',
            textDecoration: 'none',
            isGrayOut: false,
        };
    }

    handleDelete = () => {
        console.log('delete: ', this.state.inputValue);
        this.state.inputValue.pop()
        this.setState({inputValue: this.state.inputValue});
    };
    handleButtonClick = value => {
        console.log(value);
        const style = {
            fontSize: this.state.fontSize, color: this.state.color, fontStyle: this.state.fontStyle,
            fontFamily: this.state.fontFamily,
            fontWeight: this.state.fontWeight,
            textDecoration: this.state.textDecoration
        };
        const pElement = {key: value, value: value, style: style};
        this.setState(prevState => ({inputValue: [...prevState.inputValue, pElement]}));
        console.log(this.state.inputValue);
    };

    // handleInputChange = event => {
    //     // const parser = new DOMParser();
    //     // const docFrag = parser.parseFromString(this.state.inputValue, 'text/html');
    //     // const pElements = Array.from(docFrag.querySelectorAll('span'));
    //
    //     console.log('append', this.state.inputValue);
    //     // console.log('t:', textContent);
    //     // this.setState({inputValue: [...this.state.inputValue]});
    //     // this.setState({ inputValue: event.target.value });
    // };

    genK = (letters, id, lan, endFirstRow, endSecRow, end, deleteL, toLower) => {

        return <Grid id={id} hidden={this.state.language !== lan} item xs={4}>
            <Grid container direction="column">
                <Grid item container direction="row" mb={2}>
                    {letters.slice(0, endFirstRow).map((letter, index) => (
                        <Grid key={letter} item xs={0.9} style={{order: index}}>
                            <KeyboardButton customStyle={{textTransform: 'none'}}
                                            onClick={() => this.handleButtonClick(toLower ? letter.toLowerCase() : letter)}>
                                {toLower ? letter.toLowerCase() : letter}
                            </KeyboardButton>
                        </Grid>
                    ))}
                </Grid>
                <Grid item container direction="row" mb={2}>
                    {letters.slice(endFirstRow, endSecRow).map((letter, index) => (
                        <Grid key={letter} item xs={0.9} style={{order: index}}>
                            <KeyboardButton customStyle={{textTransform: 'none'}}
                                            onClick={() => this.handleButtonClick(toLower ? letter.toLowerCase() : letter)}>
                                {toLower ? letter.toLowerCase() : letter}
                            </KeyboardButton>
                        </Grid>
                    ))}
                </Grid>
                <Grid item container direction="row" mb={2}>
                    {letters.slice(endSecRow, end).map((letter, index) => (
                        <Grid key={letter} item xs={0.9} style={{order: index}}>
                            <KeyboardButton customStyle={{textTransform: 'none'}}
                                            onClick={() => this.handleButtonClick(toLower ? letter.toLowerCase() : letter)}>
                                {toLower ? letter.toLowerCase() : letter}
                            </KeyboardButton>

                        </Grid>
                    ))}

                    {(lan === 1 || lan === 4)  ?(
                        <Grid key={'letter'} item xs={0.9} style={{order: 7}}>

                        <KeyboardButton onClick={() => this.handleChangeEnglish(lan)}>
                            {'\u2191'}
                        </KeyboardButton>
                        </Grid>): null
                    }
                </Grid>
                <Grid item container direction="row" mb={2}>
                    {letters.slice(end).map((letter, index) => (
                        <Grid key={letter} item xs={2} style={{order: index}}>
                            <KeyboardButton customStyle={{textTransform: 'none'}}
                                            onClick={() => this.handleButtonClick(' ')}>
                                {letter.toUpperCase()}
                            </KeyboardButton>

                        </Grid>

                    ))}
                    <Button variant="contained" sx={{height: 64, fontSize: 24}} onClick={() => this.handleDelete()}>
                        {deleteL}
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    }

    handleChangeEnglish = (lan) => {
        this.setState({language: lan==1?4:1});
    }
    handleLanguageChange = language => {
        this.setState({language: language});
    }
    handleFontSizeMinusChange = () => {
        this.setState({fontSize: this.state.fontSize - 1});
    }

    handleFontSizePlusChange = () => {
        this.setState({fontSize: this.state.fontSize + 1});
    }

    handleColorChange = color => {
        this.setState({color: color});
    }

    handleClearAll = () => {
        this.setState({inputValue: []});
    }

    handleLowerAll = () => {
        this.state.inputValue.map((letter, index) => {
            letter.value = letter.value.toLowerCase()
        });
        this.setState({inputValue: this.state.inputValue});
    }

    handleUpperAll = () => {
        this.state.inputValue.map((letter, index) => {
            letter.value = letter.value.toUpperCase()
        });
        this.setState({inputValue: this.state.inputValue});
    }

    handleFontStyleChange = fontStyle => {
        this.setState({fontStyle: fontStyle});
    }

    handleFontFamilyChange = fontFamily => {
        this.setState({fontFamily: fontFamily});
    }

    handleFontWeightChange = fontWeight => {
        this.setState({fontWeight: fontWeight});
    }

    handleFontDecorationChange = fontDecoration => {
        this.setState({textDecoration: fontDecoration});
    }

    handleFontStyleUnderChange = fontStyle => {
        this.setState({textDecoration: fontStyle});
    }

    render() {


        const englishLetters = [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'space'
        ];

        const hebrewLetters = ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', 'ש', 'ד',
            'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', 'ז',
            'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', 'רווח'];

        const koreanLetters = [
            'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ',
            'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ',
            'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '공간'
        ];
        const emojiLetters = [
            '😀', '😂', '😍', '🤔', '🤷', '💩', '👍', '👎', '👌',
            '👋', '🤚', '🙌', '👏', '🤝', '❤️', '🔥', '💯', '🎉',
            '🎁', '🎂', '🍔', '🍕', '🍟', '🍺', '🍩'
        ];

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const style = {whiteSpace: 'pre-wrap'};
        const div = document.createElement('div');
        const parser = new DOMParser();
        const docFrag = parser.parseFromString(this.state.inputValue, 'text/html');
        const pElements = Array.from(docFrag.querySelectorAll('span'));

        console.log('append', this.state.inputValue);
        pElements.forEach(p => div.appendChild(p));
        const textContent = div.textContent;
        console.log('t:', textContent);

        const { isGrayOut } = this.state;
        const buttonClasses = isGrayOut ? 'grayed-out' : '';
        console.log('buttonClasses', buttonClasses);
        return (
            <Box sx={{p: 2}} display='flex'>

                <Box sx={{mt: 2}}>

                <Box sx={{mt: 4}} display='flex'>
                    <Box sx={{mt: 4}}>
                        <p style={{minHeight: '6em',minWidth:'60em',maxWidth:'60em',display: 'inline-block', wordBreak: 'break-all'}}>
                            {this.state.inputValue.map(spanJson => <span key={spanJson.value}
                                                                         style={spanJson.style}>{spanJson.value}</span>)}
                        </p>
                    </Box>

                </Box>
                <Grid container spacing={2} sx={{mt: 2, width: 1000}}>
                    <Grid container spacing={2} direction={"column"} sx={{mt: 2, ml: 2, width: 1000}}>

                        <Grid item container direction="row" mb={1} sx={{width: 1000}}>
                            {numbers.map((letter, index) => (
                                <Grid key={letter} item xs={0.9} style={{order: index}}>
                                    <KeyboardButton customStyle={{textTransform: 'none'}}
                                                    onClick={() => this.handleButtonClick(letter)}>
                                        {letter}
                                    </KeyboardButton>
                                </Grid>
                            ))}
                        </Grid>
                        {this.genK(englishLetters, 'english', 1, 10, 19, 26, 'delete', false)}
                        {this.genK(hebrewLetters, 'hebrew', 2, 8, 18, 27, 'מחיקה', false)}
                        {this.genK(emojiLetters, 'emoji', 3, 8, 18, 26, 'delete', false)}
                        {this.genK(englishLetters, 'english-lower', 4, 10, 19, 26, 'delete', true)}
                        {this.genK(koreanLetters, 'korean', 5, 9, 18, 26, '삭제', false)}
                    </Grid>
                </Grid>
                </Box>
                <Box sx={{mt: 2}}>

                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Change Keyboard</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <LanguageButtons onLanguageChange={this.handleLanguageChange}/>

                        </Box>
                    </Box>
                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Change Font Size</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <button style={{marginRight: 10}} onClick={() => this.handleFontSizeMinusChange()}>
                                -
                            </button>

                            <text style={{fontSize: 20}}>{this.state.fontSize}</text>

                            <button style={{marginLeft: 10}} onClick={() => this.handleFontSizePlusChange()}>
                                +
                            </button>
                        </Box>
                    </Box>
                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Change Font Color</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <ColorButtons onColorChange={this.handleColorChange}/>
                        </Box>
                    </Box>
                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Special</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <button onClick={() => this.handleClearAll()}>
                                Clear All
                            </button>
                            <button onClick={() => this.handleLowerAll()}>
                                Lower All
                            </button>
                            <button onClick={() => this.handleUpperAll()}>
                                Upper All
                            </button>

                        </Box>
                    </Box>
                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Font Style</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <FontStyleButtons onFontStyleChange={this.handleFontStyleChange}/>
                        </Box>
                    </Box>
                    <Box sx={{mt: 2}} m={4}>
                        <Box sx={{mt: 2}}>
                            <text><b>Font Weight</b></text>
                        </Box>
                        <Box sx={{mt: 2}}>
                            <FontButtons onFontWeightChange={this.handleFontWeightChange} onTextDecorationChange={this.handleFontStyleUnderChange}
                                         onFontStyleChange={this.handleFontWeightChange}/>
                            {/*<button onClick={() => this.handleFontWeightChange('normal')}>*/}
                            {/*    Normal*/}
                            {/*</button>*/}
                            {/*<button style={{fontWeight: 'bold'}} onClick={() => this.handleFontWeightChange('bold')}>*/}
                            {/*    B*/}
                            {/*</button>*/}
                            {/*<button style={{textDecoration: 'underline'}}*/}
                            {/*        onClick={() => this.handleFontStyleUnderChange('underline')}>*/}
                            {/*    U*/}
                            {/*</button>*/}
                        </Box>
                    </Box>
                </Box>
            </Box>

        );
    }
}
