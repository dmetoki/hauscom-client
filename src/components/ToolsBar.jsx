import React, {useState, useEffect} from 'react';
import '../css/ToolBar.css';
import DatePicker from 'react-modern-calendar-datepicker-2023';
import 'react-modern-calendar-datepicker-2023/lib/DatePicker.css';
import {useMentionsReducer} from '../context/MentionsContext';
import TrendVariation from './TrendVariation';

function ToolBar({total, variation, title}) {
  const {timeFrame, setTimeFrame} = useMentionsReducer();
  
  return (
    <React.Fragment>
        <div className='toolbar'>
          <div>
            <h1>{title}</h1>
          </div>
          <div className='toolbar-right'>
            {
              total && <TrendVariation total={total} variation={variation} />
            }
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