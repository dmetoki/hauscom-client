import React, {useState, useEffect} from 'react';
import ToolBar from './ToolsBar';
import HeatMap from '../charts/HeatMap';
import BarHorizontal from '../charts/BarHorizontal';
import Donut from '../charts/Donut';
import LineAreaMirror from '../charts/LineAreaMirror';
import Pie from '../charts/Pie';
import Radar from '../charts/Radar';
import Table from '../charts/Table';
import '../css/Overview.css';

function Overview() {
  const [mentions, setMentions] = useState({
    payload: {
      totals: 0
    }
  });
  useEffect(() => {
    fetch('https://get-overview-a73sknldvq-uc.a.run.app?fromDate=10&toDate=01', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}`
      }
    })
    .then(res => res.json())
    .then(data => {setMentions(data)})
  }, [])
  return (
    <React.Fragment>
        <div className='container overview'>
          <ToolBar
            title={'Overview'}
            totals={mentions.payload.totals}
            variation={((mentions.payload.totals - mentions.payload.totals_prev_month) / mentions.payload.totals_prev_month) * 100}
          />
          <main>
            <div className='card chart1'>
              <Donut
                title={{text: 'By Volume'}}
                data={mentions.payload.by_tone}
              />
            </div>
            <div className='card chart2'>
              <LineAreaMirror
                title={{text: 'Evolution (volume vs reach)'}}
                data={mentions.payload.by_date}
              />
            </div>
            <div className='card chart3'>
              <Pie
                title={{text: 'By Channel'}}
                data={mentions.payload.by_channel}
              />
            </div>
            <div className='card chart4'>
              <Donut
                title={{text: 'By Reach'}}
                data={mentions.payload.by_tone}
              />
            </div>
            <div className='card chart5'>
              <Radar
                title={
                  {
                    text: 'Hot stakeholders per channel',
                    left: 15,
                    textStyle: {
                      color: '#fff',
                      lineHeight: 30
                    }
                  }
                }
                legendLabels={mentions.payload.stakeholders}
                channels={mentions.payload.channels}
                data={mentions.payload.by_stakeholder_and_channel}
              />
            </div>
            <div className='card chart6'>
              <Radar
                title={
                  {
                    text: 'Hot topics per channel',
                    left: 15,
                    textStyle: {
                      color: '#fff',
                      lineHeight: 30
                    }
                  }
                }
                legendLabels={mentions.payload.dimensions}
                channels={mentions.payload.channels}
                data={mentions.payload.by_dimension_and_channel}
              />
            </div>
            <div className='card chart7'>
              <HeatMap
                title={{text: 'Hot Topics per stakeholder'}}
                tooltip={{show: false}}
                xLabels={mentions.payload.stakeholders}
                yLabels={mentions.payload.dimensions}
                data={mentions.payload.by_stakeholder_and_topic}
              />
            </div>
            <div className='card chart8'>
              <BarHorizontal
                title={{text: "Who's speaking?"}}
                yAxis={mentions.payload.stakeholders}
                yAxisLabels={'stakeholder'}
                data={mentions.payload.by_stakeholder_and_tone}
              />
            </div>
            <div className='card chart9'>
              <BarHorizontal
                title={{text: 'What are they talking about?'}}
                yAxis={mentions.payload.dimensions}
                yAxisLabels={'dimension'}
                data={mentions.payload.by_dimension_and_tone}
              />
            </div>
            <div className='card chart10'>
              <Table/>
            </div>
          </main>
        </div>
    </React.Fragment>
  )
}

export default Overview