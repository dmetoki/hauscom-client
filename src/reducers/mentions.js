import { ACTIONS } from '../reducers/ACTIONS';
// const {REACT_APP_MENTIONS_API, REACT_APP_ORIGIN_DOMAIN} = process.env;

export function mentionsReducer(state, action) {
    switch(action.type) {
        case ACTIONS.GET_MENTIONS:
            return action.payload
        default: return state
    }
};