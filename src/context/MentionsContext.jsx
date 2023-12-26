import React, {useContext, useReducer, useState } from "react";
import {mentionsReducer} from '../reducers/mentions';
const MentionsReducerContext = React.createContext();

export function useMentionsReducer() {
    return useContext(MentionsReducerContext)
}

export function MentionsProvider({children}) {
    // mentions reducer
    const [state, dispatch] = useReducer(mentionsReducer, []);
    const [timeFrame, setTimeFrame] = useState({
        from: {
          year: 2023,
          month: 11,
          day: 1,
        },
        to: {
          year: 2023,
          month: 11,
          day: 30,
        }
      })
    
    return(
        <MentionsReducerContext.Provider value={{state, dispatch, timeFrame, setTimeFrame}}>
            {children}
        </MentionsReducerContext.Provider>
    )
}