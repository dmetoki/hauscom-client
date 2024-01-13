import React from 'react';
import '../css/Dropdown.css'

function Dropdown({options, selection, id, setAdvFilter}) {
    const handleDropdown = (param) => {
        const elements = document.querySelectorAll('.dd');
        elements.forEach(element => {
            element.id !== param.parentNode.id ? element.classList.remove('open') : element.classList.toggle('open')
        })
    }
    const closeDropdown = () => {
        document.getElementById(id).classList.remove('open')
    }
    return(
        <React.Fragment>
            <div className='dd' id={`${id}`}>
                <div className='dd-selection' onClick={(e) => {handleDropdown(e.target)}}>{<span>{selection !== 'all' ? selection : 'select...'}</span>}</div>
                <div className="dd-options">
                    {options && options
                    .sort((a, b) => a.localeCompare(b))
                    .map((item, index) => {
                        if (item !== selection) {
                            return (
                                <div className='dd-item' key={index} onClick={() => { setAdvFilter(prevFilter => ({ ...prevFilter, tone: item })); closeDropdown(); }}>
                                    {<span>{item}</span>}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
export default Dropdown;