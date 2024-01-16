import React, {useEffect, useRef} from 'react';
import {init, getInstanceByDom} from "echarts";
import {useWindowDimension} from '../components/useWindowDimension';

function Donut(
    {
        title,
        data = []
    }
) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width])
    const formatValue = (value) => {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(2) + 'B';
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(2) + 'M';
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(2) + 'k';
        } else {
            return value.toFixed(2);
        }
    }
    const config = {
        title: {
            show: title,
            text: title.text,
            top: '10px',
            left: '10px',
            textStyle: {
                color:  title.color || '#fff',
                lineHeight: 30
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['50%','60%'],
                center: ['65%','center'],
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                data: data.map(item => ({
                    ...item,
                    itemStyle: {
                        color:
                            item.name === 'positive' ? '#2a9d8f'
                            : item.name === 'neutral' ? '#ffa600'
                            : item.name === 'negative' ? '#f95d6a' : '#000'
                        }
                }))
            }
        ],
        legend: {
            show: true,
            icon: 'circle',
            formatter: (name) => {
                return name.charAt(0).toUpperCase() + name.substr(1);
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 15,
            orient: 'vertical',
            top: '35%',
            left: '10px',
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
                var name = params.name;
                var value = params.value;
        
                // Format the value based on magnitude (thousands, millions, billions)
                let formattedValue = formatValue(value);
        
                // Get the color of the data item
                var color = params.color;
                let percent = Math.round(params.percent) + '%';
        
                // Return the formatted tooltip text
                return `<span style="display:inline-block;margin-right:7px;border-radius:5px;width:7px;height:7px;background-color: ${color};vertical-align:middle;"></span> ${name.charAt(0).toUpperCase() + name.substr(1)}: ${formattedValue} (${percent})`
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
export default Donut;