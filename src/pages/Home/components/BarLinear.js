import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarLinear = ({ title }) => {
  const linearRef = useRef(null)
  useEffect(() => {
    const chartDom = linearRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [0.29, 0.42, 0.55, 0.63, 0.66],
          type: 'line',
          smooth: true
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  return <div ref={linearRef} style={{ width: '600px', height: '400px', display: 'inline-block' }}></div>
}

export default BarLinear