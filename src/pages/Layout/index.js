import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  BarChartOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUserInfo } from '@/store/modules/user'
import { removeToken } from '@/utils'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
  {
    label: '月度账单',
    key: '/account',
    icon: <BarChartOutlined />
  },
  {
    label: '年度账单',
    key: '/year',
    icon: <BarChartOutlined />
  },
  {
    label: '添加账单',
    key: '/add',
    icon: <PlusCircleOutlined />
  }
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    console.log('菜单被点击了', route);
    const path = route.key
    navigate(path)
  }
  //反向高亮
  const location = useLocation()
  // console.log(location.pathname);  
  //获取个人信息
  const dispatch = useDispatch()
  const name = useSelector(state => state.user.userInfo.name)
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  //退出登录
  const quitLogin = () => {
    removeToken()
    dispatch(deleteUser())
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={quitLogin}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={location.pathname}
            defaultSelectedKeys={location.pathname}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onMenuClick}
            selectedKeys={location.pathname}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
