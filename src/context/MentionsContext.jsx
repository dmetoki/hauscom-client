import React, {useContext, useReducer, useState } from "react";
import {mentionsReducer} from '../reducers/mentions';
const MentionsReducerContext = React.createContext();
const ExpandedArticleContext = React.createContext();

export function useMentionsReducer() {
    return useContext(MentionsReducerContext)
}

export function useExpandedArticle() {
    return useContext(ExpandedArticleContext)
}

export function MentionsProvider({children}) {
    // mentions reducer
    const [state, dispatch] = useReducer(mentionsReducer, []);
    const [expandedArticle, setExpandedArticle] = useState();
    
    return(
        <MentionsReducerContext.Provider value={{state, dispatch}}>
            <ExpandedArticleContext.Provider value={{expandedArticle, setExpandedArticle}}>
                {children}
            </ExpandedArticleContext.Provider>
        </MentionsReducerContext.Provider>
    )
}