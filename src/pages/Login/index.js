import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { getToken } from '@/utils'
// import { useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //收集数据，并登录获取token
  const onFinish = async (values) => {
    console.log(values);
    //触发异步action
    await dispatch(fetchLogin(values))
    //跳转，提示
    if (getToken()) {
      navigate('/')
      message.success('登录成功')
    }

  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}>
          <Form.Item name="mobile"
            rules={[
              {
                required: true, message: '手机号不能为空'
              },
              {
                pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式'
              }
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="code"
            rules={[
              {
                required: true, message: '验证码不能为空'
              }
            ]}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
