import {Box, Grid, TextField, Button, Input, InputLabel} from '@mui/material';
import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numPlayers: null,
            players: [],
            scores: [],
            currentPlayer: 0,
            gameStarted: false,
            gameOver: false,
            roundScore: 0,
            canChangeName: true,
        };
    }

    handleStartGame = () => {
        this.setState({ gameStarted: true });
    }
    handlePlayerNameChange = (event, index) => {
        const players = [...this.state.players];
        players[index] = event.target.value;
        this.setState({players});
        this.setState({ gameStarted: true });
    };
    handleNewGame = () => {
        this.setState({
            numPlayers: null,
            players: [],
            currentPlayer: 0,
            scores: [],
            steps: [],
            roundScore: 0,
            gameOver: false,
            gameStarted: false,
        });
    };
    handleConfirmNumPlayers = () => {
        if (this.state.numPlayers) {
            const players = Array.from({length: this.state.numPlayers}, (_, i) => `Player ${i + 1}`);
            const scores = Array.from({length: this.state.numPlayers}, () => Math.floor(Math.random() * 100));
            const steps = Array.from({length: this.state.numPlayers}, () => 0);
            this.setState({gameStarted: true, players, scores, steps});
        }
    }


    handleNumPlayersChange = (event) => {
        const numPlayers = parseInt(event.target.value);
        this.setState({numPlayers});
    }

    handleScoreChange = (operation) => {
        /*
        * 1. Get the current player's score
        * 2. Update the score based on the operation
        * 3. Update the state with the new score
        * 4. Update the current player
        *
        */

        const { players, currentPlayer, scores, steps } = this.state;
        const updatedScores = [...scores];
        const uprateNumOfSteps = [...steps];

        switch (operation) {
            case 'add':
                updatedScores[currentPlayer] += 1;
                break;
            case 'subtract':
                updatedScores[currentPlayer] -= 1;
                break;
            case 'multiply':
                updatedScores[currentPlayer] *= 2;
                break;
            case 'divide':
                updatedScores[currentPlayer] /= 2;
                break;
            default:
                break;
        }

        uprateNumOfSteps[currentPlayer] += 1;
        const nextPlayer = (currentPlayer + 1) % players.length;
        if (updatedScores[currentPlayer] === 100) {
            this.setState({ gameOver: true,scores: updatedScores,steps: uprateNumOfSteps });


        }
        else
        {
            this.setState({
                scores: updatedScores,
                steps: uprateNumOfSteps,
                currentPlayer: nextPlayer,
            });
        }
    }

    render() {
        if (!this.state.numPlayers || !this.state.gameStarted) {
            return (
                <Box className="h-full flex flex-col gap-8 mx-auto max-w-xl items-center justify-center  text-slate-900 text-2xl">
                    <InputLabel className="" htmlFor="num-players-picker">
                        Number of players:
                    </InputLabel>
                    <Input
                        id="num-players-picker"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                        type="number"
                        min="1"
                        max="12"
                        onChange={this.handleNumPlayersChange}
                        onKeyUp={(event) =>
                            event.key === "Enter" && this.handleConfirmNumPlayers()
                        }
                    />
                    <Button
                        className=""
                        disabled={!this.state.numPlayers}
                        onClick={this.handleConfirmNumPlayers}
                    >
                        Start game
                    </Button>
                </Box>
            );
        }

        // Check if player names have been entered, if not render name input fields
        let playersHaveNames = this.state.players.every((player) => player.name !== '');
        if (!playersHaveNames) {
            return (
                <Box>
                    {this.state.players.map((player, i) => (
                        <Box key={i}>
                            <InputLabel>
                                Player {i + 1} name:
                                <Input
                                    type="text"
                                    value={player.name}
                                    onChange={(event) => this.handlePlayerNameChange(event, i)}
                                />
                            </InputLabel>
                        </Box>
                    ))}
                    <Button onClick={this.handleStartGame}>Start game</Button>
                </Box>
            );
        }

        // Store the inputted names in an array
        const playerNames = this.state.players.map(player => player.name);



        // Determine if the game has started and if names can be edited
        const canEditNames = !this.state.gameStarted;

        const currentPlayer = this.state.players[this.state.currentPlayer];
        const currentScore = this.state.scores[this.state.currentPlayer];
        const currentStep = this.state.steps[this.state.currentPlayer];




        return (
            <Grid>
                <Box className="">
                    {this.state.players.map((player, i) => (
                        <Box className={`player ${this.state.currentPlayer === i ? "current" : ""}`} key={i}>
                            <h3>{player.name}</h3>
                            <Box>Score: {this.state.scores[i]}</Box>
                            <Box>Steps: {this.state.steps[i]}</Box>
                            <InputLabel>
                                Name:
                                <Input
                                    type="text"
                                    value={player.name}
                                    onChange={(event) => this.handlePlayerNameChange(event, i)}
                                />
                            </InputLabel>
                        </Box>
                    ))}
                </Box>
                <hr />
                <Box>Current player: {currentPlayer}</Box>
                <Box>Round score: {this.state.roundScore}</Box>
                {this.state.gameStarted && this.state.currentPlayer !== null && (
                    <Box>
                        <Button onClick={() => this.handleScoreChange('add')}>Add 1</Button>
                        <Button onClick={() => this.handleScoreChange('subtract')}>Subtract 1</Button>
                        <Button onClick={() => this.handleScoreChange('multiply')}>Multiply by 2</Button>
                        <Button onClick={() => this.handleScoreChange('divide')}>Divide by 2</Button>
                    </Box>
                )}
                {this.state.gameOver && (
                    alert(`Game over! ${currentPlayer} wins with a steps of ${currentStep}!`)
                    )}

                {!this.state.gameStarted && (
                    <Box className="h-full flex flex-col gap-8 mx-auto max-w-xl items-center justify-center text-slate-900 text-2xl">
                        <h2 className="text-5xl">Enter Player Names:</h2>
                        {this.state.players.map((player, i) => (
                            <Box className="player" key={i}>
                                <InputLabel>
                                    Player {i + 1}:
                                    <Input
                                        type="text"
                                        value={player.name}
                                        readOnly={this.state.playerNamesSubmitted}
                                        onChange={(event) => this.handlePlayerNameChange(event, i)}
                                    />
                                </InputLabel>
                            </Box>
                        ))}
                        <Button
                            className="px-8 py-4 bg-indigo-300 rounded-xl shadow-lg
                 hover:enabled:bg-indigo-500 hover:enabled:shadow-xl hover:enabled:shadow-indigo-400
                 focus:enabled:bg-indigo-400 focus:enabled:shadow-xl focus:enabled:shadow-indigo-400
                 focus:ring focus:ring-indigo-300 focus:ring-opacity-50
                 disabled={this.state.playerNamesSubmitted}"
                            onClick={this.handleStartGame}
                        >
                            Start game
                        </Button>
                    </Box>
                )}

                <Button onClick={this.handleNewGame}>New game</Button>
            </Grid>
        );
    }


}


export default Game;

export class game {
}