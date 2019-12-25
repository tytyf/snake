import database from '../firebase/firebase';
import { SET_POSITION } from '../types/types';

// setPreviousSnakePosition stores the argument into redux.
const setPreviousSnakePosition = (positionsArr) => ({
    type: SET_POSITION,
    positionsArr
})

// checkSavedPositions in order to restrict the max number of positions saved, and return an array of past postions.
const checkSavedPositions = (foodEatenCount) => {
    return new Promise((resolve, reject) => {
        const max = foodEatenCount;
        
        database.ref('snakePosition').on('value', (snapshot) => {
            // If firebase has any positions stored.
            if (snapshot.val()) {
                const positions = Object.values(snapshot.val());
                
                // If the amount of positions exceeds the max allowed.
                if (positions.length > max) {
                    // Remove the oldest posititon.
                    positions.shift();
                    // Set firebase to match this change.
                    database.ref('snakePosition').set(positions);
                }
                // Resolve the promise with the positions to be stored in the redux state.
                resolve(positions);
            } else {
                resolve([]);
            }
        })
    })

}

// startSetPreviousSnakePosition stores the currentPosition into firebase, and then dispatch the return result from checkSavedPositions into redux.
export const startSetPreviousSnakePosition = (currentPosition, foodEatenCount) => {
    return (dispatch) => {
        checkSavedPositions(foodEatenCount) // foodEatenCount will be the max number of positions allowed to be saved.
            .then((positionsArr) => {
                // Push the current position.
                database.ref('snakePosition').push(currentPosition)
                .then(() => {
                    // Store the result from checkSavedPositions into redux state.
                    dispatch(setPreviousSnakePosition([ ...positionsArr, currentPosition ]))
                })
            })
    }
}

