import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const Home = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    //保证dom可用
    //获取渲染图表dom节点
    const chartDom = chartRef.current
    //图标初始化生成图标实例对象
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['vue', 'react', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [60, 40, 30],
          type: 'bar'
        }
      ]
    };
    //使用图表参数完成渲染
    option && myChart.setOption(option);
  }, [])
  return <div>
    <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
  </div>
}

export default Home