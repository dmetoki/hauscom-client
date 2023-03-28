import React, {useState} from 'react';
import '../css/ToolBar.css';
import DatePicker from 'react-modern-calendar-datepicker-2023';
import 'react-modern-calendar-datepicker-2023/lib/DatePicker.css';

function ToolBar({totals, variation}) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: {
      year: 2022,
      month: 11,
      day: 1,
    },
    to: {
      year: 2022,
      month: 11,
      day: 30,
    }
  });
  const valueFormat =  (value) => {
    if (value >= 1000) {
        value = value / 1000 + 'k';
    }
    return value;
}
  return (
    <React.Fragment>
        <div className='toolbar'>
          <div>
            <h1>Overview</h1>
          </div>
          <div className='toolbar-right'>
            <div className='toolbar-highlight'>
              <h2>Mentions: {valueFormat(totals)}</h2> <div className={`trend ${variation > 0 ? 'up' : 'down'}`}>{Math.abs(variation.toFixed(0))}% MoM</div>
            </div>
            <DatePicker
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
              locale="es"
              colorPrimary="#292b3a"
              colorPrimaryLight="#fafafa"
            />
          </div>
        </div>
    </React.Fragment>
  )
}

export default ToolBar