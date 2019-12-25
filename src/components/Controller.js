import React from 'react';
import { connect } from 'react-redux';
import SnakeHead from './Snake/SnakeHead';
import SnakeBody from './Snake/SnakeBody';
import SnakeFood from './SnakeFood/SnakeFood';
import generateCordinates from '../functions/generateCordinates';
import { startSetPreviousSnakePosition } from '../actions/snake';

// This controller is in charge of providing the SnakeHead with its current cordinates.
// It also generates random cordinates for the SnakeFood.
// Each interval it will check if the SnakeFood cordinates are equal to the SnakeHead cordinates.

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Cordinates will be passed as props to the corresponding component.
            snakeHeadCordinates: {
                position: 'absolute',
                top: 0,
                left: 0,
            },
            snakeFoodCordinates: {
                position: 'absolute',
                top: 100,
                left: 0
            },
            foodEatenCount: [],     // Count stored as an array for easy mapping and returning of the SnakeBody.
            currentInterval: "",    // currentInterval will store a reference to the current interval running for clearInterval.
            currentKey: ""          // currentKey will correspond to which direction the snake is currently going.
        }

        this.keydown = this.keydown.bind(this);
        this.checkCordinates = this.checkCordinates.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
    }
    componentWillMount() {
        // Add event listener to the whole window.
        document.body.addEventListener('keydown', this.keydown);

        // Generate cordinates for the snake food.
        const snakeFoodCordinates = generateCordinates();
        this.setState({ snakeFoodCordinates })
    }
    keydown(e) {
        
        // If the keypressed does not equal the currentKey.
        if (e.key !== this.state.currentKey) {
            // Clear interval to prevent any strange diagonal movement.
            clearInterval(this.state.currentInterval);

            // Switch on the key that was pressed.
            switch(e.key) {
                case 'ArrowUp':
                    this.moveUp();
                    return;
                case 'ArrowRight':
                    this.moveRight();
                    return;
                case 'ArrowDown':
                    this.moveDown();
                    return;
                case 'ArrowLeft':
                    this.moveLeft();
                    return;
            }
        }


    }
    // Checks if the SnakeHead cordinates matches the SnakeFood cordinates.
    checkCordinates() {
        // Get the current values of cordinates for easy comparing.
        const snakeHeadTop = this.state.snakeHeadCordinates.top;
        const snakeHeadLeft = this.state.snakeHeadCordinates.left;
        const snakeFoodTop = this.state.snakeFoodCordinates.top;
        const snakeFoodLeft = this.state.snakeFoodCordinates.left;

        // If the cordinates are equal the snake ate some food.
        if (snakeHeadTop === snakeFoodTop && snakeHeadLeft === snakeFoodLeft) {
            // Refresh the foods cordinates.
            const snakeFoodCordinates = generateCordinates();
            this.setState({ snakeFoodCordinates })

            // Increase the snakes length.
            this.setState((prevState) => {
                return {
                    ...prevState,
                    foodEatenCount: [ ...prevState.foodEatenCount, prevState.foodEatenCount.length]
                }
            })
        }
    }
    moveUp() {
        // Create an interval so the snake keeps moving in the corresponding direction.
        // Store the interval within a variable in order to clear it when the next key is pressed.
        const moveUpInterval = setInterval(() => {
            // Store the previous SnakeHead cordinates for the SnakeBody.
            // Pass foodEatenCount as an argument in order to max out the amount of previous cordinates that should be stored.
            this.props.startSetPreviousSnakePosition(this.state.snakeHeadCordinates, this.state.foodEatenCount);

            // Update the snakes top to move it up.
            this.setState((prevState) => {
                return {
                    ...prevState,
                    snakeHeadCordinates: {
                        ...prevState.snakeHeadCordinates,
                        top: prevState.snakeHeadCordinates.top - 25
                    }
                }
            }, () => this.checkCordinates()) // Callback to check if these cordinates align with the foods cordinates.
        }, 160);

        this.setState({ currentInterval: moveUpInterval, currentKey:  'ArrowUp' })
    }
    moveRight() {
        // Create an interval so the snake keeps moving in the corresponding direction.
        // Store the interval within a variable in order to clear it when the next key is pressed.
        const moveRightInterval = setInterval(() => {
            // Store the previous SnakeHead cordinates for the SnakeBody.
            // Pass foodEatenCount as an argument in order to max out the amount of previous cordinates that should be stored.
            this.props.startSetPreviousSnakePosition(this.state.snakeHeadCordinates, this.state.foodEatenCount);

            // Update the snakes left to move it right.
            this.setState((prevState) => {
                return {
                    ...prevState,
                    snakeHeadCordinates: {
                        ...prevState.snakeHeadCordinates,
                        left: prevState.snakeHeadCordinates.left + 25
                    }
                }
            }, () => this.checkCordinates()) // Callback to check if these cordinates align with the foods cordinates.
        }, 160);

        this.setState({ currentInterval: moveRightInterval, currentKey:  'ArrowRight' });
    }
    moveDown() {
        // Create an interval so the snake keeps moving in the corresponding direction.
        // Store the interval within a variable in order to clear it when the next key is pressed.
        const moveDownInterval = setInterval(() => {
            // Store the previous SnakeHead cordinates for the SnakeBody.
            // Pass foodEatenCount as an argument in order to max out the amount of previous cordinates that should be stored.
            this.props.startSetPreviousSnakePosition(this.state.snakeHeadCordinates, this.state.foodEatenCount);

            // Update the snakes top to move it down.
            this.setState((prevState) => {
                return {
                    ...prevState,
                    snakeHeadCordinates: {
                        ...prevState.snakeHeadCordinates,
                        top: prevState.snakeHeadCordinates.top + 25
                    }
                }
            }, () => this.checkCordinates()) // Callback to check if these cordinates align with the foods cordinates.
        }, 160)

        this.setState({ currentInterval: moveDownInterval, currentKey:  'ArrowDown'  })
    }
    moveLeft() {  
        // Create an interval so the snake keeps moving in the corresponding direction.
        // Store the interval within a variable in order to clear it when the next key is pressed.      
        const moveLeftInterval = setInterval(() => {
            // Store the previous SnakeHead cordinates for the SnakeBody.
            // Pass foodEatenCount as an argument in order to max out the amount of previous cordinates that should be stored.
            this.props.startSetPreviousSnakePosition(this.state.snakeHeadCordinates, this.state.foodEatenCount);

            // Update the snakes left to mvoe it left.
            this.setState((prevState) => {
                return {
                    ...prevState,
                    snakeHeadCordinates: {
                        ...prevState.snakeHeadCordinates,
                        left: prevState.snakeHeadCordinates.left - 25
                    }
                }
            }, () => this.checkCordinates()) // Callback to check if these cordinates align with the foods cordinates.
        }, 160)

        this.setState({ currentInterval: moveLeftInterval, currentKey:  'ArrowLeft'  })
    }
    render() {
        return (
            <div>
                {/* SnakeHead passed with the snakeHeadCordinates as props. */}
                <SnakeHead cordinates={this.state.snakeHeadCordinates}/>

                {/* Foreach food eaten add a SnakeBody to trail behind the SnakeHead */}
                {this.state.foodEatenCount.map((index) => {
                    return (
                        <SnakeBody key={index} cordinates={this.props.snakeBody[this.props.snakeBody.length - (index + 1)]}/>
                    )
                })}

                {/* SnakeFood passed with the snakeFoodCordinates as props. */}
                <SnakeFood cordinates={this.state.snakeFoodCordinates}/>
            </div>
        )
    }
}

// Previous SnakeHead positions for the SnakeBody.
const mapStateToProps = (state) => ({
    snakeBody: state.snakeBody
})

// Allows easy storing of previous SnakeHead positions for the SnakeBody.
const mapDispatchToProps = (dispatch) => ({
    startSetPreviousSnakePosition: (position) => dispatch(startSetPreviousSnakePosition(position))
})

export default connect(mapStateToProps, mapDispatchToProps)(Controller);