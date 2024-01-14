import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom} from "echarts";
import {useWindowDimension} from '../components/useWindowDimension';

function Radar(
  {
    title,
    legendLabels,
    channels = [{}],
    data = []
  }
) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width])

    let groups = Object.values(data.reduce((acc, obj) => {
      let key = obj.dimension || obj.stakeholder;
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
        text: title.text,
        top: '10px',
        left: '10px',
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
        center: ['center', '45%'],
        radius: 70,
        indicator: channels.map((item) => ({
          name: item
        })),
        max: maxValue,
        splitNumber: 5,
        axisName: {
          color: '#f1f1f1'
        },
        splitLine: {
          lineStyle: {
            color: '#5f606d'
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#5f606d'
          }
        }
      },
      legend: {
        show: true,
        icon: 'circle',
        data: legendLabels,
        itemWidth: 20,
        itemHeight: 10,
        itemGap: 20,
        orient: 'vertical',
        bottom: '20px',
        left: 'center',
        pageIconSize: [10, 10],
        height: '100px',
        textStyle: {
            color: '#fafafa',
            fontSize: '1vw'
        }
        // type: 'scroll',
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
    }, [width]);

    useEffect(() => {
        // Update chart
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart.setOption(config);
        }
    }, [width, title]);

    return (
        <React.Fragment>
            <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}

export default Radar;