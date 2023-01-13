import React, {useEffect, useRef} from 'react';
import { init, getInstanceByDom} from "echarts";
import { useWindowDimension } from '../charts/useWindowDimension';

function Pie(
    {
        title,
        data = [],
        color
    }
    ) {
    const [width, height] = useWindowDimension();
    useEffect(() => {}, [width, height])

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
        series : [
            {
                type:'pie',
                radius: '65%',
                center: ['70%','50%'],
                label: {show: false},
                selectedMode: 'single',
                data: data
            }
        ],
        color:  color ? color : ['#003f5c','#444e86','#955196','#dd5182','#ff6e54','#ffa600'],
        legend: {
            show:       true,
            // type:       'scroll',
            pageIconSize: [10, 10],
            pageIconColor: '#f4f4f4',
            pageTextStyle: {
                color: '#fff'
            },
            height:     '50%',
            icon:       'circle',
            itemWidth:  10,
            itemHeight: 10,
            itemGap:    15,
            orient:     'vertical',
            top:        width < 992 ? '25%' : 'center',
            left:       width < 992 ? 5 : '5%',
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
                // Get the color of the data item
                var color = params.color;
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
        };
    }, [width, height, title]);

    return (
        <React.Fragment>
            <div ref={chartRef} style={{width: '100%', height: '100%'}} />
        </React.Fragment>
    )
}

export default Pie;