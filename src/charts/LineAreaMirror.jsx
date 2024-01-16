import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../components/useWindowDimension';

function LineAreaMirror(
    {
        title,
        data
    }
) {
    const [width] = useWindowDimension();
    useEffect(() => {}, [width])
    // useEffect(() => {console.log(data)}, [data])
    
    const config = {
        title: {
            show: title,
            text: title.text,
            top: width < 992 ? 0 : 10,
            left: width < 992 ? 5 : 15,
            textStyle: {
                color:  title.color || '#fff',
                lineHeight: 30
            }
        },
        grid: [
            {
                top: width < 992 ? 65 : 80,
                right: width < 992 ? 10 : 40,
                left: width < 992 ? 40 : 50,
                height: '30%'
            },
            {
                top: '55%',
                right: width < 992 ? 10 : 40,
                left: width < 992 ? 40 : 50,
                height: '30%'
            }
        ],
        series: [
            {
              name: 'Volume',
              type: 'line',
              symbolSize: 5,
              smooth: true,
              areaStyle: {
                color: '#000',
                opacity: .2
              },
              // prettier-ignore
              data: data?.current ? data?.current.map(i => i.count) : []
              // data: [664, 981, 620, 914, 256, 498, 782, 230, 126, 730, 708, 571, 331, 595, 69, 645, 538, 27, 621, 853, 873, 691, 182, 710, 81, 859, 326, 945, 577, 619, 279]
            },
            {
                name: 'Volume last month', // set the name of the new line
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbolSize: 5,
                smooth: true,
                areaStyle: {
                  color: '#000',
                  opacity: .2
                },
                data: data?.prev_month ? data?.prev_month.map(i => i.count) : []
                // data: [572, 635, 36, 815, 564, 87, 252, 51, 37, 782, 586, 747, 235, 383, 243, 378, 237, 718, 997, 216, 147, 829, 70, 516, 480, 791, 804, 581, 76, 446, 313]
                // add data for the new line
              },
            {
              name: 'Reach',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 5,
              smooth: true,
              areaStyle: {
                color: '#000',
                opacity: .2
              },
              // prettier-ignore
              data: data?.reach_current ? data?.reach_current.map(i => i.reach) : []
              // data: [72397, 97791, 17056, 50207, 73729, 38263, 84988, 21631, 18743, 43669, 24732, 45136, 88382, 70209, 44393, 58464, 31446, 71719, 12480, 92204, 80757, 43750, 87959, 58995, 80902, 38842, 12690, 82146, 33438, 36004, 34291]
            },
            {
                name: 'Reach last month',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 5,
                smooth: true,
                areaStyle: {
                  color: '#000',
                  opacity: .2
                },
                // prettier-ignore
                data: data?.reach_prev_month ? data?.reach_prev_month.map(i => i.reach) : []
                // data: [44676, 64854, 93689, 33939, 20563, 37130, 71112, 27902, 57675, 16730, 51866, 87311, 21758, 70594, 40281, 33661, 68635, 76538, 18146, 46773, 21056, 22889, 71525, 23031, 40816, 27355, 40563, 69322, 64399, 98391, 40113]
              }
        ],
        xAxis: [
            {
              type: 'category',
              data: data?.current ? data?.current.map(i => `${i.date.substring(4, 6)}/${i.date.substring(6, 8)}`) : [],
              // data: [44676, 64854, 93689, 33939, 20563, 37130, 71112, 27902, 57675, 16730, 51866, 87311, 21758, 70594, 40281, 33661, 68635, 76538, 18146, 46773, 21056, 22889, 71525, 23031, 40816, 27355, 40563, 69322, 64399, 98391, 40113],
              axisLabel: {
                show: false // Set show to false to hide the x-axis labels
            }
            },
            {
              gridIndex: 1,
              type: 'category',
              data: data?.current ? data?.current.map(i => `${i.date.substring(4, 6)}/${i.date.substring(6, 8)}`) : [],
              // data: [44676, 64854, 93689, 33939, 20563, 37130, 71112, 27902, 57675, 16730, 51866, 87311, 21758, 70594, 40281, 33661, 68635, 76538, 18146, 46773, 21056, 22889, 71525, 23031, 40816, 27355, 40563, 69322, 64399, 98391, 40113],
              position: 'top'
            }
        ],
        yAxis: [
            {
              type: 'value',
              splitLine: {
                lineStyle: {
                    color: '#3e404f'
                }
            }
            },
            {
              gridIndex: 1,
              type: 'value',
              splitLine: {
                lineStyle: {
                    color: '#3e404f'
                }
              },
              inverse: true
            }
        ],
        axisLabel: {
            color: '#fff',
            formatter: function (value) {
              if (value >= 1e9) {
                return (value / 1e9).toFixed(1) + 'B';
              } else if (value >= 1e6) {
                return (value / 1e6).toFixed(1) + 'M';
              } else if (value >= 1e3) {
                return (value / 1e3).toFixed(1) + 'k';
              } else {
                return value;
              }
            }
        },
        color: ['#955196','#f95d6a','#ff6e54','#ffa600'],
        legend: {
            data: width < 992 ? ['Volume', 'Reach'] : ['Volume', 'Volume last month', 'Reach', 'Reach last month'],
            selected: {
                'Volume': true,
                'Volume last month': false,
                'Reach': true,
                'Reach last month': false
            },
            inactiveColor: '#5f606d',
            // show: true,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 25,
            orient: 'horizontal',
            top: width < 992 ? undefined : undefined,
            left: 'center',
            bottom: width < 992 ? 10 : 20,
            textStyle: {
                color: '#fafafa',
                fontSize: '.8rem'
            }            
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,.7)',
            borderWidth: 0,
            trigger: 'axis',
            textStyle: {
                color: '#fff',
                fontSize: '11.5'
            },
            formatter: function (params) {
              const volumeParams = params.filter(param => param.seriesName.includes('Volume'));
              const reachParams = params.filter(param => param.seriesName.includes('Reach'));
          
              const formattedVolume = volumeParams.map(param => {
                  const value = param.value;
                  let formattedValue;
                  if (value >= 1e9) {
                      formattedValue = `${(value / 1e9).toFixed(1)}B`;
                  } else if (value >= 1e6) {
                      formattedValue = `${(value / 1e6).toFixed(1)}M`;
                  } else if (value >= 1e3) {
                      formattedValue = `${(value / 1e3).toFixed(1)}k`;
                  } else {
                      formattedValue = `${value}`;
                  }

                  // could use ${param.seriesName}: tp show the series name if needed
                  return `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background-color:${param.color};margin-right:5px;"></span>${formattedValue}`;
              });
          
              const formattedReach = reachParams.map(param => {
                  const value = param.value;
                  let formattedValue;
                  if (value >= 1e9) {
                      formattedValue = `${(value / 1e9).toFixed(1)}B`;
                  } else if (value >= 1e6) {
                      formattedValue = `${(value / 1e6).toFixed(1)}M`;
                  } else if (value >= 1e3) {
                      formattedValue = `${(value / 1e3).toFixed(1)}k`;
                  } else {
                      formattedValue = `${value}`;
                  }
          
                  return `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background-color:${param.color};margin-right:5px;"></span>${formattedValue}`;
              });
          
              const date = params[0].axisValueLabel; // Assuming the date is in the first parameter
              const tooltipContent = [];
              
              if (formattedVolume.length > 0) {
                  tooltipContent.push(formattedVolume.join('<br>'));
              }
          
              if (formattedReach.length > 0) {
                  tooltipContent.push(formattedReach.join('<br>'));
              }
          
              return `<div style="min-width:80px"><b>${date}</b><br>${tooltipContent.join('<br>')}</div>`;
          }
          
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: 'all'
            }
          ]
        }
      }
    const chartRef = useRef(null);
    useEffect(() => {
        // Initialize chart
        let chart;
        if (chartRef.current !== null) {
            // chart = init(chartRef.current, null, {renderer: 'svg'});
            chart = init(chartRef.current, null);
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
            chart.off();
            chart.on('click', (params) => {
                console.log(params)
            })
        }
    }, [width, title]);
    
    return (
        <React.Fragment>
            <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}
export default LineAreaMirror;