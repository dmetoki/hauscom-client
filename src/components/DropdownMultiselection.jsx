import React, { useState } from 'react';
import '../css/Dropdown.css';

function DropdownMultiselection({ options, id, setAdvFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleDropdown = (param) => {
    const elements = document.querySelectorAll('.dd');
    elements.forEach((element) => {
      element.id !== param.parentNode.id ? element.classList.remove('open') : element.classList.toggle('open');
    });
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item) => {
    const isItemSelected = selectedItems.includes(item);
    const updatedSelectedItems = isItemSelected
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];

    setAdvFilter((prevFilter) => ({ ...prevFilter, source: updatedSelectedItems }));
    setSelectedItems(updatedSelectedItems);
  };

  const clearSelections = () => {
    setAdvFilter((prevFilter) => ({ ...prevFilter, source: [] }));
    setSelectedItems([]);
  };

  const isSelected = (item) => selectedItems.includes(item);

  const getSelectionText = () => {
    if (selectedItems.length === 0) {
      return 'select...';
    } else if (selectedItems.length === 1) {
      return selectedItems[0];
    } else {
      return 'multiple values';
    }
  };

  return (
    <React.Fragment>
        <div className={`dd ${isOpen ? 'open' : ''}`} id={`${id}`}>
            <div className='dd-selection' onClick={(e) => handleDropdown(e.target)}>
                <span>{selectedItems.length > 0 ? getSelectionText() : 'select...'}</span>
            </div>
            <div className="dd-options">
                {
                    options && options
                    .sort((a, b) => a.localeCompare(b))
                    .map((item, index) => (
                        <div
                            className={`dd-item ${isSelected(item) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleOptionClick(item)}
                        >
                            <span>{item}</span>
                        </div>
                    ))
                }
                <div className="button-container">
                    {selectedItems.length > 0 && (
                        <div className="clear-button" onClick={clearSelections}>clear</div>
                    )}
                    {selectedItems.length > 0 && (
                        <div className="apply-button" onClick={() => setIsOpen(false)}>close</div>
                    )}
                </div>
            </div>
        </div>
    </React.Fragment>
  );
}

export default DropdownMultiselection;
