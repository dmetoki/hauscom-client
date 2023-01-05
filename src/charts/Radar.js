import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom} from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function Radar(
  {
    title,
    color,
    legendLabels,
    channels = [{}],
    data = []
  }
) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width, height])

    let groups = Object.values(data.reduce((acc, obj) => {
      let key = obj.dimension;
      let position = channels.findIndex(element => element === obj.channel)
      if (!acc[key]) {
        acc[key] = {name: key, value: channels.map(() =>  0)};
      }
      acc[key].value.splice(position, 1, obj.count)
      return acc;
    }, {}));

    const maxValue = Math.max(...groups.map(obj => obj.count));
    
    const config = {
      title: {
        show:       title,
        text:       title.text,
        top:        width < 992 ? 0 : 10,
        left:       width < 992 ? 5 : 20,
        textStyle: {
          color: title.color || '#fff',
          lineHeight: 30
        }
      },
      series: [
        {
          type: 'radar',
          symbol: 'none',
          areaStyle: {
            color: '#000000',
            opacity: 0.1
          },
          lineStyle: {
            width: 1.5,
            opacity: 1
          },
          color: ['#955196','#dd5182','#ff6e54','#ffa600'],
          data: groups
        }
      ],
      radar: {
        center: width < 992 ? ['70%', '58%'] : ['70%', '50%'],
        radius: width < 992 ? 50 : 120,
        indicator: channels.map((item) => ({
          name: item
        })),
        max: maxValue,
        splitNumber: 5,
        axisName: {
          color: '#fff'
        },
        splitLine: {
          lineStyle: {
            color: '#494a4f'
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#494a4f'
          }
        }
      },
      legend: {
        show:       true,
        icon:       'circle',
        data:       legendLabels,
        itemWidth:  10,
        itemHeight: 10,
        itemGap:    width < 992 ? 15 : 30,
        orient:     'vertical',
        top:        width < 992 ? '28%' : 90,
        left:       width < 992 ? 5 : '3%',
        pageIconSize: 10,
        textStyle: {
            color: '#fafafa',
            fontSize: '.8rem'
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

export default Radar;