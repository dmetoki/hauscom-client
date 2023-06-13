import { ACTIONS } from '../reducers/ACTIONS';
// const {REACT_APP_MENTIONS_API, REACT_APP_ORIGIN_DOMAIN} = process.env;

export function mentionsReducer(state, action) {
    switch(action.type) {
        case ACTIONS.GET_MENTIONS:
            return action.payload
        case ACTIONS.SELECT_OPTION:
            return state.map(item => {
                if(`${action.entity}-${item.id}` == `${action.entity}-${action.id}`) {
                    item[`${action.entity}`] = action.selection
                    // close dopdown after selection
                    document.getElementById(`${action.entity}-${item.id}`).classList.remove('open')
                    return item
                } else {
                    return {...item}
                }
            })
            case ACTIONS.SET_FAVORITE:
                return state.map(item => {
                    if(item.id == action.id) {
                        item.favorite = !action.favorite
                        return item
                    } else {
                        return {...item}
                    }
                })
        default: return state
    }
};