import React from 'react';
import { Button } from '@mui/material';


export class KeyboardButton extends React.Component {
    render() {
        const style = this.props.customStyle ? this.props.customStyle : { textTransform: 'none' };
        return (
            <Button variant="contained" style={style} onClick={this.props.onClick} sx={{ height: 64, fontSize: 24 }}>
                {this.props.children}
            </Button>
        );
    }
}
