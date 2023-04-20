import React, { Component } from 'react';

class LanguageButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButtonId: 1
    };
  }

  handleLanguageChange = (buttonId) => {
    this.setState({
      activeButtonId: buttonId
    });
      this.props.onLanguageChange(buttonId);

  }

  render() {
    const { activeButtonId } = this.state;

    return (
      <div>
        <button
          className={activeButtonId === 1 ? "grayed-out" : ""}
          onClick={() => this.handleLanguageChange(1)}
        >
          English
        </button>
        <button
          className={activeButtonId === 2 ? "grayed-out" : ""}
          onClick={() => this.handleLanguageChange(2)}
        >
          עברית
        </button>
        <button
          className={activeButtonId === 3 ? "grayed-out" : ""}
          onClick={() => this.handleLanguageChange(3)}
        >
          Emoji
        </button>
        <button
          className={activeButtonId === 5 ? "grayed-out" : ""}
          onClick={() => this.handleLanguageChange(5)}
        >
          한국어
        </button>
      </div>
    );
  }
}

export default LanguageButtons;
