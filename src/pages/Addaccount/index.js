import Icon from "@/components/Icon"
import { billListData } from "@/contains"
import { addBillList } from "@/store/modules/bill"
import { Card, Breadcrumb, Button, DatePicker, Input, message } from "antd"
import classNames from "classnames"
import dayjs from "dayjs"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import './index.scss'
import zhCN from 'antd/es/date-picker/locale/zh_CN';

const Addaccount = () => {
  const navigate = useNavigate()
  //控制支出收入状态
  const [billType, setBillType] = useState('pay')
  //金额
  const [money, setMoney] = useState()
  const moneyChange = (e) => {
    setMoney(e.target.value)
  }
  //时间
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))
  const onChangeDate = (date, dateString) => {
    setDate(dateString)
  }
  //账单类型
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  //保存账单
  const saveBill = async () => {
    //收集
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date,
      useFor: useFor
    }
    console.log(data);
    if (data.money && data.useFor && data.date) {
      await dispatch(addBillList(data))
      message.success('添加成功')
      setTimeout(() => {
        navigate('/account')
      }, 600)
    } else {
      message.warning('未填写(选择)金额/用途/日期')
    }
  }
  return <div>
    <Card
      title={
        <Breadcrumb items={[
          { title: <Link to={'/'}>首页</Link> },
          { title: '添加账单' },
        ]} />
      }
    >
      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                maxDate={dayjs(new Date())}
                locale={zhCN}
                picker="date"
                onChange={(date, dateString) => onChangeDate(date, dateString)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="请输入金额"
                type="number"
                value={money}
                onChange={moneyChange}
                prefix="￥"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    //控制selected
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'select' : ''
                      )}
                      key={item.type}
                      onClick={() => {
                        setUseFor(item.type)
                        console.log(useFor);
                      }}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </Card>
  </div>
}

export default Addaccount