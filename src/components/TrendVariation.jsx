import React from "react"

function TrendVariation({total, variation}) {
    function valueFormat(number) {
        if (number >= 1000) {
          const roundedNumber = Math.round(number / 100) / 10;
          return roundedNumber.toString() + 'k';
        }
        return number.toString();
      }
  return (
    <React.Fragment>
        <div className='toolbar-highlight'>
            <h2>Mentions: {valueFormat(total)}</h2> 
            <div className={`trend ${variation > 0 ? 'up' : 'down'}`}>{Math.abs(variation.toFixed(0))}% MoM</div>
        </div>
    </React.Fragment>
  )
}

export default TrendVariation