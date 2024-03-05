import * as echarts from 'echarts';
import { useEffect, useRef } from "react";


const BarBiscuit = ({ title }) => {
  const biscuit = useRef(null)
  useEffect(() => {
    const chartDom = biscuit.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '前端使用度情况',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: title === '前端各工具使用情况' ? [
            { value: 1048, name: 'Vue' },
            { value: 888, name: 'React' },
            { value: 580, name: 'uniapp' },
            { value: 200, name: 'Jquery' },
            { value: 300, name: 'Anuglar' }
          ] : [
            { value: 445, name: 'c++' },
            { value: 552, name: 'js' },
            { value: 995, name: 'java' },
            { value: 200, name: 'golang' },
            { value: 886, name: 'python' }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  return <div ref={biscuit} style={{ width: '600px', height: '400px', display: 'inline-block' }}></div>
}

export default BarBiscuit