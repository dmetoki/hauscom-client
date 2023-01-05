import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom } from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function LineArea(
    {
        title,
        data = []
    }
) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width, height])

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
                symbol: "none",
                areaStyle: {
                    color: '#000',
                    opacity: .2
                },
                data: item.dates.map(item => item.count)
            }
        }
    )

    const config = {
        title: {
            show:   title,
            text:   title.text,
            top:    width < 992 ? 0 : 10,
            left:   width < 992 ? 5 : 15,
            textStyle: {
                color:  title.color || '#fff',
                lineHeight: 30
            }
        },
        grid: {
            top:    width < 992 ? 65 : 80,
            right:  width < 992 ? 10 : 40,
            bottom: width < 992 ? 80 : 40,
            left:   width < 992 ? 30 : 40
        },
        series: seriesArr,
        xAxis: {
            type:   'category',
            data:   [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            splitLine: {
                lineStyle: {
                    color: '#494a4f'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#494a4f'
                }
            }
        },
        axisLabel: {
            color: '#fff'
        },
        color: ['#ff6e54','#ffa600'],
        legend: {
            show:       true,
            icon:       'circle',
            itemWidth:  10,
            itemHeight: 10,
            itemGap:    15,
            orient:     'horizontal',
            top:        width < 992 ? undefined : 20,
            right:      width < 992 ? 10 : 40,
            bottom:     width < 992 ? 10 : undefined,
            textStyle: {
                color: '#fafafa',
                fontSize: '.8rem'
            }            
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,.7)',
            borderWidth: 0,
            trigger: 'item',
            trigger: 'axis',
            textStyle: {
                color: '#fff',
                fontSize: '11.5'
            }
        }
    }
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
export default LineArea;