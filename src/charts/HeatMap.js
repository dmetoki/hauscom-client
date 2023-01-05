import React, { useEffect, useRef } from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function HeatMap(
  {
    title,
    xLabels = [],
    yLabels = [],
    data = []
  }
) {
  const [width, height] = useWindowDimension();
  useEffect(() => {}, [width, height])
  
  let series = (prop1, prop2) => {
    let result = []
    data.map((item) => {
      if(item[prop1] !== null && item[prop2] !== null) {
        result.push([
          xLabels.findIndex(e => e === item[prop1]),
          yLabels.findIndex(e => e === item[prop2]),
          item.count
        ])
      }
    })
    return result
  }
  
  // prettier-ignore
  const seriesArr = series('stakeholder','dimension').map((item) => {
    return [item[0], item[1], item[2] || '-'];
  });
  
  const config = {
    title: {
      show:   title,
      text:   title.text,
      top:    width < 992 ? 0 : 10,
      left:   width < 992 ? 5 : 20,
      textStyle: {
        color: title.color || '#fff',
        lineHeight: 30
      }
    },
    grid: {
      top:      width < 992 ? 50 : 80,
      right:    width < 992 ? 20 : 70,
      bottom:   width < 992 ? 40 : 40,
      left:     width < 992 ? 80 : 100
    },
    series: [
      {
        type: 'heatmap',
        data: seriesArr,
        label: {
          show: true
        },
        itemStyle: {
          borderWidth: .5,
          borderColor: '#212121'
        }
      }
    ],
    xAxis: {
      type: 'category',
      data: xLabels
    },
    yAxis: {
      type: 'category',
      data: yLabels
    },
    axisLabel: {
      color: '#fff'
    },
    visualMap: {
      show: width < 992 ? false : true,
      min: 0,
      max: 86,
      textStyle: {
        color: '#fff'
      },
      inRange : {   
        color: ['#003f5c', '#955196']
      },
      calculable: true,
      orient: 'vertical',
      right: 15,
      top: 'center'
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,.7)',
      borderWidth: 0,
      trigger: 'item',
      textStyle: {
        color: '#fff',
        fontSize: '11.5'
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
export default HeatMap;