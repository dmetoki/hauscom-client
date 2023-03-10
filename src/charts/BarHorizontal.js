import React, { useEffect, useRef } from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function BarHorizontal(
  {
    title,
    yAxis = [],
    yAxisLabels,
    data = []
  }
) {
  const [width, height] = useWindowDimension();
  useEffect(() => {}, [width, height])
  
  // data formatting
  const series = Object.values(data.reduce((acc, obj) => {
    let key = obj.tone;
    let position = yAxis.findIndex(element => element === obj[yAxisLabels])
    if (!acc[key]) {
      acc[key] = {name: key, data: yAxis.map(() =>  0)};
    }
    acc[key].data.splice(position, 1, obj.count)
    return acc;
  }, {}));

  const seriesArr = series.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {return -1}
    if (nameA > nameB) {return 1}
    return 0;
  }).map(
    arr => ({
      name: arr.name || '',
      type: 'bar',
      barWidth: '8rem',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      data: arr.data || []
    })
  )

  const config = {
    title: {
      show: title,
      text: title.text,
      top:  width < 992 ? 0 : 10,
      left: width < 992 ? 5 : 20,
      textStyle: {
        color: title.color || '#fff',
        lineHeight: 30
      }
    },
    grid: {
      top:    width < 992 ? 65 : 80,
      right:  width < 992 ? 30 : 40,
      bottom: width < 992 ? 80 : 40,
      left:   width < 992 ? 80 : 80
    },
    series: seriesArr,
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {color: '#494a4f'}
      },
    },
    yAxis: {
      type: 'category',
      data: yAxis
    },
    axisLabel: {
      color: '#fff',
      formatter: function (value) {
        if (value >= 1000) {
            value = value / 1000 + 'k';
        }
        return value;
    }
    },
    color: ['#f95d6a','#848484','#008362'],
    legend: {
      show:         true,
      icon:         'circle',
      formatter: (name) => {
        return name.charAt(0).toUpperCase() + name.substr(1);
      },
      itemWidth:    10,
      itemHeight:   10,
      itemGap:      15,
      orient:       'horizontal',
      top:          width < 992 ? undefined : 20,
      right:        width < 992 ? undefined : 30,
      bottom:       width < 992 ? 10 : undefined,
      left:         width < 992 ? 70 : undefined,
      textStyle: {
        color: '#fafafa',
        fontSize: '.8rem'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,.7)',
      borderWidth: 0,
      trigger: 'item',
      textStyle: {
        color: '#fff',
        fontSize: '11.5'
      },
      formatter: (params) => {
        // Get the name and value of the data item
        var name = params.seriesName;
        var value = params.value;
        // Get the color of the data item
        var color = params.color;
        let percent = Math.round(params.percent) + '%';
        // Return the formatted tooltip text
        return `<span style="display:inline-block;margin-right:7px;border-radius:5px;width:7px;height:7px;background-color: ${color};vertical-align:middle;"></span> ${name.charAt(0).toUpperCase() + name.substr(1)}: ${value}`
    }
    }
  };
  const chartRef = useRef(null);
  useEffect(() => {
    // Initialize chart
    let chart;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, null, {renderer: 'svg'});
    }
    return () => {
      chart.dispose();
    };
  }, [width, height]);
  
  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(config);
    }
  }, [width, height, title]);
  
  return (
    <React.Fragment>
      <div ref={chartRef} style={{width: '100%', height: '100%'}} />
    </React.Fragment>
  )
}
export default BarHorizontal;