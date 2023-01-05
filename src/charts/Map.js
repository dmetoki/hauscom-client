import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom, registerMap } from "echarts";

function Map(){
    const internalConfig = {
      backgroundColor: 'transparent',
        tooltip: {
          backgroundColor: 'rgba(0,0,0,.7)',
          borderWidth: 0,
          trigger: 'item',
          textStyle: {
              color: '#fff',
              fontSize: '11.5'
          }
      },
        visualMap: {
          left: 'left',
          min: 5000,
          max: 50000,
          inRange: {
            color: [
              '#d65454',
              '#ffa500'              
            ]
          },
          text: ['High', 'Low'],
          calculable: true
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
            data: [
                {name : 'Chile', value : 40374.224}

            ]
          }
        ]
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
              option = internalConfig
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
    }, []); 


    return(
        <React.Fragment>
          <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}

export default Map;