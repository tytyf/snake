import { SET_POSITION } from '../types/types';

export default (state = [], action) => {
    switch (action.type) {
        case SET_POSITION:
            return action.positionsArr;
        default:
            return state;
    }
}