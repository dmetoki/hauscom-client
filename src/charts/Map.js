import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom, registerMap } from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function Map({
  title,
  data=[]
}){
  const [width, height] = useWindowDimension();
  useEffect(() => {}, [width, height])
  const countries = {
    AL: 'Albania',
    AR: 'Argentina',
    DK: 'Denmark',
    FJ: 'Fiji',
    KM: 'Comoros',
    NL: 'Netherlands',
    PL: 'Poland',
    RO: 'Romania',
    UA: 'Ukraine',
    GB: 'United Kingdom',
    VN: 'Vietnam'
  }
    const config = {
      backgroundColor: 'transparent',
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
        visualMap: {
          min: 5000,
          max: 50000,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            color: [
              '#d65454',
              '#ffa500'              
            ]
          },
          text: ['High', 'Low'],
          calculable: true,
          orient: 'vertical',
          right: 20,
          top: 'center'
        },
        series: [
          {
            name: 'World',
            type: 'map',
            roam: false,
            map: 'world',
            selectedMode: false,
            itemStyle: {
              areaColor: '#494a4f',
              borderColor: '#494a4f'
            },
            emphasis: {
              label: {
                show: false
              },
              itemStyle: {
                areaColor: '#fafafa'
              }
            },
            data: data.map((obj) => {
              const code = obj.name;
              const value = obj.value;
              const countryName = countries[code] || 'Unknown';
              return {name: countryName, value: value};
          })
            // [{name : 'Chile', value : 40374.224}]
          }
        ],
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
          let option;
          // chart.showLoading();
          fetch('../world.json')
          .then(result => result.json())
          .then(featureCollection => {
            // chart.hideLoading();
            registerMap('world', featureCollection);
            option = config
            if (option && typeof option === 'object') {
              chart.setOption(option);
            }
          })
        }
        return () => {
            chart.dispose();
        };
    }, []);

    useEffect(() => {
        // Update chart
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
        }
    }, [width, height]);

    return(
        <React.Fragment>
          <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}

export default Map;