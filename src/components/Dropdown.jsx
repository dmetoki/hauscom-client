import React from 'react';
import '../css/Dropdown.css'
import { useMentionsReducer } from '../context/MentionsContext';
import { ACTIONS } from '../reducers/ACTIONS';

function Dropdown({options, selection, id}) {
    const {filter, setFilter} = useMentionsReducer();
    const handleDropdown = (param) => {
        const elements = document.querySelectorAll('.dd');
        elements.forEach(element => {
            element.id !== param.parentNode.id ? element.classList.remove('open') : element.classList.toggle('open')
        })
    }
    return(
        <React.Fragment>
            <div className='dd' id={`${id}`}>
                <div className='dd-selection' onClick={(e) => {handleDropdown(e.target)}}>{<span>{selection}</span>}</div>
                <div className="dd-options">
                    {options && options.map((item, index) => {
                        return (
                            <div className='dd-item' key={index} onClick={(e) => (setFilter({tone: item}))}>
                                {<span>{item}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
export default Dropdown;