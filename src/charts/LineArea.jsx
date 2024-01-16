import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../components/useWindowDimension';

function LineArea(
    {
        title,
        data = []
    }
) {
    const [width] = useWindowDimension();
    useEffect(() => {}, [width])

    const getDates = (date) => {
        const dateObj = new Date(date.slice(0, 4), date.slice(4) - 1);
        const monthName = dateObj.toLocaleString("default", { month: "long" });
        return `${monthName.slice(0, 3)}. ${date.slice(0, 4)}`
    }
    
    const seriesArr = data.map(
        (item) => {
            return {
                name: getDates(item.yyyymm),
                type: 'line',
                smooth: true,
                // symbol: "circle",
                areaStyle: {
                    color: '#000',
                    opacity: .2
                },
                data: item.dates.map(item => item.count)
            }
        }
    )

    const formatValue = (value) => {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(2) + 'B';
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(2) + 'M';
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(2) + 'K';
        } else {
            return value.toFixed(2);
        }
    }

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
        grid: {
            top: width < 992 ? 65 : 80,
            right: width < 992 ? 10 : 40,
            bottom: width < 992 ? 80 : 40,
            left: width < 992 ? 40 : 40
        },
        series: seriesArr,
        xAxis: {
            type: 'category',
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            splitLine: {
                lineStyle: {
                    color: '#494a4f'
                }
            },
            triggerEvent: true
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#4b4f5e'
                }
            }
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
        color: ['#dd5182','#955196'],
        legend: {
            show: true,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 25,
            orient: 'horizontal',
            top: width < 992 ? undefined : 20,
            right: width < 992 ? 10 : 40,
            bottom: width < 992 ? 10 : undefined,
            left: width < 992 ? 'center' : undefined,
            textStyle: {
                color: '#fafafa',
                fontSize: '1vw'
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
            formatter: (params) => {
                // Get the name and value of the data item
                var name = params[0].name;
                
                // Format the values based on magnitude (thousands, millions, billions)
                let formattedValues = params.map((item) => {
                    var value = item.value;
                    return `${item.seriesName}: ${formatValue(value)}`;
                });
        
                // Return the formatted tooltip text
                return `<div>${name}</div>${formattedValues.join('<br>')}`;
            }
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
            // chart.on('click', (params) => {
            //     console.log(params)
            // })
        }
    }, [width, title]);
    
    return (
        <React.Fragment>
            <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}
export default LineArea;