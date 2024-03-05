import { Card, Breadcrumb, DatePicker, Spin } from "antd"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"
import DailyBill from "./components/DayBill"
import _ from 'lodash'
import './index.scss'
// import customParseFormat from 'dayjs/plugin/customParseFormat';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import { getBillList } from "@/store/modules/bill"

const Account = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  //按月数据分组
  const billList = useSelector(state => state.bill.billList)
  const monthGroup = useMemo(() => {
    //return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  console.log(monthGroup);
  //控时间
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  //计算数据
  const [currentMonthList, setCurrentMonthList] = useState([])
  const monthResult = useMemo(() => {
    //支出收入结余
    const pay = currentMonthList?.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList?.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income
    }

  }, [currentMonthList])
  //初始化
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    //边界值控制
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])
  //当前月按照日来做分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    //return出去计算之后的值
    return {
      groupData,
      keys
    }
  }, [currentMonthList])
  //获取月份
  const onChange = (date, dateString) => {
    console.log(dateString);
    setCurrentDate(dateString)
    setCurrentMonthList(monthGroup[dateString])
  }
  return <div>
    <Card
      title={
        <Breadcrumb items={[
          { title: <Link to={'/'}>首页</Link> },
          { title: '记账簿' },
        ]} />
      }
    >
      <div className="content">
        {/* <div className="header"> */}
        {/* 时间切换区域 */}
        <div className="date">
          <span className="text">
            {currentDate + ''}月账单
          </span>
          {/* 改箭头朝向 */}
          <span className={classNames('arrow')}></span>
          {/* 时间选择器 */}
          <DatePicker
            locale={zhCN}
            format="YYYY-MM"
            maxDate={dayjs(new Date())}
            picker="month"
            className="kaDate"
            onChange={(date, dateString) => onChange(date, dateString)}
          />
        </div>

        {/* 统计区域 */}
        <div className='twoLineOverview'>
          <div className="item">
            <span className="money">{Math.abs(monthResult.pay)?.toFixed(2) === 'NaN' ? '00.00' : Math.abs(monthResult.pay)?.toFixed(2)}</span>
            <span className="type">支出</span>
          </div>
          <div className="item">
            <span className="money">{monthResult.income?.toFixed(2) || '00.00'}</span>
            <span className="type">收入</span>
          </div>
          <div className="item">
            <span className="money">{monthResult.total?.toFixed(2) !== 'NaN' ? monthResult.total?.toFixed(2) : '00.00'}</span>
            <span className="type">结余</span>
          </div>
        </div>

        {/* </div> */}
        {/* 单日列表统计 */}
        {/* {
          dayGroup.keys.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
          })
        } */}
      </div>
    </Card>
    <Card>
      {
        dayGroup.keys.map(key => {
          return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
        })
      }
    </Card>
  </div>
}

export default Account