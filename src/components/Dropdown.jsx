import React from 'react';
import { useMentionsReducer } from '../context/MentionsContext';
import { ACTIONS } from '../reducers/ACTIONS';
import '../css/Dropdown.css'

function Dropdown({selection, options, id, entity, type}) {
    const {dispatch} = useMentionsReducer();

    const handleDropdown = (param) => {
        const elements = document.querySelectorAll('.dd');
        elements.forEach(element => {
            element.id !== param.parentNode.id ? element.classList.remove('open') : element.classList.toggle('open')
        })
    }
    return(
        <React.Fragment>
            <div className='dd' id={`${entity}-${id}`}>
                <div className={`dd-selection ${type ? `icons ${selection}` : ''}`} onClick={(e) => {handleDropdown(e.target)}}>{!type ? <span>{selection}</span> : null}</div>
                <div className="dd-options">
                    {options.map((item, index) => {
                        return (
                            <div className={`dd-item ${type ? `icons ${item}` : ''}`} key={index} onClick={(e) => (dispatch({type: ACTIONS.SELECT_OPTION, entity: entity, id: id, selection: !type ? e.target.innerText : e.target.classList.item(2)}))}>
                                {!type ? <span>{item}</span> : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
export default Dropdown;