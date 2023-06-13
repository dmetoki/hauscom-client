import React, {useState, useEffect} from 'react';
import '../css/ToolBar.css';
import DatePicker from 'react-modern-calendar-datepicker-2023';
import 'react-modern-calendar-datepicker-2023/lib/DatePicker.css';
import {useMentionsReducer} from '../context/MentionsContext';

function ToolBar({total, variation, title}) {
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   from: {
  //     year: 2022,
  //     month: 11,
  //     day: 1,
  //   },
  //   to: {
  //     year: 2022,
  //     month: 11,
  //     day: 30,
  //   }
  // });

function valueFormat(number) {
  if (number >= 1000) {
    const roundedNumber = Math.round(number / 100) / 10;
    return roundedNumber.toString() + 'k';
  }
  return number.toString();
}

  const {timeFrame, setTimeFrame} = useMentionsReducer();
  useEffect(() => {
    console.log(timeFrame)
  }, [])
  
  return (
    <React.Fragment>
        <div className='toolbar'>
          <div>
            <h1>{title}</h1>
          </div>
          <div className='toolbar-right'>
            <div className='toolbar-highlight'>
              <h2>Mentions: {valueFormat(total)}</h2> <div className={`trend ${variation > 0 ? 'up' : 'down'}`}>{Math.abs(variation.toFixed(0))}% MoM</div>
            </div>
            <DatePicker
              value={timeFrame}
              onChange={setTimeFrame}
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