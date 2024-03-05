import BarBiscuit from "./components/BarBiscuit"
import BarChart from "./components/BarChart"
import BarLinear from "./components/BarLinear"

const Home = () => {



  return <div>
    <BarChart title={'三大框架满意度'} />
    <BarChart title={'三大框架使用度'} />
    <BarLinear title={'vue使用率趋势'} />
    <BarLinear title={'react使用率趋势'} />
    <BarBiscuit title={'前端各工具使用情况'} />
    <BarBiscuit title={'各语言使用情况'} />
  </div>
}

export default Home