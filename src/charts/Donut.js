import React, { useEffect, useRef } from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function Donut(
    {
        title,
        data = []
    }
) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width, height])
    
    const config = {
        title: {
            show:   title,
            text:   title.text,
            top:    width < 992 ? 0 : 7,
            left:   width < 992 ? 5 : 20,
            textStyle: {
                color:  title.color || '#fff',
                lineHeight: 30
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['55%','65%'],
                center: ['70%','50%'],
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ],
        color: ['#f95d6a','#848484','#008362'],
        legend: {
            show:       true,
            icon:       'circle',
            itemWidth:  10,
            itemHeight: 10,
            itemGap:    15,
            orient:     'vertical',
            top:        width < 992 ? '32%' : 55,
            left:       width < 992 ? 5 : '5%',
            textStyle: {
                color: '#fafafa',
                fontSize: '.8rem'
            }            
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,.7)',
            borderWidth: 0,
            formatter: '{b} {d}%',
            trigger: 'item',
            textStyle: {
                color: '#fff',
                fontSize: '11.5'
            },
            formatter: (params) => {
                // get the name and value of the data item
                let name = params.name;
                let value = params.value;
                // Get the color of the data item
                let color = params.color;
                // Return the formatted tooltip text
                return '<span style="display:inline-block;margin-right:7px;border-radius:5px;width:7px;height:7px;background-color:' + color + ';vertical-align:middle;"></span>' + name + ': ' + value;
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
export default  Donut;