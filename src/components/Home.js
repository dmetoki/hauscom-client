import React, {useEffect, useState} from 'react';
import '../css/Layouts.css';
import Donut from '../charts/Donut';
import Radar from '../charts/Radar';
import LineArea from '../charts/LineArea';
import BarHorizontal from '../charts/BarHorizontal';
import HeatMap from '../charts/HeatMap';
import Pie from '../charts/Pie';
import { useWindowDimension } from '../charts/useWindowDimension';
import MentionsTable from './MentionsTable';
import { useSetAuthentication } from '../context/AuthenticationContext';

function Home() {
    const credentials = useSetAuthentication();
    const [mentions, setMentions] = useState({
        payload: {
            totals: 0
        }
    });
    const [width, height] = useWindowDimension();
    
    useEffect(() => {
        fetch('https://get-overview-a73sknldvq-uc.a.run.app', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credentials')).token}`
            }
        })
        .then(res => res.json())
        .then(data => {setMentions(data)})
    }, [])

    useEffect(() => {
    }, [width, height])
  return (
      <React.Fragment>
          <main className='container insud-layout'>
              <div className='card chart1 highlight card-highlight'>
                      <h2>{mentions.payload.totals}</h2>
                      <p>Mentions</p>
              </div>
              <div className='card chart2'>
                  <LineArea
                    title={{text: 'Mentions evolution'}}
                    data={mentions.payload.byDate}
                  />
              </div>
              <div className='card chart3'>
                  <Donut
                    title={{text: 'Sentiment'}}
                    data={mentions.payload.byTone}
                  />
              </div>
              <div className='card chart4'>
                  <Pie
                    title={{text: 'By Topic'}}
                    data={mentions.payload.byDimension}
                  />
              </div>
              <div className='card chart5'>
                  <Pie
                    title={{text: 'By Channel'}}
                    data={mentions.payload.byChannel}
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
                    data={mentions.payload.byDimensionAndChannel}
                  />
              </div>
              <div className='card chart7'>
                  <HeatMap
                    title={{text: 'Hot Topics per stakeholder'}}
                    tooltip={{show: false}}
                    xLabels={mentions.payload.stakeholders}
                    yLabels={mentions.payload.dimensions}
                    data={mentions.payload.byStakeholderAndTopic}
                  />
              </div>
              <div className='card chart8'>
                  <BarHorizontal
                    title={{text: "Who's speaking?"}}
                    yAxis={mentions.payload.stakeholders}
                    yAxisLabels={'stakeholder'}
                    data={mentions.payload.byStakeholderAndTone}
                  />
              </div>
              <div className='card chart9'>
                  <BarHorizontal
                    title={{text: 'What are they talking about?'}}
                    yAxis={mentions.payload.dimensions}
                    yAxisLabels={'dimension'}
                    data={mentions.payload.byDimensionAndTone}
                  />
              </div>
              <div className='card chart10'>
                  <MentionsTable/>
              </div>
              
          </main>
      </React.Fragment>
  )
}
export default Home;